import GlobalStyle from '../src/styles/GlobalStyle';
import { MemoryRouter } from 'react-router';
import { Provider, useSelector } from 'react-redux';
import store from '../src/store/store';
import { ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '../src/styles/theme';

export const decorators = [
  (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <GlobalStyle />
        <Story />
      </Provider>
    </MemoryRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
