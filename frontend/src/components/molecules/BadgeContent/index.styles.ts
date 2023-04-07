import styled from '@emotion/styled';
import { MEDIA_QUERY } from '@/constants/media';
import { Paper } from '@/components/atoms/Paper/index.styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;

  @media ${MEDIA_QUERY.DESKTOP} {
    margin: 0 2rem;
  }
`;

export const BadgePaper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  min-width: 10.5rem;
  height: 168px;

  @media ${MEDIA_QUERY.DESKTOP} {
    padding: 1.5rem;
    width: 100%;
    height: 100%;
  }
`;
