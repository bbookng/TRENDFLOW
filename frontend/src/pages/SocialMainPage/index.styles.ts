import styled from '@emotion/styled';
import { BoxInterface } from '@/pages/SocialMainPage';
import { Button } from '@/components/atoms/Button/index.styles';
import { PALETTE } from '@/constants/palette';
import { MEDIA_QUERY } from '@/constants/media';

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 4rem;
  max-width: 1082px;

  @media ${MEDIA_QUERY.DESKTOP} {
    margin-top: 163px;
  }
`;
export const Left = styled.div`
  display: none;
  @media ${MEDIA_QUERY.DESKTOP} {
    display: flex;
    width: 33%;
    height: 400px;
    border-radius: 10px;
  }
`;
export const Right = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 67%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 53px;
  }
`;

export const Wrapper = styled.div`
  margin: 1rem 0;
  align-items: center;
  text-align: left;
`;

export const Box = styled.div<BoxInterface>`
  margin: ${({ marginTopBottom }) => marginTopBottom}rem 0;
`;

export const Keyword = styled(Button)`
  border-radius: 12px;
  margin: 5px;
  padding: 0.375rem 0.7rem;
  font-weight: 600;
`;
