import * as S from './index.styles';

interface ButtonSkeletonPropsInterface {
  children?: React.ReactNode;
  size: 'SMALL' | 'LARGE';
}

const ButtonSkeleton = ({ children, size }: ButtonSkeletonPropsInterface) => {
  return <S.ButtonSkeleton size={size}>{children}</S.ButtonSkeleton>;
};

export default ButtonSkeleton;
