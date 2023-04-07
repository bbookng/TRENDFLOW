import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { hideToast } from '@/store/slices/toastSlice';
import * as S from './index.styles';

const Toast = () => {
  const { toast } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toast.msg) {
      setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
    }
  }, [dispatch, toast.msg]);

  return <S.Wrapper>{toast.msg}</S.Wrapper>;
};

export default Toast;
