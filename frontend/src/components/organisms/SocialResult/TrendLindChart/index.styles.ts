import styled from '@emotion/styled';
import { MEDIA_QUERY } from '@/constants/media';
import { Typography } from '@/components/atoms/Typography/index.styles';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 281px;
  @media ${MEDIA_QUERY.DESKTOP} {
    height: 440px;
  }
`;
export const Title = styled.div`
  font-size: ${FONT_SIZE.TITLE};
  font-weight: ${FONT_WEIGHT.TITLE};
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;
export const SpaceTypography = styled(Typography)`
  margin-bottom: 1rem;
`;
