import axios from "axios";

const AuthServices = {
  loginUser: async (email, password) => {
    try {
      const response = await axios.post(
        "https://the-slug-api.herokuapp.com/api/auth/login",
        { email, password }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  registerUser: async (email, password) => {
    try {
      const response = await axios.post(
        "https://the-slug-api.herokuapp.com/api/auth/register",
        { email, password }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  getUser: async (token) => {
    try {
      const response = await axios.get(
        `https://the-slug-api.herokuapp.com/api/auth/user/${token}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  logoutUser: async (token) => {
    try {
      const response = await axios.post(
        `https://the-slug-api.herokuapp.com/api/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default AuthServices;
