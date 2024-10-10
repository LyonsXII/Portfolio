import { keyframes, css } from 'styled-components';

export const slideInLeft = keyframes`
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideInLeftAnimation = css`
  ${slideInLeft} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

export const slideOutUp = keyframes`
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
`;

export const slideOutUpAnimation = css`
  ${slideOutUp} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const slideOutRight = keyframes`
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
`;

export const slideOutRightAnimation = css`
  ${slideOutRight} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;