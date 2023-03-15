import '@emotion/react';

type ThemeId = 'light' | 'dark';

declare module '@emotion/react' {
  export interface Theme {
    contentBackground: string;
    background: string;
    positive: string;
    negative: string;
    text: string;
  }
}
