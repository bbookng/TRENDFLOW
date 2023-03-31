import styled from '@emotion/styled';
import { PALETTE } from '@/constants/palette';
import { BORDER_RADIUS } from '@/constants/styles';
import { Typography } from '@/components/atoms/Typography/index.styles';
import { MEDIA_QUERY } from '@/constants/media';
import { Img } from '@/components/atoms/Img/index.styles';

export const Wrapper = styled.div`
  cursor: pointer;
  border-radius: ${BORDER_RADIUS.MD};
  border: 1px solid ${PALETTE.WHITE300};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 400px;
  height: 168px;
  margin: 0.5rem 0;
  width: 47%;
  background-color: ${PALETTE.WHITE200};

  @media ${MEDIA_QUERY.DESKTOP} {
    background-color: transparent;
    width: 100%;
    flex-direction: row;
    max-height: 112px;
  }
`;

export const Thumbnail = styled(Img)`
  width: 100%;
  height: 75px;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 40%;
    height: auto;
  }
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 55%;
  }
`;

export const TitleTypography = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;
export const DescriptionTypography = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  line-height: 1.2;
`;
