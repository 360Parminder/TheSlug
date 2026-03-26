import Cookies from 'js-cookie';
import { createContext, useCallback, useEffect, useState } from 'react';
import UserServices from '../Services/UserServices';
import { COOKIE_NAMES } from '../constants';
import { logError } from '../utils/errorHandler';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUser = useCallback(async (userToken) => {
    if (!userToken) {
      return;
    }

    try {
      const userData = await UserServices.getUser(userToken);
      if (userData?.user) {
        setUser(userData.user);
      }
    } catch (error) {
      logError(error, 'fetchUser');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = Cookies.get(COOKIE_NAMES.TOKEN);

        if (storedToken) {
          setToken(storedToken);
          setIsLoggedIn(true);
          await fetchUser(storedToken);
        } else {
          setIsLoggedIn(false);
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        logError(error, 'initializeAuth');
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [fetchUser]);

  const login = useCallback((userToken, userData = null) => {
    setToken(userToken);
    setUser(userData);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove(COOKIE_NAMES.TOKEN);
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const value = {
    isLoading,
    token,
    user,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

