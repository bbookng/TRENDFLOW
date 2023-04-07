import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { BORDER_RADIUS } from '@/constants/styles';
import { MEDIA_QUERY } from '@/constants/media';

interface ButtonProps {
  isDark: boolean;
}

const DarkStyle = css`
  transform: rotate(-45deg);
  & > svg {
    transform: scale(0.5);
    opacity: 0;
  }
  &:hover {
    transform: scale(1.05) rotate(-60deg);
  }
  &:before {
    transform: scale(1) translate(0%, -50%);
    transition: transform 320ms ease-out 0ms;
  }
`;

export const Wrapper = styled.div`
  display: none;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.background};
  border-radius: ${BORDER_RADIUS.ROUND};
  @media ${MEDIA_QUERY.DESKTOP} {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 25px;
    bottom: 25px;
  }
`;

export const Button = styled.button<ButtonProps>`
  display: inline-block;
  border: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: ${BORDER_RADIUS.ROUND};
  background-color: #f9ca24;
  cursor: pointer;
  position: relative;
  transition: all 240ms ease-out 0ms;
  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.background};
    border-radius: ${BORDER_RADIUS.ROUND};
    top: 50%;
    left: 50%;
    transform: scale(0.5) translate(50%, -50%);
    transform-origin: top right;
    transition: transform 320ms ease-out 120ms;
  }
  & > svg {
    transform: scale(1.5);
    color: #f9ca24;
    transition: all 120ms ease-out 240ms;
  }
  &:hover {
    transform: scale(1.05) rotate(-15deg);
  }

  &:active,
  &:focus {
    outline: 0;
  }
  ${(props) => props.isDark && DarkStyle}
`;
