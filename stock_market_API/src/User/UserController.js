class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  register = async (req, res) => {
    try {
      const user = await this.userService.register(req);
      res.status(201).json(user);
    } catch (error) {
      if (error.message === "this username is invalid") {
        return res.status(409).json({ error: "this username is invalid" });
      }
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };

  login = async (req, res) => {
    try {
      const user = await this.userService.login(req);
      res.status(200).json(user);
    } catch (error) {
      if (error.message === "Invalid credentials") {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };

  getUserByUsername = async (req, res) => {
    try {
      const { username } = req.params;

      // Check if username is provided
      if (!username) {
        return res
          .status(400)
          .json({ error: "Username parameter is required" });
      }

      const user = await this.userService.getUserByUsername(username);

      // If user not found, return 404 status
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // User found, return 200 status with user data
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };
}

export default UserController;
