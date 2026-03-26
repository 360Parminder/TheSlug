/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    REFRESH_TOKEN: '/refresh-token',
  },
  USER: {
    PROFILE: '/view_profile',
    UPDATE_PROFILE: '/update_profile',
  },
  URL: {
    SHORTEN: '/url_shorten',
    HISTORY: '/show_urls',
    ANALYTICS: '/url_analytics',
  },
  EMAIL: {
    VERIFY: '/email_verify',
  },
};

/**
 * Alert message types
 */
export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  PREFERENCES: 'user_preferences',
  IP_ADDRESS: 'ip_address',
};

/**
 * Cookie names
 */
export const COOKIE_NAMES = {
  TOKEN: 'token',
  IP_ADDRESS: 'ip_address',
  PREFERENCES: 'preferences',
};

/**
 * UI Constants
 */
export const UI_CONSTANTS = {
  ALERT_DURATION: 3000,
  LOADER_DELAY: 1000,
  DEBOUNCE_DELAY: 300,
};

/**
 * Gender options
 */
export const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

/**
 * Routes
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/',
  HISTORY: '/history',
  PROFILE: '/profile',
  NOT_FOUND: '*',
};

export default {
  API_ENDPOINTS,
  ALERT_TYPES,
  STORAGE_KEYS,
  COOKIE_NAMES,
  UI_CONSTANTS,
  GENDER_OPTIONS,
  ROUTES,
};
