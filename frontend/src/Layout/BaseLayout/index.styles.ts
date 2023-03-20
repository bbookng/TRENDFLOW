import styled from '@emotion/styled';
import { MEDIA_QUERY } from '@/constants/media';
import { PALETTE } from '@/constants/palette';

export const Layout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${PALETTE.BRAND100};

  @media ${MEDIA_QUERY.DESKTOP} {
    display: grid;
    grid-template-columns: 240px 1fr;

    & > div:nth-of-type(1) {
      grid-column: 1;
    }
  }
`;

export const Main = styled.main`
  position: relative;
  width: 100%;
  top: 56px;
  flex: 1;
  margin-bottom: 112px;

  @media ${MEDIA_QUERY.DESKTOP} {
    grid-column: 2;
    padding: 0 3.5rem;
  }
`;

export const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 2rem 2rem 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${MEDIA_QUERY.DESKTOP} {
    padding: 0;
  }
`;
