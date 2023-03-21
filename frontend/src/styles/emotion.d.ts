import '@emotion/react';

type ThemeId = 'light' | 'dark';

declare module '@emotion/react' {
  export interface Theme {
    contentBackground: string;
    background: string;
    text: string;
    text200: string;
    border: string;
    headerBorder: string;
    positive: string;
    negative: string;
    navbarBackground: string;
    navbarActiveColor: string;
  }
}
