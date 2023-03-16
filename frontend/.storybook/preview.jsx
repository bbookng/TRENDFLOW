import { ThemeProvider } from '@emotion/react';
import GlobalStyle from '../src/styles/GlobalStyle';
import { lightTheme } from '../src/styles/theme';
import { MemoryRouter } from "react-router";

export const decorators = [
  (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
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
