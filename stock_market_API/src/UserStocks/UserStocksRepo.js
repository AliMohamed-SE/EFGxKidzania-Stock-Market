import UserStock from "../../db/Schemas/UserStockSchema.js";

class UserStockRepo {
  constructor(db) {
    this.db = db;
  }

  async addUserStocks(data) {
    const userStocks = new UserStock(data);
    return await userStocks.save();
  }

  async updateUserStocks(userId, companyId, data) {
    const userStocks = await UserStock.findOneAndUpdate(
      {
        userId: userId,
        companyId: companyId,
      },
      data
    );
    return userStocks;
  }

  async getAllUserStocks(userId) {
    const userStocks = await UserStock.find({
      userId: userId,
    }).populate("companyId");
    return userStocks;
  }

  async getOneUserStocks(userId, companyId) {
    const userStocks = await UserStock.find({
      userId: userId,
      companyId: companyId,
    });
    return userStocks;
  }

  async rollbackUserStocks(userStocksId) {
    const userStocks = await UserStock.findByIdAndDelete(userStocksId);

    return userStocks;
  }

  async deleteUserStocks(data) {
    await UserStock.deleteMany({
      _id: { $in: data },
    });
  }

  async updateUserStocks(userStocksId, quantity) {
    const userStocks = await UserStock.findByIdAndUpdate(
      userStocksId,
      { quantity },
      { new: true }
    );

    return userStocks;
  }
}

export default UserStockRepo;
