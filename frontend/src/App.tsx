import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '@/styles/theme';
import router from '@/router';
import GlobalStyle from '@/styles/GlobalStyle';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { openNavbar, closeNavbar } from '@/store/slices/navbarSlice';

const App = () => {
  const dispatch = useAppDispatch();
  window.addEventListener('scroll', (e) => {
    const xPos = window.scrollX;
    if (xPos > 240) {
      dispatch(closeNavbar());
    } else {
      dispatch(openNavbar());
    }
  });
  const { isDark } = useAppSelector((state) => state);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
