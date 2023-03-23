import { createSlice } from '@reduxjs/toolkit';

type LoginState = boolean;

const initialState: LoginState = false;

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // 일단 api는 사용하지 않고 상태만 변경
    login: () => {
      return true;
    },
    logout: () => {
      return false;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
