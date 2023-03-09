import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

const Button = () => {
  const buttonStyle = css`
    width: 150px;
    height: 50px;
    background-color: ${theme.light.background};
    border: none;
    color: ${theme.light.color};
    font-size: 1rem;
  `;
  return (
    <button type="button" css={buttonStyle}>
      ㅎㅇ띠
    </button>
  );
};

export default Button;
