/* eslint-disable no-else-return */
import { useEffect, useRef } from 'react';
import { Daum, NaverBlog, NaverNews, Youtube2 } from '@/assets';
import Svg from '@/components/atoms/Svg';
import { CONTENT_CODE } from '@/constants/code';
import { SocialContentInterface } from '@/types/social';
import * as S from './index.styles';

export interface ContentItemProps {
  content: SocialContentInterface;
  isLast: boolean;
  nextPage: () => void;
}

const ContentItem = ({ content, isLast, nextPage }: ContentItemProps): React.ReactElement => {
  const { id, social, title, code, desc, date, link, thumbnail } = content;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef?.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isLast && entry.isIntersecting) {
          nextPage();
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '100px',
      }
    );
    observer.observe(contentRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef, isLast]);

  const handleClickContent = () => {
    window.open(link, '_blank', 'noopener, noreferrer');
  };

  const getDefaultThumbnail = (kind: string) => {
    if (kind === 'NAVER') {
      if (code === CONTENT_CODE.ARTICLE) {
        return (
          <Svg size={60}>
            <NaverNews />
          </Svg>
        );
      }
      return (
        <Svg size={60}>
          <NaverBlog />
        </Svg>
      );
    } else if (kind === 'DAUM') {
      return (
        <Svg size={60}>
          <Daum />
        </Svg>
      );
    } else {
      return (
        <Svg size={60}>
          <Youtube2 />
        </Svg>
      );
    }
  };

  return (
    <S.Wrapper ref={contentRef} onClick={handleClickContent}>
      <S.Container>
        {thumbnail ? <S.Thumbnail src={thumbnail as string} /> : getDefaultThumbnail(social)}
        <S.TextContainer>
          <S.Title>{title}</S.Title>
          <S.Desc>{desc}</S.Desc>
        </S.TextContainer>
      </S.Container>
      <S.Date>{date}</S.Date>
    </S.Wrapper>
  );
};

export default ContentItem;
