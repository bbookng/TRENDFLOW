import styled from '@emotion/styled';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { PALETTE } from '@/constants/palette';
import { MEDIA_QUERY } from '@/constants/media';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentPaper = styled(Paper)`
  display: flex;
  width: 360px;
  padding: 2.5rem;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 100%;
  }
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

export const RankingWrapper = styled.div`
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
`;
