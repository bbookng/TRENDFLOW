import styled from '@emotion/styled';
import { ImgPropsInterface } from '@/components/atoms/Img';

export const Img = styled.img<ImgPropsInterface>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
