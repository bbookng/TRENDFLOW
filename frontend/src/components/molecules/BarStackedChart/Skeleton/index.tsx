import * as S from './index.styles';

interface Props {
  desktopWidth?: string;
}

const ChartSkeleton = ({ desktopWidth }: Props): React.ReactElement => {
  return (
    <S.Wrapper desktopWidth={desktopWidth}>
      <S.BarPaper>
        <S.Bar></S.Bar>
      </S.BarPaper>
    </S.Wrapper>
  );
};

export default ChartSkeleton;
