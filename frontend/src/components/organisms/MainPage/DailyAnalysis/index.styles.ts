import styled from '@emotion/styled';
import { MEDIA_QUERY } from '@/constants/media';
import { Paper } from '@/components/atoms/Paper/index.styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
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
  width: 360px;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 100%;
  }
`;

export const BadgeWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: column;
  }
`;

export const RelatedWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RelatedPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: 2.5rem;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: column;
  }
`;

export const RelatedItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
