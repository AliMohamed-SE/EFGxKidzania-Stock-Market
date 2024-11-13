class UserService {
  constructor({ userRepo, userProfitRepo }) {
    this.userRepo = userRepo;
    this.userProfitRepo = userProfitRepo;
  }

  register = async (req) => {
    const { username } = req.body;

    // Check if the username is unique
    const existingUser = await this.userRepo.getUserByUsername(username);
    if (existingUser) {
      throw new Error("this username is invalid");
    }

    return await this.userRepo.addUser(req.body);
  };

  login = async (req) => {
    const { username, password } = req.body;
    const user = await this.userRepo.getUser(username, password);

    if (user) {
      return user;
    }

    throw new Error("Invalid Credentials");
  };

  getUserByUsername = async (username) => {
    const user = await this.userRepo.getUserByUsername(username);

    return user;
  };

  getUserLeaderboards = async () => {
    const highestNumberOfTrades =
      await this.userRepo.getHighestNumberOfTrades();
    const highestReturn = await this.userProfitRepo.getHighestReturn();
    const biggestInvestment = await this.userRepo.getBiggestInvestment();

    const leaderboards = {
      highestNumberOfTrades: highestNumberOfTrades,
      highestReturn: highestReturn,
      biggestInvestment: biggestInvestment,
    };
    return leaderboards;
  };
}

export default UserService;
