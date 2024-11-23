import StockHistory from "../../db/Schemas/StocksHistory.js";

class StocksHistoryRepo {
  constructor({ logger }) {
    this.logger = logger;
  }

  addStocksHistory = async (data, correlationId) => {
    this.logger.info("addStocksHistory - Adding new stocks history", {
      correlationId,
      data,
    });
    const stocksHistory = new StockHistory(data);
    return await stocksHistory.save();
  };

  getStocksHistory = async (companyId, correlationId) => {
    this.logger.info("getStocksHistory - Fetching history for company", {
      correlationId,
      companyId,
    });
    const stocksHistory = await StockHistory.find({ companyId: companyId });
    return stocksHistory;
  };

  getStocksHistoryByDate = async (companyId, date, correlationId) => {
    this.logger.info(
      "getStocksHistoryByDate - Fetching history for company and date",
      { correlationId, companyId, date }
    );
    const stocksHistory = await StockHistory.findOne({
      companyId: companyId,
      date: date,
    });
    return stocksHistory;
  };

  updateStocksHistory = async (stocksHistoryId, data, correlationId) => {
    this.logger.info("updateStocksHistory - Updating stocks history", {
      correlationId,
      stocksHistoryId,
      data,
    });
    const stocksHistory = await StockHistory.findByIdAndUpdate(
      stocksHistoryId,
      data
    );
    return stocksHistory;
  };
}

export default StocksHistoryRepo;
