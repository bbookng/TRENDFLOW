import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { Paper } from '@/components/atoms/Paper/index.styles';
import { PALETTE } from '@/constants/palette';
import { MEDIA_QUERY } from '@/constants/media';

export const Wrapper = styled.div`
  margin-top: 2.875rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${MEDIA_QUERY.DESKTOP} {
    width: 30%;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Link = styled(NavLink)`
  color: ${PALETTE.BRAND400};
  font-size: 1.25rem;
`;

export const PostWrapper = styled(Paper)`
  margin-top: 1.1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div:last-of-type {
    display: none;
  }

  @media ${MEDIA_QUERY.DESKTOP} {
    flex-direction: column;
    justify-content: space-between;
    & > div:last-of-type {
      display: flex;
    }
  }
`;
