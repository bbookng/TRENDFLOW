import styled from '@emotion/styled';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { MEDIA_QUERY } from '@/constants/media';
import { Typography } from '@/components/atoms/Typography/index.styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${MEDIA_QUERY.DESKTOP} {
    height: 448px;
  }
`;

export const SpaceTypography = styled(Typography)`
  margin-top: 2.875rem;

  @media ${MEDIA_QUERY.DESKTOP} {
    margin-top: 0;
  }
`;
export const WordCloudPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
  }
`;

export const WordCloudContentsWrapper = styled.div`
  width: 100%;
  height: 50%;
  @media ${MEDIA_QUERY.DESKTOP} {
    height: 100%;
  }
`;

export const RankingListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: column;
    margin-left: 2rem;
  }
`;
export const RelatedItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  max-width: 200px;

  @media ${MEDIA_QUERY.DESKTOP} {
    justify-content: space-around;
    width: 100%;
    height: 50%;
    max-width: auto;
  }
`;
