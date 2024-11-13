import Transaction from "../../db/Schemas/TransactionSchema.js";

class TransactionRepo {
  constructor(db) {
    this.db = db;
  }

  async addTransaction(data) {
    const transaction = new Transaction(data);
    return await transaction.save();
  }

  async getAllTransactions() {
    const transactions = await Transaction.find();
    return transactions;
  }

  async deleteTransaction(transactionId) {
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    return transaction;
  }
}

export default TransactionRepo;
