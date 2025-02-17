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

export const slideInTop = keyframes`
  0% {
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideInTopAnimation = css`
  ${slideInTop} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

export const slideOutBottom = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 0;
  }
  100% {
    transform: translateY(1500px);
    opacity: 1;
  }
`;

export const slideOutBottomAnimation = css`
  ${slideOutBottom} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

export const slideOutUp = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px);
    opacity: 0;
  }
`;

export const slideOutUpAnimation = css`
  ${slideOutUp} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const slideOutRight = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px);
    opacity: 0;
  }
`;

export const slideOutRightAnimation = css`
  ${slideOutRight} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const slideInRightSettings = keyframes`
  0% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-80px);
            transform: translateX(-80px);
    opacity: 1;
  }
`;

export const slideInRightSettingsAnimation = css`
  ${slideInRightSettings} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const slideOutRightSettings = keyframes`
  0% {
    -webkit-transform: translateX(-80px);
            transform: translateX(-80px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
    opacity: 1;
  }
`;

export const slideOutRightSettingsAnimation = css`
  ${slideOutRightSettings} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const notchSlideLeft = keyframes`
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-80px);
            transform: translateX(-80px);
    opacity: 1;
  }
`;

export const notchSlideLeftAnimation = css`
  ${notchSlideLeft} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const notchSlideRight = keyframes`
  0% {
    -webkit-transform: translateX(-80px);
            transform: translateX(-80px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
    opacity: 1;
  }
`;

export const notchSlideRightAnimation = css`
  ${notchSlideRight} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;


export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeInAnimation = css`
  ${fadeIn} 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
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

export const bounceDown = keyframes`
0% {
    transform: translateY(-500px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateY(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateY(-65px);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateY(-28px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(-8px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
`;

export const bounceDownAnimation = css`
  ${bounceDown} 1.2s ease-out both;
`;

export const swingIn = keyframes`
  0% {
    transform: translateY(-1200px) rotateX(-30deg) scale(0);
    transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    transform: translateY(0) rotateX(0) scale(1);
    transform-origin: 50% 1400px;
    opacity: 1;
  }
`;

export const swingInAnimation = css`
  ${swingIn} 1.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

export const nudgeUpSubTitle = keyframes`
  0% {
    transform: translateY(28px);
    opacity: 1;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const nudgeUpSubTitleAnimation = css`
  ${nudgeUpSubTitle} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

export const nudgeDownBodyText = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(82px);
    opacity: 1;
  }
`;

export const nudgeDownBodyTextAnimation = css`
  ${nudgeDownBodyText} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

export const nudgeUpBodyText = keyframes`
  0% {
    transform: translateY(56px);
    opacity: 1;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const nudgeUpBodyTextAnimation = css`
  ${nudgeUpBodyText} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

export const slideInBottom = keyframes`
  0% {
    transform: translateY(500px);
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

export const slideInBottomIntro = keyframes`
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

export const slideOutBottomIntro = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 0;
  }
  100% {
    transform: translateY(500px);
    opacity: 1;
  }
`;

export const slideOutBottomIntroAnimation = css`
  ${slideOutBottomIntro} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;