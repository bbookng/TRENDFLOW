import styled from '@emotion/styled';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { MEDIA_QUERY } from '@/constants/media';

export const Wrapper = styled.div<{ desktopWidth?: string }>`
  width: 100%;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: ${({ desktopWidth }) => desktopWidth || '676px'};
  }
`;

export const BarPaper = styled(Paper)`
  width: 100%;
  height: 260px;

  @media ${MEDIA_QUERY.DESKTOP} {
    height: 448px;
  }
`;
