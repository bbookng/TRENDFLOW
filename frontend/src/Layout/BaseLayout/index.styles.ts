import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';

export const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${PALETTE.BRAND100};
`;

export const Main = styled.main`
  width: 100%;
  position: relative;
  top: 56px;
  margin: 0 auto;
  flex: 1;
  margin-bottom: 56px;
`;

export const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 2rem 2rem 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
