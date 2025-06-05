import { keyframes, css } from 'styled-components';

export const slideInRightSettings = keyframes`
  0% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
  }
  100% {
    -webkit-transform: translateX(-84px);
            transform: translateX(-84px);
  }
`;

export const slideInRightSettingsAnimation = css`
  ${slideInRightSettings} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const slideInBottomSettingsMobile = keyframes`
  0% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
  }
  100% {
    -webkit-transform: translateY(-64px);
            transform: translateY(-64px);
  }
`;

export const slideInBottomSettingsMobileAnimation = css`
  ${slideInBottomSettingsMobile} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const slideOutRightSettings = keyframes`
  0% {
    -webkit-transform: translateX(-84px);
            transform: translateX(-84px);
  }
  100% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
  }
`;

export const slideOutRightSettingsAnimation = css`
  ${slideOutRightSettings} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const slideOutBottomSettingsMobile = keyframes`
  0% {
    -webkit-transform: translateY(-64px);
            transform: translateY(-64px);
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
  }
`;

export const slideOutBottomSettingsMobileAnimation = css`
  ${slideOutBottomSettingsMobile} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const notchSlideLeft = keyframes`
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(-84px);
            transform: translateX(-84px);
  }
`;

export const notchSlideLeftAnimation = css`
  ${notchSlideLeft} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const notchSlideUpMobile = keyframes`
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-64px);
            transform: translateY(-64px);
  }
`;

export const notchSlideUpMobileAnimation = css`
  ${notchSlideUpMobile} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;

export const notchSlideRight = keyframes`
  0% {
    -webkit-transform: translateX(-84px);
            transform: translateX(-84px);
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

export const notchSlideDownMobile = keyframes`
  0% {
    -webkit-transform: translateY(-64px);
            transform: translateY(-64px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(0px);
            transform: translateY(0px);
    opacity: 1;
  }
`;

export const notchSlideDownMobileAnimation = css`
  ${notchSlideDownMobile} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
`;