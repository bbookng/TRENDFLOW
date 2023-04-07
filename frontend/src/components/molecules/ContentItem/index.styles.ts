import styled from '@emotion/styled';
import { FONT_WEIGHT } from '@/constants/styles';

export const Wrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
`;

export const TextContainer = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.text};
`;

export const Title = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
  line-height: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export const Desc = styled.div`
  margin-top: 0.4rem;
  width: 100%;
  font-size: 0.85rem;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export const Date = styled.div`
  margin-top: 0.625rem;
  display: flex;
  justify-content: flex-end;
  color: ${({ theme }) => theme.text200};
`;
