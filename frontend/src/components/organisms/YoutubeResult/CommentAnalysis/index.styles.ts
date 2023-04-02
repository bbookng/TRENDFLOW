import styled from '@emotion/styled';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { MEDIA_QUERY } from '@/constants/media';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/styles';
import { PALETTE } from '@/constants/palette';

export const Wrapper = styled.div`
  width: 100%;
  @media ${MEDIA_QUERY.DESKTOP} {
    width: 500px;
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.div`
  font-size: ${FONT_SIZE.TITLE};
  font-weight: ${FONT_WEIGHT.TITLE};
  margin-bottom: 1rem;
`;
export const CommentPaper = styled(Paper)`
  height: 440px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: scroll;
`;

export const Filter = styled.div`
  display: flex;
  gap: 1rem;
`;
export const FilterBtn = styled.span<{ kind: string }>`
  color: ${({ kind }) =>
    // eslint-disable-next-line no-nested-ternary
    kind === 'positive'
      ? PALETTE.BLUE400
      : kind === 'negative'
      ? PALETTE.RED400
      : PALETTE.BRAND400};
`;
