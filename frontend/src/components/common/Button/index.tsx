import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

interface Props{
    children?:string
}

const Button = (props:Props) => {
  const {children} = props
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
   {children}
    </button>
  );
};

export default Button;
