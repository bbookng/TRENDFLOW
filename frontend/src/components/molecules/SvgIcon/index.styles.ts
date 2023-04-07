import styled from '@emotion/styled';
import { SvgIconProps } from '@/components/molecules/SvgIcon';
import { BORDER_RADIUS } from '@/constants/styles';
import { PALETTE } from '@/constants/palette';
import { MEDIA_QUERY } from '@/constants/media';

export const Wrapper = styled.div<SvgIconProps>`
  width: 60px;
  height: 60px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: ${BORDER_RADIUS.ROUND};
  background-color: ${PALETTE.BRAND200};
  & > svg {
    width: 30px;
    height: 30px;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 96px;
    height: 96px;
    & > svg {
      width: 48px;
      height: 48px;
    }
  }
`;
