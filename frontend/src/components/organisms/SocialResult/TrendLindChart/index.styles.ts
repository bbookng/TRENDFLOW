import styled from '@emotion/styled';
import { MEDIA_QUERY } from '@/constants/media';
import { Typography } from '@/components/atoms/Typography/index.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${MEDIA_QUERY.DESKTOP} {
    height: 448px;
  }
`;

export const SpaceTypography = styled(Typography)`
  margin-bottom: 1rem;
`;
