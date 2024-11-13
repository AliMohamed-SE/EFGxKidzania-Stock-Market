class StocksHistoryService {
  constructor({ stocksHistoryRepo }) {
    this.stocksHistoryRepo = stocksHistoryRepo;
  }

  getStocksHistory = async (companyId) => {
    const history = await this.stocksHistoryRepo.getStocksHistory(companyId);

    return history;
  };

  createStocksHistory = async (data) => {
    const { companyId, date } = data;

    let stocksHistory;

    const existingStocksHistory =
      await this.stocksHistoryRepo.getStocksHistoryByDate(companyId, date);

    if (existingStocksHistory) {
      stocksHistory = await this.stocksHistoryRepo.updateStocksHistory(
        existingStocksHistory._id,
        data
      );
    } else {
      stocksHistory = await this.stocksHistoryRepo.addStocksHistory(data);
    }

    return stocksHistory;
  };
}

export default StocksHistoryService;
