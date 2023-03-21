import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '@/styles/theme';
import router from '@/router';
import GlobalStyle from '@/styles/GlobalStyle';
import { useAppSelector } from '@/hooks/storeHook';

const App = () => {
  const { isDark } = useAppSelector((state) => state);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
