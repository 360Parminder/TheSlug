import axios from 'axios';
import baseUrl from '../baseUrl';
import { API_ENDPOINTS } from '../constants';
import { logError } from '../utils/errorHandler';

const API = axios.create({
  baseURL: baseUrl.backend,
  withCredentials: true,
});

const UserServices = {
  /**
   * Get user profile
   * @returns {Promise} User profile data
   */
  getUser: async () => {
    try {
      const response = await API.post(API_ENDPOINTS.USER.PROFILE);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      logError(error, 'UserServices.getUser');
      throw error;
    }
  },

  /**
   * Shorten URL
   * @param {string} link - URL to shorten
   * @returns {Promise} Shortened URL data
   */
  fetchUrl: async (link) => {
    try {
      const response = await API.post(API_ENDPOINTS.URL.SHORTEN, {
        redirectURL: link,
      });
      return response.status === 200 ? response.data : null;
    } catch (error) {
      logError(error, 'UserServices.fetchUrl');
      throw error;
    }
  },

  /**
   * Get URL history
   * @returns {Promise} User's URL history
   */
  fetchHistory: async () => {
    try {
      const response = await API.post(API_ENDPOINTS.URL.HISTORY);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      logError(error, 'UserServices.fetchHistory');
      throw error;
    }
  },

  /**
   * Verify email with OTP
   * @param {string} email - Email to verify
   * @returns {Promise} Verification response
   */
  verifyEmail: async (email) => {
    try {
      const response = await API.post(API_ENDPOINTS.EMAIL.VERIFY, { email });
      return response.status === 200 ? response.data : null;
    } catch (error) {
      logError(error, 'UserServices.verifyEmail');
      throw error;
    }
  },
};

export default UserServices;
