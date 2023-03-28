import styled from '@emotion/styled';
import { MOBILE_MIN_WIDTH } from '../../../../constants/media';
import { MEDIA_QUERY } from '@/constants/media';
import { Paper } from '@/components/atoms/Paper/index.styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  min-width: ${MOBILE_MIN_WIDTH}px;
`;

export const TitleWrapper = styled.div`
  display: flex;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
  }
`;

export const ChartPaper = styled(Paper)`
  width: 100%;
`;

export const BadgeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem 0;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: column;
    margin: 0;

    & > div:first-of-type {
      margin-bottom: 2rem;
    }
  }
`;

export const RelatedWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const RelatedPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: 2.5rem;
  height: 100%;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: column;
  }
`;

export const RelatedItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 45%;
  max-width: 200px;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 100%;
    max-width: auto;
    height: 50%;
  }
`;
