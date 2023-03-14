/* eslint-disable import/extensions */
import { css, Global } from '@emotion/react';
import emotionReset from 'emotion-reset';
import PRETENDARD_WOFF from '@/assets/fonts/PRETENDARD/PretendardVariable.woff2';
import { MEDIA_QUERY } from '@/constants/media';

const style = css`
  ${emotionReset}
  @font-face {
    font-family: 'PRETENDARD';
    src: url('${PRETENDARD_WOFF}') format('woff2-variations');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  html,
  span,
  a,
  input,
  textarea,
  button {
    font-family: 'PRETENDARD';
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

  @media ${MEDIA_QUERY.DESKTOP} {
    html {
      font-size: 16px;
    }
  }
  ,
  @media ${MEDIA_QUERY.TABLET} {
    html {
      font-size: 14px;
    }
  }
  @media ${MEDIA_QUERY.MOBILE} {
    html {
      font-size: 12px;
    }
  }
`;
const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
