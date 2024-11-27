class UserWithdrawService {
  constructor({ transactionRepo, logger }) {
    this.transactionRepo = transactionRepo;
    this.logger = logger;
  }

  // Get all user withdrawals
  getBuyTransactions = async (correlationId) => {
    this.logger.info(
      "getBuyTransactions - Service layer: Fetching all user buy transactions",
      {
        correlationId,
      }
    );

    try {
      const buyTransactions = await this.transactionRepo.getBuyTransactions(
        page,
        order,
        "Buy",
        correlationId
      );

      return buyTransactions;
    } catch (error) {
      throw error;
    }
  };
}

export default UserWithdrawService;
