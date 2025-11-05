import { useState, useEffect, useCallback } from "react";

export const useAsync = (asyncFn, dependencies) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn(...params);
      setValue(result);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { loading, value, error, reload: execute };
};
