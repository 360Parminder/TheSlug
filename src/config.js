// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://theslugproject.onrender.com';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10);

export const config = {
  api: {
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
  },
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  },
  env: import.meta.env.VITE_ENV || 'development',
  debug: import.meta.env.VITE_DEBUG === 'true',
};

export default config;
