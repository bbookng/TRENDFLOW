import { CircleChart } from '@/components/molecules';
import { POSITIVE_CHART_PALLETE } from '@/constants/palette';
import * as S from './index.styles';

export interface AffinityProps {
  positive: number | undefined;
  negative: number | undefined;
  neutral: number | undefined;
}

function convertPercentage(value: number, total: number) {
  return Number((value / total).toFixed(2)) * 100;
}

const CommentAffinity = ({ positive, negative, neutral }: AffinityProps): React.ReactElement => {
  return (
    <S.Wrapper>
      <S.Title>댓글 선호도 분석</S.Title>
      <S.AffinityPaper>
        <S.BarChart>
          <S.BarItem
            kind="positive"
            value={convertPercentage(
              positive as number,
              (positive as number) + (negative as number) + (neutral as number)
            )}
          ></S.BarItem>
          <S.BarItem
            kind="negative"
            value={convertPercentage(
              negative as number,
              (positive as number) + (negative as number) + (neutral as number)
            )}
          ></S.BarItem>
          <S.BarItem
            kind="neutral"
            value={convertPercentage(
              neutral as number,
              (positive as number) + (negative as number) + (neutral as number)
            )}
          ></S.BarItem>
        </S.BarChart>
        <S.ChartLabels>
          <S.ChartLabel kind="positive">
            <S.Circle kind="positive"></S.Circle>
            <S.Span>
              긍정{' '}
              {convertPercentage(
                positive as number,
                (positive as number) + (negative as number) + (neutral as number)
              )}
              %
            </S.Span>
          </S.ChartLabel>
          <S.ChartLabel kind="negative">
            <S.Circle kind="negative"></S.Circle>
            <S.Span>
              부정{' '}
              {convertPercentage(
                negative as number,
                (positive as number) + (negative as number) + (neutral as number)
              )}
              %
            </S.Span>
          </S.ChartLabel>
          <S.ChartLabel kind="neutral">
            <S.Circle kind="neutral"></S.Circle>
            <S.Span>
              중립{' '}
              {convertPercentage(
                neutral as number,
                (positive as number) + (negative as number) + (neutral as number)
              )}
              %
            </S.Span>
          </S.ChartLabel>
        </S.ChartLabels>
      </S.AffinityPaper>
    </S.Wrapper>
  );
};

export default CommentAffinity;
