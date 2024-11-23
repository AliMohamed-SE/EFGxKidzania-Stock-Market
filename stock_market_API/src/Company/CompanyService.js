class CompanyService {
  constructor({ companyRepo, logger }) {
    this.companyRepo = companyRepo;
    this.logger = logger;
  }

  getCompany = async (companyId, correlationId) => {
    try {
      const company = await this.companyRepo.getCompany(
        companyId,
        correlationId
      );
      if (!company) {
        this.logger.warn("getCompany - No company found", {
          correlationId,
          companyId,
        });
      }
      return company;
    } catch (error) {
      throw error;
    }
  };

  getCompanies = async (balance, correlationId) => {
    try {
      const currentBalance = balance || 0;
      const companies = await this.companyRepo.getCompanies(
        currentBalance,
        correlationId
      );

      return companies;
    } catch (error) {
      throw error;
    }
  };

  getMostTraded = async (correlationId) => {
    try {
      const companies = await this.companyRepo.getMostTraded(correlationId);

      return companies;
    } catch (error) {
      throw error;
    }
  };

  getMostInvested = async (correlationId) => {
    try {
      const companies = await this.companyRepo.getMostInvested(correlationId);

      return companies;
    } catch (error) {
      throw error;
    }
  };

  getHighestReturn = async (correlationId) => {
    try {
      const companies = await this.companyRepo.getHighestReturn(correlationId);

      return companies;
    } catch (error) {
      throw error;
    }
  };

  getMostVisited = async (correlationId) => {
    try {
      const companies = await this.companyRepo.getMostVisited(correlationId);

      return companies;
    } catch (error) {
      throw error;
    }
  };

  createCompany = async (data, correlationId) => {
    try {
      const company = await this.companyRepo.addCompany(data, correlationId);

      return company;
    } catch (error) {
      throw error;
    }
  };

  updateCompany = async (data, correlationId) => {
    try {
      const company = await this.companyRepo.updateCompany(data, correlationId);

      return company;
    } catch (error) {
      throw error;
    }
  };

  updateCompanies = async (filePath, correlationId) => {
    try {
      this.logger.info("Parsing the spreadsheet", { correlationId, filePath });
      // Step 1: Parse the spreadsheet
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);
      99;

      this.logger.debug("Parsed the spreadsheet successfully", {
        correlationId,
        data,
      });

      // Step 2: Fetch all relevant companies
      const acronyms = data.map((row) => row.acronym);
      const companies = await Company.find({ acronym: { $in: acronyms } });
      const companyMap = new Map(
        companies.map((company) => [company.acronym, company])
      );

      // Prepare bulk operations
      const stockHistoryOperations = [];
      const companyUpdateOperations = [];

      // Step 3: Process each row in the spreadsheet
      const currentDate = new Date();
      for (const row of data) {
        const { acronym, visitors } = row;
        const company = companyMap.get(acronym);

        if (!company) {
          console.warn(`Company with acronym "${acronym}" not found.`);
          continue;
        }

        // Calculate new price, change, and return
        const previousPrice = company.current_price;
        const newPrice = parseFloat((visitors / 100).toFixed(2));
        const priceChange = parseFloat((newPrice - previousPrice).toFixed(2));
        const priceReturn =
          previousPrice !== 0
            ? parseFloat(((priceChange / previousPrice) * 100).toFixed(2))
            : 0;

        // Save current record in stockhistory
        stockHistoryOperations.push({
          insertOne: {
            document: {
              companyId: company._id,
              date: currentDate,
              previousVisitors: company.current_visitors,
              previousPrice,
            },
          },
        });

        // Update company fields
        companyUpdateOperations.push({
          updateOne: {
            filter: { _id: company._id },
            update: {
              current_visitors: visitors,
              current_price: newPrice,
              current_change: priceChange,
              current_return: priceReturn,
            },
          },
        });
      }

      // Step 4: Bulk write to the database
      if (stockHistoryOperations.length > 0) {
        await StockHistory.bulkWrite(stockHistoryOperations);
      }

      if (companyUpdateOperations.length > 0) {
        await Company.bulkWrite(companyUpdateOperations);
      }

      console.log("Spreadsheet processing completed successfully.");
    } catch (error) {
      console.error("Error processing spreadsheet:", error.message);
      throw error;
    }
  };
}

export default CompanyService;
