import styled from '@emotion/styled';
import { Skeleton } from '../../Skeleton/index.styles';
import { BORDER_RADIUS } from '@/constants/styles';
import { MEDIA_QUERY } from '@/constants/media';

export const Wrapper = styled(Skeleton)`
  width: 100%;
  height: 300px;
  border-radius: ${BORDER_RADIUS.LG};
  overflow: hidden;
  @media ${MEDIA_QUERY.DESKTOP} {
    height: 354px;
  }
`;
