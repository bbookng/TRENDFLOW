import '@emotion/react';

type ThemeId = 'light' | 'dark';

declare module '@emotion/react' {
  export interface Theme {
    [key in ThemeId]: {
      background: string;
      color: string;
      primary: string;
    };
  }
}
