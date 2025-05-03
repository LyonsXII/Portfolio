import { keyframes, css } from 'styled-components';

export const flicker = (textColour ) => keyframes`
  0%, 5% {
    transform: translate(-0.2rem, 1rem) rotate(10deg);
    color: ${textColour};
    text-shadow: 
      3px 3px 6px #000,
      -3px -3px 6px #000,  
      3px -3px 6px #000,
      -3px 3px 6px #000,
      3px 3px 6px #000,
      0 0 2rem rgb(255, 255, 255);
  }
  5.5%, 7% {
    transform: translate(-0.2rem, 1rem) rotate(10deg);
  }
  6%, 6.5%, 8%, 50%, 100% {
    transform: translate(-0.2rem, 1rem) rotate(10deg);
  }
  50% {
    transform: translate(-0.2rem, 1rem) rotate(13deg);
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeInFastAnimation = css`
  ${fadeIn} 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
`;

export const fadeInDelayed = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeInSlowAnimation = css`
  ${fadeInDelayed} 2.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const fadeOutAnimation = css`
  ${fadeOut} 1.2s ease-out both;
`;

export const slideOutLeft = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px);
    opacity: 0;
  }
`;

export const slideOutLeftAnimation = css`
  ${slideOutLeft} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const slideOutRight = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(200px);
    opacity: 0;
  }
`;

export const slideOutRightAnimation = css`
  ${slideOutRight} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const expandScoreBar = keyframes`
  0% {
    transform: translateX(-3vw);
  }
  100% {
    transform: translateX(0);
  }
`;

export const expandScoreBarAnimation = css`
  ${expandScoreBar} 1s ease-out both;
`;