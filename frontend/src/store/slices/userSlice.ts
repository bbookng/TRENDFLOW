/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/apis/utils/axios';

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

export const login = createAsyncThunk('user/login', async (data: LoginDataInterface) => {
  const res = await api.post('/member/login', data);
  return res.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      console.log('페이로드 바디', payload.body);
      console.log('페이로드 네임', payload.body.name);
      console.log('페이로드 액세스', payload.body.accessToken);
      console.log('페이로드 리프레시', payload.body.refreshToken);
      state.isLoggedIn = true;
      state.userName = payload.name;
      document.cookie = `refreshToken=${payload.refreshToken}`;
      window.localStorage.setItem('accessToken', payload.accessToken);
      // window.location.href = MAIN;
    });
  },
});

export default userSlice.reducer;
