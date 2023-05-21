import { useAppDispatch } from '../store';
import { setUser } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const authUser = (idInstance: string, token: string) => {
    dispatch(setUser({ token, idInstance }));
  };

  return [authUser];
};
