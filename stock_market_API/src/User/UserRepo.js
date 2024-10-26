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
    const user = await User.findOne({ username: username }, "_id");
    return user;
  }
}

export default UserRepo;
