import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import store from '@/store/store';
import { theme } from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import router from '@/router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
