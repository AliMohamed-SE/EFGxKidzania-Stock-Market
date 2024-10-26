import apiClient from "../apis/apiClient";
import UserEntity from "../entities/userEntity";

const login = async (username, password) => {
  try {
    const response = await apiClient.post("users/login", {
      username,
      password,
    });

    const user = new UserEntity(response.data);

    return user;
  } catch (error) {
    throw new Error("Invalid Credentials");
  }
};

const register = async (registerData) => {
  try {
    console.log(registerData);
    const response = await apiClient.post("users/register", {
      ...registerData,
    });
    console.log(response);

    const user = new UserEntity(response.data);

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid Data, Failed to register");
  }
};

const isUsernameAvailable = async (username) => {
  try {
    await apiClient.get(`users/${username}`);

    return true;
  } catch (error) {
    return false;
  }
};

export const userService = {
  login,
  register,
  isUsernameAvailable,
};
