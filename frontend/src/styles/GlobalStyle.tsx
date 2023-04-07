/* eslint-disable import/extensions */
import { css, Global, useTheme } from '@emotion/react';
import emotionReset from 'emotion-reset';
import PRETENDARD_WOFF from '@/assets/fonts/PRETENDARD/PretendardVariable.woff2';
import { MEDIA_QUERY } from '@/constants/media';
import { PALETTE } from '@/constants/palette';
import { dataPickerGlobalStyle } from '@/styles/dataPicker/inddex';

const GlobalStyle = () => {
  const theme = useTheme();

  const style = css`
    ${emotionReset}
    ${dataPickerGlobalStyle}
    @font-face {
      font-family: 'PRETENDARD';
      src: url('${PRETENDARD_WOFF}') format('woff2-variations');
      font-style: normal;
      font-display: swap;
    }

    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    html {
      font-size: 14px;
      background-color: ${theme.background};
    }

    html,
    span,
    a,
    input,
    textarea,
    button {
      font-family: 'PRETENDARD';
      font-weight: 500;
    }

    a {
      text-decoration: none;
      color: black;
    }
    input {
      border: none;
      outline: none;
    }
    textarea {
      border: none;
      resize: none;
      outline: none;
      line-height: 20px;
    }
    button {
      border: none;
      cursor: pointer;
    }

    @media ${MEDIA_QUERY.TABLET} {
      html {
        font-size: 14px;
      }
    }

    @media ${MEDIA_QUERY.DESKTOP} {
      html {
        font-size: 16px;
      }
    }
  `;

  return <Global styles={style} />;
};

export default GlobalStyle;
