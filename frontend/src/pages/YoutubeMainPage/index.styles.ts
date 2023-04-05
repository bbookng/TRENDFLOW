import styled from '@emotion/styled';
import { MEDIA_QUERY, MOBILE_MAX_WIDTH } from '@/constants/media';
import { BoxInterface } from '@/pages/SocialMainPage';
import { Button } from '@/components/atoms/Button/index.styles';

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: auto;
    margin-top: 2rem;
  }
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 5rem;
  max-width: 1082px;

  @media ${MEDIA_QUERY.DESKTOP} {
    margin-top: 8%;
  }
`;
export const Left = styled.div`
  display: none;
  @media ${MEDIA_QUERY.DESKTOP} {
    display: flex;
    width: 33%;
    height: 300px;
    border-radius: 10px;
  }
`;
export const Right = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > hr {
    margin: 3rem 0;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 67%;
    padding-left: 53px;

    & > hr {
      margin: 1rem 0 1.5rem;
    }
  }
`;

export const Wrapper = styled.div`
  margin: 1rem 0;
  align-items: center;
  text-align: left;
`;

export const TypoBox = styled.div<BoxInterface>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  & > h4:first-of-type {
    margin-bottom: 0.2rem;
  }

  & > p:first-of-type {
    margin-bottom: 0.15rem;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;

    & > h4:first-of-type {
      margin-bottom: 0;
      margin-right: 0.375rem;
    }

    & > p:first-of-type {
      margin-bottom: 0;
      margin-right: 0.25rem;
    }
  }
`;

export const KeywordBox = styled.div<BoxInterface>`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;

  @media ${MEDIA_QUERY.DESKTOP} {
    justify-content: flex-start;
    flex-wrap: auto;
    margin-top: 1.5rem;
  }
`;

export const Keyword = styled(Button)`
  border-radius: 12px;
  margin: 5px;
  padding: 0.375rem 0.7rem;
  font-weight: 600;
`;

export const FlexBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2rem;
  @media ${MEDIA_QUERY.DESKTOP} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: 1082px;
  }
`;

export const YoutubeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  & > div > svg {
    width: 50px;
    height: 50px;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    transition: transform 200ms;
    & > div > svg {
      width: 60px;
      height: 60px;
    }
    :hover {
      transform: translateY(5px);
    }
  }
`;

export const Thumbnail = styled.img``;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Title = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;

  @media ${MEDIA_QUERY.DESKTOP} {
    font-size: 1.3rem;
  }
`;
