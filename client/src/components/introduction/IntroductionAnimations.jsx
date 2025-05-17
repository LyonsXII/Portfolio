import { keyframes, css } from 'styled-components';

const slideInBottomIntro = keyframes`
  0% {
    transform: translateY(250px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const slideInBottomIntroAnimation = css`
  ${slideInBottomIntro} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

const slideInBottomIntroMobile = keyframes`
  0% {
    transform: translateY(125px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const slideInBottomIntroAnimationMobile = css`
  ${slideInBottomIntroMobile} 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

const slideOutBottomIntro = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(125px);
    opacity: 0;
  }
`;

export const slideOutBottomIntroAnimation = css`
  ${slideOutBottomIntro} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

const slideOutBottomIntroMobile = keyframes`
  0% {
    transform: translateX(0px);
    opacity: 0;
  }
  100% {
    transform: translateX(400px);
    opacity: 1;
  }
`;

export const slideOutBottomIntroAnimationMobile = css`
  ${slideOutBottomIntroMobile} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

const slideInLeftMobile = keyframes`
  0% {
    transform: translateX(-400px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const slideInLeftMobileAnimation = css`
  ${slideInLeftMobile} 1s ease both;
`;

const slideOutRightMobile = keyframes`
  0% {
    transform: translateX(0px);
    opacity: 0;
  }
  100% {
    transform: translateX(400px);
    opacity: 1;
  }
`;

export const slideOutRightMobileAnimation = css`
  ${slideOutRightMobile} 1s ease both;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const fadeInAnimation = css`
  ${fadeIn} 1s ease both;
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

export const fadeOutAnimation = css`
  ${fadeOut} 1s ease both;
`;