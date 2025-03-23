import { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeInAnimation = css`
  ${fadeIn} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const fadeOutAnimation = css`
  ${fadeOut} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
`;

const slideInBottom = keyframes`
  0% {
    transform: translateY(250px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const slideInBottomAnimation = css`
  ${slideInBottom} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

const slideOutBottom = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(250px);
    opacity: 0;
  }
`;

export const slideOutBottomAnimation = css`
  ${slideOutBottom} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;