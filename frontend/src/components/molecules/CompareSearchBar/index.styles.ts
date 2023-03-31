import styled from '@emotion/styled';
import { Button } from '@/components/atoms';
import { Input } from '@/components/atoms/Input/index.styles';
import { MEDIA_QUERY, MOBILE_MIN_WIDTH, MOBILE_MAX_WIDTH } from '@/constants/media';
import { BORDER_RADIUS, BOX_SHADOW } from '@/constants/styles';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;

  width: 100%;
  min-width: ${MOBILE_MIN_WIDTH}px;
  max-width: ${MOBILE_MAX_WIDTH}px;

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: row;
    width: 600px;
    max-width: 600px;
  }
`;

export const FormInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > input:first-of-type {
    margin-right: 2%;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 520px;
    margin-right: 0;
  }
`;

export const FormInput = styled(Input)`
  width: 100%;
  height: 48px;
  padding: 0 2.6rem;

  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.contentBackground};
  border-radius: ${BORDER_RADIUS.XL};
  box-shadow: ${BOX_SHADOW.BLACK_SM};

  @media ${MEDIA_QUERY.DESKTOP} {
    margin-right: 0;
  }
`;

export const FormBtn = styled(Button)`
  width: 100%;
  height: 40px;
  margin-top: 0.75rem;

  @media ${MEDIA_QUERY.DESKTOP} {
    height: auto;
    margin-top: 0;
  }
`;
