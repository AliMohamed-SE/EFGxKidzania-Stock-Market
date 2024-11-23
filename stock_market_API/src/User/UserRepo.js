import User from "../../db/Schemas/UserSchema.js";
class UserRepo {
  constructor({ logger }) {
    this.logger = logger;
  }

  async addUser(data, correlationId) {
    try {
      const { password, ...dataWithoutPassword } = data;

      this.logger.info("Adding new user", {
        correlationId,
        data: dataWithoutPassword,
      });

      const user = new User(data);
      await user.save();

      const { password: userPassword, ...userWithoutPassword } =
        user.toObject();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUser(username, password, correlationId) {
    try {
      this.logger.info("Fetching user by username and password", {
        correlationId,
        username,
      });

      const user = await User.findOne({
        username: username,
        password: password,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByUsername(username, correlationId) {
    try {
      this.logger.info("Fetching user by username", {
        correlationId,
        username,
      });

      const user = await User.findOne({ username: username });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId, correlationId) {
    try {
      this.logger.info("Fetching user by ID", {
        correlationId,
        userId,
      });

      const user = await User.findById(userId);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateAfterTransaction(type, total, userId, profit, correlationId) {
    try {
      this.logger.info("Updating user after transaction", {
        correlationId,
        type,
        userId,
        total,
        profit: profit ?? "Profit not available",
      });

      const user = await User.findById(userId);

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

      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateAfterWithdrawal(userId, withdraw_amount, correlationId) {
    try {
      this.logger.info("Updating user after withdrawal", {
        correlationId,
        userId,
        withdraw_amount,
      });

      const user = await User.findById(userId);

      user.wallet_balance -= withdraw_amount;

      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async rollbackAfterTransaction(type, total, userId, correlationId) {
    try {
      this.logger.info("Rolling back user after transaction", {
        correlationId,
        type,
        userId,
        total,
      });

      const user = await User.findById(userId);

      if (type === "Buy") {
        user.wallet_balance += total;
        user.stock_balance -= total;
        user.number_of_assets -= 1;
      } else if (type === "Sell") {
        user.wallet_balance -= total;
        user.stock_balance += total;
        user.number_of_assets += 1;
      } else {
        throw new Error("Invalid transaction type");
      }

      user.total_invested_amount -= total;
      user.number_of_trades -= 1;

      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getHighestNumberOfTrades(correlationId) {
    try {
      this.logger.info("Fetching top users by number of trades", {
        correlationId,
      });

      const topUsers = await User.find()
        .sort({ number_of_trades: -1 })
        .limit(4)
        .select("first_name last_name avatar");

      return topUsers;
    } catch (error) {
      throw error;
    }
  }

  async getBiggestInvestment(correlationId) {
    try {
      this.logger.info("Fetching top users by biggest investment", {
        correlationId,
      });

      const topUsers = await User.find()
        .sort({ total_invested_amount: -1 })
        .limit(4)
        .select("first_name last_name avatar");

      return topUsers;
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepo;
