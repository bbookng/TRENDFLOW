import styled from '@emotion/styled';
import { Skeleton } from '@/components/atoms/Skeleton/index.styles';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const Thumbnail = styled(Skeleton)`
  width: 60px;
  height: 60px;
`;

export const TextContainer = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.text};
`;

export const Title = styled(Skeleton)`
  width: 100%;
  height: 20px;
`;

export const Desc = styled(Skeleton)`
  margin-top: 0.4rem;
  width: 100%;
  height: 32px;
`;

export const Date = styled.div`
  width: 100%;
  height: 16px;
  margin-top: 0.625rem;
  display: flex;
  justify-content: flex-end;
`;

export const DateInner = styled(Skeleton)`
  width: 91.06px;
  height: 100%;
`;
