import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const HamburgerContainer = styled.div`
  width: 23px;
  height: 20px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  z-index: 1000;
`;
export const Span = styled.span`
  position: absolute;
  display: block;
  height: 4px;
  width: 100%;
  background: ${({ theme }) => theme.text};
  border-radius: 2px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: transform 0.25s ease-in-out;
  -moz-transition: transform 0.25s ease-in-out;
  -o-transition: transform 0.25s ease-in-out;
  transition: transform 0.25s ease-in-out;

  &:nth-of-type(1) {
    top: 0;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  &:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  &:nth-of-type(3) {
    bottom: 0;
    margin-bottom: 0;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }
`;

export const open = css`
  span:nth-of-type(1) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: translateX(4px) rotate(45deg);
  }

  span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }

  span:nth-of-type(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: translateX(4px) rotate(-45deg);
  }
`;
