import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import router from '@/router';
import { darkTheme, lightTheme } from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { openNavbar, closeNavbar } from '@/store/slices/navbarSlice';
import Toast from '@/components/@shared/Toast';

const App = () => {
  const { isDark, toast } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  window.addEventListener('scroll', () => {
    const xPos = window.scrollX;
    if (xPos > 0) {
      dispatch(closeNavbar());
    } else {
      dispatch(openNavbar());
    }
  });

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      {toast.isVisible && <Toast />}
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
