class StocksHistoryController {
  constructor({ stocksHistoryService }) {
    this.stocksHistoryService = stocksHistoryService;
  }

  getStocksHistory = async (req, res) => {
    try {
      const { companyId } = req.params;

      const history = await this.stocksHistoryService.getStocksHistory(
        companyId
      );

      if (!history) {
        return res.status(404).json("No history found for this Company");
      }

      return res.status(200).json(history);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };

  createStocksHistory = async (req, res) => {
    try {
      const { companyId, date, visitors, shares_price, shares_return } =
        req.body;

      if (!companyId || !date || !visitors || !shares_price || !shares_return) {
        return res.status(400).json({ message: "Missing Data!" });
      }

      const newHistory = this.stocksHistoryService.createStocksHistory(
        req.body
      );

      return res.status(201).json(newHistory);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };
}

export default StocksHistoryController;
