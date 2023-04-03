/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { MEDIA_QUERY } from '@/constants/media';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/styles';
import { PALETTE } from '@/constants/palette';

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
  height: 440px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  @media ${MEDIA_QUERY.DESKTOP} {
    height: 320px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${PALETTE.BRAND400};
  }
`;

export const Filter = styled.div`
  display: flex;
  gap: 1rem;
`;
interface FBProps {
  kind: string;
  isClick: boolean;
}
export const FilterBtn = styled.span<FBProps>`
  cursor: pointer;
  transition: 500ms;
  color: ${({ kind, isClick }) =>
    isClick
      ? kind === 'positive'
        ? PALETTE.BLUE400
        : kind === 'negative'
        ? PALETTE.RED400
        : PALETTE.BRAND400
      : PALETTE.BLACK100};
  font-weight: ${({ isClick }) => isClick && '700'};
`;
