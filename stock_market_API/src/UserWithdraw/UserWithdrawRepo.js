import UserWithdraw from "../../db/Schemas/UserWithdrawSchema.js";

class UserWithdrawRepo {
  constructor({ logger }) {
    this.logger = logger;
  }

  async addUserWithdraw(data, correlationId) {
    this.logger.info(
      "addUserWithdraw - Adding a new user withdrawal to the DB",
      {
        correlationId,
        data,
      }
    );

    try {
      const userWithdraw = new UserWithdraw(data);
      const savedUserWithdraw = await userWithdraw.save();
      this.logger.info(
        "addUserWithdraw - User withdrawal successfully added to DB",
        {
          correlationId,
          userWithdrawId: savedUserWithdraw._id,
        }
      );
      return savedUserWithdraw;
    } catch (error) {
      this.logger.error(
        "addUserWithdraw - Error adding user withdrawal - Repo",
        {
          correlationId,
          data,
          error: error.message,
          stack: error.stack,
        }
      );
      throw error;
    }
  }

  // Get all user withdrawals
  async getAllUserWithdraws(correlationId) {
    this.logger.info(
      "getAllUserWithdraws - Fetching all user withdrawals from the DB",
      {
        correlationId,
      }
    );

    try {
      const userWithdraws = await UserWithdraw.find();
      this.logger.info(
        "getAllUserWithdraws - Successfully fetched user withdrawals",
        {
          correlationId,
          withdrawalsCount: userWithdraws.length,
        }
      );
      return userWithdraws;
    } catch (error) {
      this.logger.error(
        "getAllUserWithdraws - Error fetching user withdrawals - Repo",
        {
          correlationId,
          error: error.message,
          stack: error.stack,
        }
      );
      throw error;
    }
  }

  async getOneUserWithdraws(userId, correlationId) {
    this.logger.info(
      "getOneUserWithdraws - Fetching user withdrawals by userId from the DB",
      {
        correlationId,
        userId,
      }
    );

    try {
      const userWithdraws = await UserWithdraw.find({ userId: userId }).sort({
        date: -1,
      });
      this.logger.info(
        "getOneUserWithdraws - Successfully fetched user withdrawals by userId",
        {
          correlationId,
          userId,
          withdrawalsCount: userWithdraws.length,
        }
      );
      return userWithdraws;
    } catch (error) {
      this.logger.error(
        "getOneUserWithdraws - Error fetching user withdrawals by userId - Repo",
        {
          correlationId,
          userId,
          error: error.message,
          stack: error.stack,
        }
      );
      throw error;
    }
  }
}

export default UserWithdrawRepo;
