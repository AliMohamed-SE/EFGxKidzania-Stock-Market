import UserProfit from "../../db/Schemas/UserProfitSchema.js";

class UserProfitRepo {
  constructor(db) {
    this.db = db;
  }

  async addUserProfit(data) {
    const existingUserProfit = await UserProfit.findOne({
      userId: data.userId,
      companyId: data.companyId,
    });

    if (existingUserProfit) {
      existingUserProfit.profit += data.profit;
      existingUserProfit.investedAmount += data.investedAmount;
      return await existingUserProfit.save();
    } else {
      const newUserProfit = new UserProfit(data);
      return await newUserProfit.save();
    }
  }

  async getAllUserProfit(userId) {
    const userProfits = await UserProfit.find({
      userId: userId,
    }).populate("companyId");
    return userProfits;
  }

  async getHighestReturn() {
    try {
      const topUsers = await UserProfit.aggregate([
        {
          $group: {
            _id: "$userId",
            totalProfit: { $sum: "$profit" },
            totalInvestedAmount: { $sum: "$investedAmount" },
          },
        },
        {
          $addFields: {
            avgROI: {
              $cond: [
                { $gt: ["$totalInvestedAmount", 0] },
                {
                  $multiply: [
                    { $divide: ["$totalProfit", "$totalInvestedAmount"] },
                    100,
                  ],
                },
                0,
              ],
            },
          },
        },
        {
          $sort: { avgROI: -1 },
        },
        {
          $limit: 4,
        },
        {
          $project: {
            userId: "$_id",
            totalProfit: 1,
            totalInvestedAmount: 1,
            avgROI: 1,
          },
        },
      ]);

      await UserProfit.populate(topUsers, {
        path: "userId",
        select: "first_name last_name",
      });

      return topUsers;
    } catch (error) {
      console.error("Error fetching top users by ROI:", error);
      throw error;
    }
  }
}

export default UserProfitRepo;
