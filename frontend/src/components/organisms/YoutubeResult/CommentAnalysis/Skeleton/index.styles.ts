/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { MEDIA_QUERY } from '@/constants/media';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/styles';
import { PALETTE } from '@/constants/palette';
import { Skeleton } from '@/components/atoms/Skeleton/index.styles';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  @media ${MEDIA_QUERY.DESKTOP} {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.div`
  font-size: ${FONT_SIZE.TITLE};
  font-weight: ${FONT_WEIGHT.TITLE};
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;
export const CommentPaper = styled(Paper)`
  width: 100%;
  height: 440px;
`;

export const SkeletonContent = styled(Skeleton)`
  width: 100%;
  height: 100%;
`;
