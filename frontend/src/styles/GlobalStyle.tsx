/* eslint-disable import/extensions */
import { css, Global } from '@emotion/react';
import { reset } from '@/styles/reset';
import PRETENDARD_WOFF from '@/assets/fonts/PRETENDARD/PretendardVariable.woff2';

const style = css`
  ${reset}

  @font-face {
    font-family: 'PRETENDARD';
    src: url('${PRETENDARD_WOFF}') format('woff2-variations');
    font-weight: 45 920;
    font-style: normal;
    font-display: swap;
  }
  html {
    font-family: 'PRETENDARD';
  }
`;
const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
