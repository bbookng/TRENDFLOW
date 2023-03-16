import * as S from './index.styles';

export interface ImgPropsInterface {
  alt?: string;
  src?: string;
  width: string;
  height: string;
}

const Img = ({
  alt = 'default Img',
  src = 'https://guwahatiplus.com/public/web/images/default-news.png',
  ...props
}: ImgPropsInterface) => {
  return <S.Img alt={alt} src={src} {...props} />;
};

export default Img;
