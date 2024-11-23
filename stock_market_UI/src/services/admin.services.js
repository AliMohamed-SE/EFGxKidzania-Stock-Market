import apiClient from "../apis/apiClient";

const login = async (email, password) => {
  try {
    const response = await apiClient.post(`admin/login`, { email, password });

    const admin = response.data;

    return admin;
  } catch (error) {
    throw new Error("Invalid Credentials");
  }
};

export const adminService = {
  login,
};
