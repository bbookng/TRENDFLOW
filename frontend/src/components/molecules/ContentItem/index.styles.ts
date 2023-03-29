import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';
import { BORDER_RADIUS } from '@/constants/styles';
import { Typography } from '@/components/atoms/Typography/index.styles';

export const Wrapper = styled.div`
  background-color: transparent;
  border-radius: ${BORDER_RADIUS.MD};
  border: 1px solid ${PALETTE.WHITE300};
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  max-width: 400px;
  max-height: 112px;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const DescriptionTypography = styled(Typography)`
  line-height: 1.2;
`;
