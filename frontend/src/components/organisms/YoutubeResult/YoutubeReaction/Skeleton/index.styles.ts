import styled from '@emotion/styled';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { MEDIA_QUERY } from '@/constants/media';
import { Skeleton } from '@/components/atoms/Skeleton/index.styles';
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@/constants/styles';

export const Wrapper = styled.div`
  width: 100%;
  @media ${MEDIA_QUERY.DESKTOP} {
    min-width: 500px;
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
export const ReactionPaper = styled(Paper)`
  width: 100%;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  @media ${MEDIA_QUERY.DESKTOP} {
    flex: 1;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

export const ReactionWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReactionItem = styled.div`
  flex-basis: 33.3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.headerBorder};
  &:last-child {
    border: none;
  }
`;

export const SvgIcon = styled(Skeleton)`
  width: 96px;
  height: 96px;
  border-radius: ${BORDER_RADIUS.ROUND};
`;

export const Description = styled(Skeleton)`
  width: 96px;
  height: 1rem;
  margin: 2rem 0 0.875rem 0;
`;

export const Count = styled(Skeleton)`
  width: 96px;
  height: 1rem;
`;
