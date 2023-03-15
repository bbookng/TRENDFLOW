import { ThemeProvider } from '@emotion/react';
import GlobalStyle from '../src/styles/GlobalStyle';
import { lightTheme } from '../src/styles/theme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
