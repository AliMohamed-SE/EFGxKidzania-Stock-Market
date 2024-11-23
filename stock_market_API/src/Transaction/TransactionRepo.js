import Transaction from "../../db/Schemas/TransactionSchema.js";
class TransactionRepo {
  constructor({ logger }) {
    this.logger = logger;
  }

  async addTransaction(data, correlationId) {
    try {
      this.logger.info("addTransaction - Adding a new transaction to the DB", {
        correlationId,
        data,
      });

      const transaction = new Transaction(data);
      const savedTransaction = await transaction.save();

      return savedTransaction;
    } catch (error) {
      throw error;
    }
  }

  async getAllTransactions(correlationId) {
    try {
      this.logger.info(
        "getAllTransactions - Fetching all transactions from the DB",
        {
          correlationId,
        }
      );
      const transactions = await Transaction.find();

      return transactions;
    } catch (error) {
      throw error;
    }
  }

  async deleteTransaction(transactionId, correlationId) {
    try {
      this.logger.info("deleteTransaction - Deleting transaction from the DB", {
        correlationId,
        transactionId,
      });
      const deletedTransaction = await Transaction.findByIdAndDelete(
        transactionId
      );

      return deletedTransaction;
    } catch (error) {
      throw error;
    }
  }
}

export default TransactionRepo;
