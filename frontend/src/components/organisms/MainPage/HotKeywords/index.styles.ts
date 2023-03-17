import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TempChart = styled.div`
  width: 292px;
  border-radius: 50%;
  color: ${PALETTE.BRAND400};
`;

export const MobileRankingWrapper = styled.div`
  display: flex;
  flex-direction: row;

  &:first-of-type {
    margin-right: 1rem;
  }
`;
