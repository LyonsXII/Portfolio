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