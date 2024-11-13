import User from "../../db/Schemas/UserSchema.js";

class UserRepo {
  constructor(db) {
    this.db = db;
  }

  async addUser(data) {
    const user = new User(data);
    return await user.save();
  }

  async getUser(username, password) {
    const user = await User.findOne({ username: username, password: password });
    return user;
  }

  async getUserByUsername(username) {
    const user = await User.findOne({ username: username });
    return user;
  }

  async getUserById(userId) {
    const user = await User.findById(userId);
    return user;
  }

  async updateAfterTransaction(type, total, userId, profit) {
    const user = await User.findById(userId);

    // Adjust the wallet balance based on the type
    if (type === "Buy") {
      user.wallet_balance -= total;
      user.stock_balance += total;
      user.number_of_assets += 1;
      user.total_invested_amount += total;
    } else if (type === "Sell") {
      user.wallet_balance += total;
      user.stock_balance -= total;
      user.number_of_assets -= 1;
      user.total_profit += profit;
    } else {
      throw new Error("Invalid transaction type");
    }

    user.number_of_trades += 1;

    // Save the updated user document
    await user.save();

    return user;
  }

  async rollbackAfterTransaction(type, total, userId) {
    const user = await User.findById(userId);

    // Adjust the wallet balance based on the type
    if (type === "Buy") {
      user.wallet_balance += total;
      user.stock_balance -= total;
      user.number_of_assets -= 1;
    } else if (type === "Sell") {
      user.wallet_balance -= total;
      user.stock_balance += total;
      user.number_of_assets += 1;
      user.total_profit -= profit;
    } else {
      throw new Error("Invalid transaction type");
    }

    user.total_invested_amount -= total;
    user.number_of_trades -= 1;

    // Save the updated user document
    await user.save();

    return user;
  }

  async getHighestNumberOfTrades() {
    try {
      const topUsers = await User.find()
        .sort({ number_of_trades: -1 })
        .limit(4)
        .select("first_name last_name");

      return topUsers;
    } catch (error) {
      console.error("Error fetching top users by number of trades:", error);
      throw error; // Re-throw the error after logging it
    }
  }

  async getBiggestInvestment() {
    try {
      const topUsers = await User.find()
        .sort({ total_invested_amount: -1 })
        .limit(4)
        .select("first_name last_name");

      return topUsers;
    } catch (error) {
      console.error(
        "Error fetching top users by biggest amount of investment:",
        error
      );
      throw error; // Re-throw the error after logging it
    }
  }
}

export default UserRepo;
