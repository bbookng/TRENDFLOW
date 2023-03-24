import { Typography } from '@/components/atoms';
import { useAppDispatch } from '@/hooks/storeHook';
import { login } from '@/store/slices/userSlice';

const Kakao = () => {
  const dispatch = useAppDispatch();
  const authCode = window.location.search.split('=')[1];
  const data = {
    platformCode: 'PL100',
    authCode,
  };
  dispatch(login(data));
  return <Typography variant="H2">카카오!!!!!!</Typography>;
};

export default Kakao;
