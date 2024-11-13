import StockHistory from "../../db/Schemas/StocksHistory.js";

class StocksHistoryRepo {
  constructor(db) {
    this.db = db;
  }

  addStocksHistory = async (data) => {
    const stocksHistory = new StockHistory(data);
    return await stocksHistory.save();
  };

  getStocksHistory = async (companyId) => {
    const stocksHistory = await StockHistory.find({ companyId: companyId });
    return stocksHistory;
  };

  getStocksHistoryByDate = async (companyId, date) => {
    const stocksHistory = await StockHistory.findOne({
      companyId: companyId,
      date: date,
    });
    return stocksHistory;
  };

  updateStocksHistory = async (stocksHistoryId, data) => {
    const stocksHistory = await StockHistory.findByIdAndUpdate(
      stocksHistoryId,
      data
    );
    return stocksHistory;
  };
}

export default StocksHistoryRepo;
