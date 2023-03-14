import '@emotion/react';

type ThemeId = 'light' | 'dark';

declare module '@emotion/react' {
  export interface Theme {
    [key in ThemeId]: {
      contentBackground: string;
      background: string;
      positive: string;
      negative: string;
    };
  }
}
