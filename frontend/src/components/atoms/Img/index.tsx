import * as S from './index.styles';

export interface ImgPropsInterface {
  width?: string;
  height?: string;
}

const Img = ({ width, height }: ImgPropsInterface) => {
  return <S.Img width={width} height={height} />;
};

Img.defaultProps = {
  width: '120px',
  height: '75px',
};

export default Img;
