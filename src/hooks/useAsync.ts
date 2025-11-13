import { useState, useEffect, useCallback, DependencyList } from "react";

export const useAsync = <T, P extends unknown[]>(
  asyncFn: (...params: P) => Promise<T>,
  dependencies: DependencyList
) => {
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...params: P) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn(...params);
      setValue(result);
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: string }; message?: string })?.response?.data 
        || (err as { message?: string })?.message 
        || 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { loading, value, error, reload: execute };
};
