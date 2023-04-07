import * as S from './index.styles';

export interface IFrameProps {
  videoLink?: string;
}

const IFrame = ({ videoLink }: IFrameProps): React.ReactElement => {
  return (
    <S.Wrapper>
      <S.Video src={videoLink}></S.Video>
    </S.Wrapper>
  );
};

export default IFrame;
