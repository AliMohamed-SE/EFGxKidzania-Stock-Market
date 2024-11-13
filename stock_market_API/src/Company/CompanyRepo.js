import Company from "../../db/Schemas/CompanySchema.js";

class CompanyRepo {
  constructor(db) {
    this.db = db;
  }

  addCompany = async (data) => {
    const company = new Company(data);
    return await company.save();
  };

  getCompany = async (companyId) => {
    const company = await Company.findById(companyId);
    return company;
  };

  getCompanies = async (balance) => {
    const companies = await Company.find({ current_price: { $lte: balance } });
    return companies;
  };

  getMostTraded = async () => {
    const companies = await Company.find().sort({ number_of_trades: -1 });
    return companies;
  };

  getMostInvested = async () => {
    const companies = await Company.find().sort({ number_of_buys: -1 });
    return companies;
  };

  getHighestReturn = async () => {
    const companies = await Company.find().sort({ current_return: -1 });
    return companies;
  };

  getMostVisited = async () => {
    const companies = await Company.find().sort({ current_visitors: -1 });
    return companies;
  };

  updateCompany = async (companyId, data) => {
    const company = await Company.findByIdAndUpdate(companyId, data);
    return company;
  };

  async updateAfterTransaction(type, companyId) {
    const update = { $inc: { number_of_trades: 1 } };

    if (type === "Buy") {
      update.$inc.number_of_buys = 1;
    } else if (type === "Sell") {
      update.$inc.number_of_sells = 1;
    } else {
      throw new Error("Invalid transaction type");
    }

    // Perform an atomic update with $inc
    const updatedCompany = await Company.findByIdAndUpdate(companyId, update, {
      new: true,
    });

    return updatedCompany;
  }

  async rollbackAfterTransaction(type, companyId) {
    const company = await Company.findById(companyId);

    if (type === "Buy") {
      company.number_of_buys -= 1;
    } else if (type === "Sell") {
      company.number_of_sells -= 1;
    } else {
      throw new Error("Invalid transaction type");
    }

    company.number_of_trades -= 1;

    await company.save();

    return company;
  }
}

export default CompanyRepo;
