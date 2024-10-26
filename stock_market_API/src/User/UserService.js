class UserService {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
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
}

export default UserService;
