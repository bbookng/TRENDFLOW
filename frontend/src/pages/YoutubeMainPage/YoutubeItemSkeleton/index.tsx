import * as S from './index.styles';

export interface YoutubeItemSkeletonProps {
  mSize: number;
  dSize: number;
}

const YoutubeItemSkeleton = ({ mSize, dSize }: YoutubeItemSkeletonProps): React.ReactElement => {
  return (
    <S.YoutubeItem>
      <S.Thumbnail mSize={mSize} dSize={dSize} />
      <S.Title></S.Title>
    </S.YoutubeItem>
  );
};

export default YoutubeItemSkeleton;
