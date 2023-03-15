import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${PALETTE.BRAND100};
`;

export const Contents = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 2rem;
  padding-top: 86px;
`;
