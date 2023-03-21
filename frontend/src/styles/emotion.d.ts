import '@emotion/react';

type ThemeId = 'light' | 'dark';

declare module '@emotion/react' {
  export interface Theme {
    background: string;
    contentBackground: string;
    text: string;
    text200: string;
    border: string;

    navBackground: string;
    navSelected: string;
    navNotSelected: string;

    positive: string;
    negative: string;
  }
}
