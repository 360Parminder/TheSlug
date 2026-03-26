/**
 * Error handling and logging utilities
 */

export class ApiError extends Error {
  constructor(message, statusCode = 500, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = 'ApiError';
  }
}

/**
 * Get user-friendly error message from various error types
 * @param {Error|string} error - The error object or message
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.response?.status === 401) {
    return 'Your session has expired. Please login again.';
  }

  if (error?.response?.status === 403) {
    return 'You do not have permission to perform this action.';
  }

  if (error?.response?.status === 404) {
    return 'The requested resource was not found.';
  }

  if (error?.response?.status === 429) {
    return 'Too many requests. Please try again later.';
  }

  if (error?.response?.status === 500) {
    return 'Server error. Please try again later.';
  }

  if (error?.code === 'ECONNABORTED') {
    return 'Request timeout. Please try again.';
  }

  if (error?.message === 'Network Error') {
    return 'Network error. Please check your connection.';
  }

  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};

/**
 * Log error with context
 * @param {Error} error - Error to log
 * @param {string} context - Context where error occurred
 * @param {boolean} isDev - Whether to log in development
 */
export const logError = (error, context = '', isDev = import.meta.env.DEV) => {
  if (isDev) {
    console.error(`[${context}]`, error);
  }

  // In production, you might want to send to an error tracking service
  // e.g., Sentry, LogRocket, etc.
};

export default {
  ApiError,
  getErrorMessage,
  logError,
};
