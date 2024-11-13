class UserStocksController {
  constructor({ userStocksService }) {
    this.userStocksService = userStocksService;
  }

  buyStock = async (req, res) => {
    try {
      const updatedUser = await this.userStocksService.buyStock(req.body);
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };

  sellStock = async (req, res) => {
    try {
      const updatedUser = await this.userStocksService.sellStock(req.body);
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };

  addUserStocks = async (req, res) => {
    try {
      const userStocks = await this.userStocksService.addUserStocks(req.body);
      res.status(201).json(userStocks);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };

  updateUserStocks = async (req, res) => {
    try {
      const userStocks = await this.userStocksService.updateUserStocks(
        req.body
      );
      res.status(200).json(userStocks);
    } catch (error) {
      if (error.message === "This user has no stocks in the company") {
        res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };

  getAllUserStocks = async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ error: "user is required" });
      }

      const userStocks = await this.userStocksService.getAllUserStocks(userId);

      if (!userStocks) {
        return res.status(404).json({ error: "This User has no stocks" });
      }

      res.status(200).json(userStocks);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };

  getOneUserStocks = async (req, res) => {
    try {
      const { userId, companyId } = req.query;

      if (!userId || !companyId) {
        return res.status(400).json({ error: "user and company are required" });
      }

      const userStocks = await this.userStocksService.getOneUserStocks(
        userId,
        companyId
      );

      if (!userStocks) {
        return res
          .status(404)
          .json({ error: "This User has no shares in this company" });
      }

      res.status(200).json(userStocks);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };
}

export default UserStocksController;
