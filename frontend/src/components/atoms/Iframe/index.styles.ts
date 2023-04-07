import styled from '@emotion/styled';
import { BORDER_RADIUS } from '@/constants/styles';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  border-radius: ${BORDER_RADIUS.LG};
  overflow: hidden;
`;

export const Video = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`;
