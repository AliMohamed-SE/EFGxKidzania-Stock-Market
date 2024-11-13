import apiClient from "../apis/apiClient";

const getCompanies = async (balance) => {
  try {
    const response = await apiClient.get(`companies/get-companies/${balance}`);

    const companies = response.data;

    return companies;
  } catch (error) {
    throw new Error("An unexpected Error Occurred please contact the admins");
  }
};

const getMetrics = async () => {
  try {
    const metrics = await apiClient.get(`companies/metrics`);

    return metrics.data;
  } catch (error) {
    throw new Error("An unexpected Error Occurred please contact the admins");
  }
};

export const companyService = {
  getCompanies,
  getMetrics,
};
