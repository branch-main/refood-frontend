import { useAuthContext } from "../contexts";

export const useAuth = () => {
  const ctx = useAuthContext();
  return ctx;
};
