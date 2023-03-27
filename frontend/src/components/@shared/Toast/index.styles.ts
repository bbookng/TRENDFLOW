import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: fixed;
  padding: 0.625rem 1rem;
  min-width: 5rem;
  top: 4rem;
  left: 50%;
  translate: -50%;
  z-index: 1100;
  pointer-events: all;

  text-align: center;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.contentBackground};
  border-radius: 0.5rem;
  animation: slideDown 3000ms forwards, fadeOut 3000ms ease-out;

  @keyframes slideDown {
    0%,
    100% {
      -webkit-transform: translateY(-100px);
    }
    10%,
    90% {
      -webkit-transform: translateY(0px);
    }
  }
  @keyframes fadeOut {
    88% {
      opacity: 1;
    }
    95% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.1;
    }
  }
`;
