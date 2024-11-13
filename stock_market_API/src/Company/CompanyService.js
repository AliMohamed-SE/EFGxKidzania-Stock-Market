class CompanyService {
  constructor({ companyRepo }) {
    this.companyRepo = companyRepo;
  }

  getCompany = async (companyId) => {
    const company = await this.companyRepo.getCompany(companyId);

    return company;
  };

  getCompanies = async (balance) => {
    let currentBalance = 0;
    if (balance) {
      currentBalance = balance;
    }
    const companies = await this.companyRepo.getCompanies(currentBalance);

    return companies;
  };

  getMostTraded = async () => {
    const companies = await this.companyRepo.getMostTraded();
    return companies;
  };

  getMostInvested = async () => {
    const companies = await this.companyRepo.getMostInvested();
    return companies;
  };

  getHighestReturn = async () => {
    const companies = await this.companyRepo.getHighestReturn();
    return companies;
  };

  getMostVisited = async () => {
    const companies = await this.companyRepo.getMostVisited();
    return companies;
  };

  createCompany = async (data) => {
    const company = await this.companyRepo.addCompany(data);

    return company;
  };
}

export default CompanyService;
