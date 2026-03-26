/**
 * Cookie utility functions for managing authentication tokens and user data
 */

import Cookies from 'js-cookie';

const COOKIE_OPTIONS = {
  secure: true,
  sameSite: 'Strict',
  expires: 7,
};

export const cookieUtils = {
  /**
   * Set a cookie with secure options
   * @param {string} key - Cookie key
   * @param {string} value - Cookie value
   * @param {object} options - Optional cookie options
   */
  setCookie: (key, value, options = {}) => {
    try {
      Cookies.set(key, value, { ...COOKIE_OPTIONS, ...options });
    } catch (error) {
      console.error('Failed to set cookie:', error);
    }
  },

  /**
   * Get a cookie value
   * @param {string} key - Cookie key
   * @returns {string|null} Cookie value or null
   */
  getCookie: (key) => {
    try {
      return Cookies.get(key) || null;
    } catch (error) {
      console.error('Failed to get cookie:', error);
      return null;
    }
  },

  /**
   * Remove a cookie
   * @param {string} key - Cookie key
   */
  removeCookie: (key) => {
    try {
      Cookies.remove(key);
    } catch (error) {
      console.error('Failed to remove cookie:', error);
    }
  },

  /**
   * Clear all cookies
   */
  clearCookies: () => {
    try {
      Object.keys(Cookies.get()).forEach(key => {
        Cookies.remove(key);
      });
    } catch (error) {
      console.error('Failed to clear cookies:', error);
    }
  },
};

export default cookieUtils;
