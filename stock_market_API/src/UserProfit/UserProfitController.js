class UserProfitController {
  constructor({ userProfitService }) {
    this.userProfitService = userProfitService;
  }

  getAllUserProfit = async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ error: "user is required" });
      }

      const userProfits = await this.userProfitService.getAllUserProfit(userId);

      if (!userProfits) {
        return res.status(404).json({ error: "This User has no profits" });
      }

      res.status(200).json(userProfits);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };
}

export default UserProfitController;
