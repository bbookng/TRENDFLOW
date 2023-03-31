import * as S from './index.styles';

export interface ImgPropsInterface {
  alt?: string;
  src?: string;
  width?: string;
  height?: string;
}

/**
 * @param {string} alt
 * @param {string} src
 * @param {string} width (단위 포함)
 * @param {string} height (단위 포함)
 */
const Img = ({
  alt = 'default Img',
  src = 'https://guwahatiplus.com/public/web/images/default-news.png',
  ...props
}: ImgPropsInterface) => {
  return <S.Img alt={alt} src={src} {...props} />;
};

export default Img;
