/**
 * Validation utility functions
 */

export const validators = {
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid email
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   * - At least 8 characters
   * - At least one uppercase letter
   * - At least one number
   * - At least one special character
   * @param {string} password - Password to validate
   * @returns {boolean} True if password meets requirements
   */
  isValidPassword: (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} True if valid URL
   */
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate mobile number
   * @param {string} mobile - Mobile number to validate
   * @returns {boolean} True if valid mobile
   */
  isValidMobile: (mobile) => {
    const mobileRegex = /^[0-9]{10,}$/;
    return mobileRegex.test(mobile.replace(/\s/g, ''));
  },

  /**
   * Check if string is empty
   * @param {string} str - String to check
   * @returns {boolean} True if empty
   */
  isEmpty: (str) => {
    return str === null || str === undefined || str.trim() === '';
  },
};

export const getPasswordErrorMessage = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters long';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/\d/.test(password)) return 'Password must contain at least one number';
  if (!/[@$!%*?&]/.test(password)) return 'Password must contain at least one special character (@$!%*?&)';
  return '';
};

export default validators;
