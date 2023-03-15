import * as S from './index.styles';

export interface ImgPropsInterface {
  width?: string;
  height?: string;
}

const Img = ({ width = '120px', height = '75px' }: ImgPropsInterface) => {
  return <S.Img width={width} height={height} />;
};

export default Img;
