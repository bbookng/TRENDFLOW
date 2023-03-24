import * as S from './index.styles';
import { PALETTE } from '@/constants/palette';
import { Typography } from '@/components/atoms';
import { PlusCircle } from '@/assets';

const NoBookmark = () => {
  return (
    <S.NoBookmarkPaper>
      <PlusCircle width="1.75rem" height="1.75rem" />

      <S.TextWrapper>
        <Typography variant="BASE" color={PALETTE.BRAND400}>
          매일 보고 싶은 키워드를
        </Typography>
        <Typography variant="BASE" color={PALETTE.BRAND400}>
          등록해보세요.
        </Typography>
      </S.TextWrapper>
    </S.NoBookmarkPaper>
  );
};

export default NoBookmark;
