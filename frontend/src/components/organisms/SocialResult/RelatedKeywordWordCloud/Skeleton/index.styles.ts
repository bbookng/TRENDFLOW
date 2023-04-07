import styled from '@emotion/styled';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { MEDIA_QUERY } from '@/constants/media';
import { Typography } from '@/components/atoms/Typography/index.styles';
import { Skeleton } from '@/components/atoms/Skeleton/index.styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 448px;
`;

export const SpaceTypography = styled(Typography)`
  margin-top: 2.875rem;

  @media ${MEDIA_QUERY.DESKTOP} {
    margin-top: 0;
  }
`;
export const WordCloudPaper = styled(Paper)`
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const WordCloudContentsWrapper = styled(Skeleton)`
  width: 100%;
  height: 100%;
  @media ${MEDIA_QUERY.DESKTOP} {
    height: 100%;
  }
`;
