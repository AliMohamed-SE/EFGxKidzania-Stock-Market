import { v4 as uuidv4 } from "uuid";

class UserWithdrawController {
  constructor({ transactionService, logger }) {
    this.transactionService = transactionService;
    this.logger = logger;
  }

  getBuyTransactions = async (req, res) => {
    const correlationId = req.headers["x-correlation-id"] || uuidv4();
    const { page, order } = req.query;

    this.logger.info("getBuyTransactions - Request received", {
      correlationId,
      action: "getBuyTransactions",
    });

    try {
      const buyTransactions = await this.transactionService.getBuyTransactions(
        page,
        order,
        correlationId
      );
      this.logger.info(
        "getBuyTransactions - Successfully fetched all user buy transactions",
        {
          correlationId,
          transactionsCount: buyTransactions.length,
          page,
          order,
        }
      );
      res.status(200).json(buyTransactions);
    } catch (error) {
      this.logger.error(
        "getBuyTransactions - Error fetching all user buy transactions",
        {
          correlationId,
          error: error.message,
          stack: error.stack,
        }
      );
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };
}

export default UserWithdrawController;
