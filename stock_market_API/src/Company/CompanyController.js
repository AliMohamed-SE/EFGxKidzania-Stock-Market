class CompanyController {
  constructor({ companyService }) {
    this.companyService = companyService;
  }

  getCompany = async (req, res) => {
    try {
      const { companyId } = req.params;

      // Check if Id is provided
      if (!companyId) {
        return res
          .status(400)
          .json({ error: "CompanyId parameter is required" });
      }

      const company = await this.companyService.getCompany(companyId);

      // If company not found, return 404 status
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }

      // User found, return 200 status with user data
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  };

  getCompanyMetrics = async (req, res) => {
    try {
      const mostTraded = await this.companyService.getMostTraded();
      const mostInvested = await this.companyService.getMostInvested();
      const highestReturn = await this.companyService.getHighestReturn();
      const mostVisited = await this.companyService.getMostVisited();

      const metrics = {
        trending_now: mostTraded,
        most_traded: mostInvested,
        highest_return: highestReturn,
        most_visited: mostVisited,
      };

      return res.status(200).json(metrics);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };

  getMostTraded = async (req, res) => {
    try {
      const companies = await this.companyService.getMostTraded();

      return res.status(200).json(companies);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };

  getMostInvested = async (req, res) => {
    try {
      const companies = await this.companyService.getMostInvested();

      return res.status(200).json(companies);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };

  getHighestReturn = async (req, res) => {
    try {
      const companies = await this.companyService.getHighestReturn();

      return res.status(200).json(companies);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };

  getMostVisited = async (req, res) => {
    try {
      const companies = await this.companyService.getMostVisited();

      return res.status(200).json(companies);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };

  getCompanies = async (req, res) => {
    try {
      const { balance } = req.params;

      const companies = await this.companyService.getCompanies(balance);

      return res.status(200).json(companies);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };

  createCompany = async (req, res) => {
    try {
      // Extract company data from the request body
      const { name, description, logo } = req.body;

      // Validate the data (this can be more extensive based on your requirements)
      if (!name || !description || !logo) {
        return res
          .status(400)
          .json({ message: "Name, Description and Logo fields are required." });
      }

      // Create a new company instance
      const newCompany = this.companyService.createCompany(req.body);

      // Respond with the newly created company
      return res.status(201).json(newCompany);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  };
}

export default CompanyController;
