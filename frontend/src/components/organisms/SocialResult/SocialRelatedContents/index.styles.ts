import styled from '@emotion/styled';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { MEDIA_QUERY } from '@/constants/media';
import { PALETTE } from '@/constants/palette';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/styles';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 3rem;
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

export const RelatedPaper = styled(Paper)`
  height: 440px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  @media ${MEDIA_QUERY.DESKTOP} {
    width: 500px;
    height: 400px;
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

export const FilterBtn = styled.button<{ isClick: boolean; kind: string }>``;
