import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';

export const Dim = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  background: rgba(56, 56, 56, 0.5);
  transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 70%;
  height: 100%;
  background-color: ${PALETTE.WHITE100};
`;

export const Contents = styled.div`
  margin-top: 50px;
`;
export const open = css`
  width: 100%;
  left: 0;
`;
