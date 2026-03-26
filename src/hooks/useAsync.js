/**
 * Custom hook for handling async API requests
 */

import { useState, useCallback } from 'react';
import { getErrorMessage, logError } from '../utils/errorHandler';

export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setStatus('pending');
      setLoading(true);
      setData(null);
      setError(null);

      try {
        const response = await asyncFunction(...args);
        setStatus('success');
        setData(response);
        setError(null);
        return response;
      } catch (err) {
        const message = getErrorMessage(err);
        setStatus('error');
        setError(message);
        setData(null);
        logError(err, 'useAsync');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  return {
    execute,
    status,
    loading,
    data,
    error,
    isLoading: loading,
    isError: status === 'error',
    isSuccess: status === 'success',
  };
};

export default useAsync;
