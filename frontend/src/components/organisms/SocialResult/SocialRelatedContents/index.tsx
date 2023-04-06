import { useEffect, useState } from 'react';
import { SocialContentInterface } from '@/types/social';
import * as S from './index.styles';
import { getContents } from '@/apis/analyze';
import { CONTENT_CODE } from '@/constants/code';
import { ContentItem } from '@/components/molecules';

export interface SocialRelatedContentsInterface {
  keyword: string;
  startDate: string;
  endDate: string;
}

const SocialRelatedContents = ({
  keyword,
  startDate,
  endDate,
}: SocialRelatedContentsInterface): React.ReactElement => {
  const [page, setPage] = useState<number>(1);
  const [code, setCode] = useState<string>(CONTENT_CODE.ARTICLE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contentList, setContentList] = useState<Array<SocialContentInterface>>([]);

  const getData = async () => {
    setIsLoading(true);
    if (page === 1) {
      setContentList([]);
    }
    const { data } = await getContents(keyword, code, page, 10, startDate, endDate);
    setContentList((prev) => prev.concat(data));
    setIsLoading(false);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const handleClickFilter = (kind: string) => {
    if (code === kind) return;
    setContentList([]);
    setCode(kind);
    setPage(1);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, code]);

  useEffect(() => {
    setPage(1);
    setCode(CONTENT_CODE.ARTICLE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <S.Wrapper>
      <S.Title>관련 컨텐츠</S.Title>
      <S.RelatedPaper>
        <S.Filter>
          <S.FilterBtn
            isClick={code === 'OR100'}
            onClick={() => handleClickFilter('OR100')}
            kind="OR100"
          >
            뉴스
          </S.FilterBtn>
          <S.FilterBtn
            isClick={code === 'OR200'}
            onClick={() => handleClickFilter('OR200')}
            kind="OR200"
          >
            블로그
          </S.FilterBtn>
          <S.FilterBtn
            isClick={code === 'OR200'}
            onClick={() => handleClickFilter('OR300')}
            kind="OR300"
          >
            유튜브
          </S.FilterBtn>
        </S.Filter>
        {contentList?.map((content, index) => {
          return (
            <ContentItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              isLast={index === contentList.length - 1}
              nextPage={nextPage}
              content={content}
            />
          );
        })}
      </S.RelatedPaper>
    </S.Wrapper>
  );
};

export default SocialRelatedContents;
