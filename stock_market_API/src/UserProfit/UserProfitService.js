class UserProfitService {
  constructor({ userProfitRepo }) {
    this.userProfitRepo = userProfitRepo;
  }

  getAllUserProfit = async (userId) => {
    const userProfits = await this.userProfitRepo.getAllUserProfit(userId);

    return userProfits;
  };
}

export default UserProfitService;
