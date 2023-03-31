import styled from '@emotion/styled';
import { Typography } from '@/components/atoms/Typography/index.styles';
import { MEDIA_QUERY } from '@/constants/media';

export const Container = styled.div`
  margin-top: 2.875rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 45%;
    height: 100%;
  }
`;

export const SpaceTypography = styled(Typography)`
  margin-bottom: 1rem;
`;
