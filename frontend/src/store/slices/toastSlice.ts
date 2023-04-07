import { createSlice } from '@reduxjs/toolkit';

interface ToastInterface {
  msg: string;
  isVisible?: boolean;
}

const initialState: ToastInterface = {
  msg: '',
  isVisible: false,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, { payload }) => {
      const newState = {
        msg: payload,
        isVisible: true,
      };
      return newState;
    },
    hideToast: () => {
      return initialState;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
