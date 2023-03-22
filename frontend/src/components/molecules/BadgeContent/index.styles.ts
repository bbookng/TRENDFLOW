import styled from '@emotion/styled';
import { MEDIA_QUERY } from '@/constants/media';
import { Paper } from '@/components/atoms/Paper/index.styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BadgePaper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 168px;
  height: 168px;
  padding: 0;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 100%;
    height: 100%;
  }
`;
