import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';

export const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  background: rgba(56, 56, 56, 0.5);
  display: none;
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-height: 100vh;
  height: 100vh;
  background-color: ${({ theme }) => theme.contentBackground};
  transition: 0.3s cubic-bezier(0, 1, 1, 1.01);
`;

export const Contents = styled.div`
  margin-top: 50px;
`;

export const dimVisible = css`
  display: block;
`;
export const open = css`
  width: 60%;
  left: 0;
`;
