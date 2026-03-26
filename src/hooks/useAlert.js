/**
 * Custom hook for managing alerts/toasts
 */

import { useState, useCallback } from 'react';
import { UI_CONSTANTS, ALERT_TYPES } from '../constants';

export const useAlert = () => {
  const [alert, setAlert] = useState({
    message: '',
    type: null,
  });

  const showAlert = useCallback((message, type = ALERT_TYPES.INFO) => {
    setAlert({ message, type });

    const timer = setTimeout(() => {
      setAlert({ message: '', type: null });
    }, UI_CONSTANTS.ALERT_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const hideAlert = useCallback(() => {
    setAlert({ message: '', type: null });
  }, []);

  return {
    alert,
    showAlert,
    hideAlert,
    isShowing: !!alert.type,
  };
};

export default useAlert;
