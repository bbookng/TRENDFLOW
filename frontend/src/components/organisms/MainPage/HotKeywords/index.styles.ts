import styled from '@emotion/styled';
import { MOBILE_MIN_WIDTH, MEDIA_QUERY } from '@/constants/media';
import { Paper } from '@/components/atoms/Paper/index.styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContentPaper = styled(Paper)`
  display: flex;
  padding: 2.5rem;
  min-width: ${MOBILE_MIN_WIDTH}px;
`;

export const ChartWrapper = styled.div`
  display: none;

  & > div {
    margin: auto 2rem auto 0;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    display: flex;
  }
`;

export const RankingWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: column;
    margin-left: 2rem;
  }
`;

export const RankingItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  max-width: 200px;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 100%;
    max-width: auto;
  }
`;
