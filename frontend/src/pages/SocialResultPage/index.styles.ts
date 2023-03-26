import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TypeWrapper = styled.div`
  width: 50%;
`;

export const HighLight = styled.span`
  color: ${PALETTE.BRAND400};
  font-weight: bold;
`;
