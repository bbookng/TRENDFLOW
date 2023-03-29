import styled from '@emotion/styled';
import Input from '@/components/atoms/Input';
import { MEDIA_QUERY, MOBILE_MIN_WIDTH } from '@/constants/media';
import { BORDER_RADIUS, BOX_SHADOW } from '@/constants/styles';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  min-width: ${MOBILE_MIN_WIDTH}px;
`;

export const Form = styled.form`
  width: 100%;
  height: 48px;
  padding: 0 2.6rem;
  background-color: ${({ theme }) => theme.contentBackground};
  border-radius: ${BORDER_RADIUS.XL};
  box-shadow: ${BOX_SHADOW.BLACK_SM};
  display: flex;
  align-items: center;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 600px;
  }
`;

export const FormInput = styled(Input)`
  font-size: 1.2rem;
  border: none;
  height: 100%;
  flex: 1;
`;

export const FormBtn = styled.button``;
