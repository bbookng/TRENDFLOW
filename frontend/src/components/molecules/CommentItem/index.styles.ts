import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { TextBtn } from '@/components/atoms/TextBtn/index.styles';

interface CommentTextProps {
  isShow: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  color: ${({ theme }) => theme.text200};
`;

export const Comment = styled.div`
  flex: 1;
`;

export const CommentTextBox = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const more = css`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export const CommentText = styled.p<CommentTextProps>`
  width: 100%;
  line-height: 1.25rem;
  ${(props) => !props.isShow && more}
`;

export const MoreBtn = styled(TextBtn)`
  font-size: 0.8rem;
  margin-top: 0.3rem;
`;

export const Thumbs = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ThumbItem = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  & > svg {
    width: 16px;
    height: 16px;
  }
  & > svg > g {
    stroke: ${({ theme }) => theme.text};
  }
`;
