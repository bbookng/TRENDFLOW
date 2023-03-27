import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '@/store/slices/toastSlice';
/* eslint-disable no-param-reassign */
import { api } from '@/apis/utils/axios';
import { LOGIN_FAILED } from '@/constants/message';

interface LoginDataInterface {
  platformCode: string;
  authCode: string;
}

interface UserStateInterface {
  isLoggedIn: boolean;
  userName: string;
}

const initialState: UserStateInterface = {
  isLoggedIn: false,
  userName: '',
};

const { VITE_MAIN: MAIN } = import.meta.env;

export const login = createAsyncThunk(
  'user/login',
  async (data: LoginDataInterface, { dispatch }) => {
    try {
      const res = await api.post('/member/login', data);
      return res.data;
    } catch (err) {
      dispatch(showToast({ msg: LOGIN_FAILED }));
      throw err;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.userName = payload.body.name;

      // 쿠키 저장
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      if (expirationDate.getDate() > 0) {
        expirationDate.setDate(expirationDate.getDate() - 1);
      }
      window.document.cookie = `refreshToken=${
        payload.body.refreshToken
      };expires=${expirationDate.toUTCString()};path=/`;

      window.localStorage.setItem('accessToken', payload.body.accessToken);
      window.location.href = MAIN;
    });
  },
});

export default userSlice.reducer;
