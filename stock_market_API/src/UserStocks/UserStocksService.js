import { logToFile } from "../util/logger.js";

class UserStocksService {
  constructor({
    userStocksRepo,
    userRepo,
    transactionRepo,
    companyRepo,
    userProfitRepo,
  }) {
    this.userStocksRepo = userStocksRepo;
    this.userRepo = userRepo;
    this.transactionRepo = transactionRepo;
    this.companyRepo = companyRepo;
    this.userProfitRepo = userProfitRepo;
  }

  buyStock = async (data) => {
    const { userId, companyId, quantity, buy_price } = data;

    let transactionId;
    let userStocksId;
    let userAdjusted = false;
    let companyAdjusted = false;

    try {
      // Validate the user and company
      const existingUser = await this.userRepo.getUserById(userId);
      if (!existingUser) throw new Error("this user doesn't exist");

      const existingCompany = await this.companyRepo.getCompany(companyId);
      if (!existingCompany) throw new Error("this company doesn't exist");

      const totalBuyPrice = quantity * buy_price;
      if (totalBuyPrice > existingUser.wallet_balance) {
        throw new Error(
          "this user doesn't have enough wallet balance to buy this stock"
        );
      }

      // Log the beginning of the transaction
      logToFile(
        "Buy",
        `------------------------------------------------------------------------`
      );
      logToFile(
        "Buy",
        `Initiating buyStock for userId: ${userId}, companyId: ${companyId}, total price: ${totalBuyPrice}`
      );

      // Create a new Buy transaction
      const buyTransaction = {
        userId,
        companyId,
        date: new Date(),
        opening_balance: existingUser.wallet_balance,
        closing_balance: existingUser.wallet_balance - totalBuyPrice,
        quantity,
        type: "Buy",
        price: buy_price,
      };

      const transaction = await this.transactionRepo.addTransaction(
        buyTransaction
      );
      transactionId = transaction._id;
      logToFile(
        "Buy",
        `Transaction created: ${JSON.stringify(buyTransaction)}`
      );

      // Add to user stocks
      const userStocks = await this.userStocksRepo.addUserStocks(data);
      userStocksId = userStocks._id;
      logToFile(
        "Buy",
        `Added user stocks for transaction ID: ${transactionId}`
      );

      // Update user after transaction
      const updatedUser = await this.userRepo.updateAfterTransaction(
        "Buy",
        totalBuyPrice,
        userId,
        0
      );
      userAdjusted = true;
      logToFile("Buy", `User updated with new balance for user ID: ${userId}`);

      // Update company after transaction
      await this.companyRepo.updateAfterTransaction("Buy", companyId);
      companyAdjusted = true;
      logToFile(
        "Buy",
        `Company transaction count updated for company ID: ${companyId}`
      );

      return updatedUser;
    } catch (error) {
      logToFile("Buy", `Error in buyStock: ${error.message}`);

      // Rollback user update if it was adjusted
      if (userAdjusted) {
        await this.userRepo.rollbackAfterTransaction(
          "Buy",
          totalBuyPrice,
          userId
        );
        logToFile("Buy", `Rolled back user update for user ID: ${userId}`);
      }

      // Rollback company update if it was adjusted
      if (companyAdjusted) {
        await this.companyRepo.rollbackAfterTransaction("Buy", companyId);
        logToFile(
          "Buy",
          `Rolled back company update for company ID: ${companyId}`
        );
      }

      // Delete transaction if it was created
      if (transactionId) {
        await this.transactionRepo.deleteTransaction(transactionId);
        logToFile("Buy", `Deleted transaction ID: ${transactionId}`);
      }

      // Rollback user stocks if they were added
      if (userStocksId) {
        await this.userStocksRepo.rollbackUserStocks(userStocksId, quantity);
        logToFile("Buy", `Rolled back user stocks ID: ${userStocksId}`);
      }

      throw new Error("Error buying the stock, transaction rolled back");
    }
  };

  sellStock = async (data) => {
    const { userId, companyId, quantity } = data;

    try {
      logToFile(
        "Sell",
        `------------------------------------------------------------------------`
      );
      logToFile(
        "Sell",
        `Initiating sellStock process for user ID: ${userId}, company ID: ${companyId}, quantity: ${quantity}`
      );

      // Check if the user exists
      const existingUser = await this.userRepo.getUserById(userId);
      if (!existingUser) throw new Error("User does not exist");

      // Check if the company exists
      const existingCompany = await this.companyRepo.getCompany(companyId);
      if (!existingCompany) throw new Error("Company does not exist");

      // Retrieve user's stocks in the specified company
      const existingUserStocks = await this.userStocksRepo.getOneUserStocks(
        userId,
        companyId
      );
      if (!existingUserStocks || existingUserStocks.length === 0)
        throw new Error("User has no shares in this company");

      let totalShares = 0;
      let buy_price = 0;
      const deletedUserStocks = [];
      let adjustedUserStock;

      // Calculate total shares, buy price, and determine stocks to delete or adjust
      for (const stock of existingUserStocks) {
        if (totalShares + stock.quantity <= quantity) {
          totalShares += stock.quantity;
          buy_price += stock.buy_price * stock.quantity;
          deletedUserStocks.push(stock._id);
        } else if (totalShares !== quantity) {
          const remainder = quantity - totalShares;
          totalShares += remainder;
          buy_price += stock.buy_price * remainder;
          adjustedUserStock = {
            _id: stock._id,
            quantity: stock.quantity - remainder,
          };
          break;
        }
      }

      // Ensure the user has enough shares to sell
      if (totalShares < quantity)
        throw new Error("User does not have enough shares to sell");

      // Calculate sell price and profit
      const sell_price = quantity * existingCompany.current_price;
      const profit = sell_price - buy_price;

      // Create a Sell transaction
      const sellTransaction = {
        userId,
        companyId,
        date: new Date(),
        opening_balance: existingUser.wallet_balance,
        closing_balance: existingUser.wallet_balance + sell_price,
        quantity,
        type: "Sell",
        price: sell_price,
        profit,
      };

      await this.transactionRepo.addTransaction(sellTransaction);
      logToFile(
        "Sell",
        `Sell transaction recorded: ${JSON.stringify(sellTransaction)}`
      );

      // Delete or adjust user stocks as necessary
      if (deletedUserStocks.length > 0) {
        await this.userStocksRepo.deleteUserStocks(deletedUserStocks);
        logToFile(
          "Sell",
          `Deleted user stocks for IDs: ${JSON.stringify(deletedUserStocks)}`
        );
      }

      if (adjustedUserStock) {
        await this.userStocksRepo.updateUserStocks(
          adjustedUserStock._id,
          adjustedUserStock.quantity
        );
        logToFile(
          "Sell",
          `Adjusted user stock ID: ${adjustedUserStock._id}, new quantity: ${adjustedUserStock.quantity}`
        );
      }

      // Record profit for the user
      await this.userProfitRepo.addUserProfit({
        userId,
        companyId,
        profit,
        investedAmount: buy_price,
      });
      logToFile(
        "Sell",
        `User profit recorded: { userId: ${userId}, companyId: ${companyId}, profit: ${profit}, investedAmount: ${buy_price} }`
      );

      // Update user wallet balance after transaction
      await this.userRepo.updateAfterTransaction(
        "Sell",
        sell_price,
        userId,
        profit
      );
      logToFile("Sell", `User wallet balance updated for user ID: ${userId}`);

      // Update company transaction count
      await this.companyRepo.updateAfterTransaction("Sell", companyId);
      logToFile(
        "Sell",
        `Company transaction count updated for company ID: ${companyId}`
      );

      const updatedUser = await this.userRepo.getUserById(userId);
      logToFile(
        "Sell",
        `Sell process completed successfully for user ID: ${userId}`
      );

      return updatedUser;
    } catch (error) {
      logToFile("Sell", `Error in sellStock: ${error.message}`);
      throw new Error("Failed to process sell transaction");
    }
  };

  addUserStocks = async (data) => {
    const { userId, companyId } = data;

    const existingUserStocks = await this.userStocksRepo.getOneUserStocks(
      userId,
      companyId
    );

    let userStocks;

    if (existingUserStocks) {
      userStocks = await this.userStocksRepo.updateUserStocks(
        userId,
        companyId,
        data
      );
    } else {
      userStocks = await this.userStocksRepo.addUserStocks(data);
    }

    return userStocks;
  };

  addUserStocks = async (data) => {
    const { userId, companyId } = data;

    const existingUserStocks = await this.userStocksRepo.getOneUserStocks(
      userId,
      companyId
    );

    let userStocks;

    if (existingUserStocks) {
      userStocks = await this.userStocksRepo.updateUserStocks(
        userId,
        companyId,
        data
      );
    } else {
      userStocks = await this.userStocksRepo.addUserStocks(data);
    }

    return userStocks;
  };

  updateUserStocks = async (data) => {
    const { userId, companyId } = data;

    const existingUserStocks = await this.userStocksRepo.getOneUserStocks(
      userId,
      companyId
    );

    if (!existingUserStocks) {
      throw new Error("This user has no stocks in the company");
    }

    const userStocks = await this.userStocksRepo.updateUserStocks(
      userId,
      companyId,
      data
    );

    return userStocks;
  };

  getAllUserStocks = async (userId) => {
    const userStocks = await this.userStocksRepo.getAllUserStocks(userId);

    return userStocks;
  };

  getOneUserStocks = async (userId, companyId) => {
    const userStocks = await this.userStocksRepo.getOneUserStocks(
      userId,
      companyId
    );

    return userStocks;
  };
}

export default UserStocksService;
