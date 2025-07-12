import { styled, css } from "styled-components";

import { media } from '../../context/media';

import { slideInTopAnimation, slideOutBottomAnimation, bounceDownAnimation, swingInAnimation, nudgeUpSubTitleAnimation, nudgeUpBodyTextAnimation, nudgeDownBodyTextAnimation } from '../../context/Animations';

import { slideInBottomIntroAnimation, slideInBottomIntroAnimationMobile, slideOutBottomIntroAnimation, slideOutBottomIntroAnimationMobile, slideInLeftMobileAnimation, slideOutRightMobileAnimation, fadeInAnimation, fadeOutAnimation } from './IntroductionAnimations';

import NextIcon from "../../icons/nextSong.svg?react";
import DownloadIcon from "../../icons/download.svg?react";

export const StyledContentContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;

  ${media.mobile`
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  `}

  ${media.desktop`
    align-items: flex-start;
    justify-content: flex-start;
  `}
`;

export const StyledIntroContentContainer = styled.div`
  display: flex;
  flex-direction: ${({ $flexDirection }) => $flexDirection || "column"};
  align-items: flex-start;
  height: 100%;
  padding: 0px 30px 0px 25px;
  gap: ${({ $gap }) => $gap || "20px"};
  box-sizing: border-box;
  border: 1px solid red;

  overflow-y: auto;
  overflow-x: hidden;

  scroll-behavior: smooth;
  direction: ltr;
  scrollbar-color: ${({ theme }) => `${theme.primaryColor} ${theme.secondaryColor}`};
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    margin-right: 200px;
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 6px solid rgba(0, 0, 0, 0.18);
    border-left: 0;
    border-right: 0;
    background-color: #8070d4;
  }

  ${media.mobile`
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0px;
    width: 100%;
    padding-bottom: 10px;
    animation: ${({ $tempCurrent, $id }) => $tempCurrent !== $id ? fadeOutAnimation : fadeInAnimation};
  `}

  ${media.desktop`
    width: 90%;
    max-height: 10000px;
  `}
`;

export const StyledIntroInitialContentContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  opacity: ${({ $expandIntroText }) => $expandIntroText ? 1 : 0};

  ${media.mobile`
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    max-height: ${({ $expandIntroText }) => $expandIntroText ? "100%" : "0%"};
    opacity: ${({ $tempCurrent, $id }) => $tempCurrent !== $id ? 0 : 1};
    transition: max-height 1.4s ease, opacity 0.5s ease;

    animation: ${({ $tempCurrent, $id }) => $tempCurrent !== $id ? fadeOutAnimation : fadeInAnimation};
  `}

  ${media.desktop`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    max-height: ${({ $expandIntroText, $initialSection }) => 
      $expandIntroText && $initialSection === "None" ? "25%" 
      : $expandIntroText ? "50%" 
      : "0%"
    };
    margin-top: 40px;
    transition: max-height 1.4s ease, opacity 1.4s ease;
  `}
`;

export const StyledTechIcon = styled.div`
  width: 50px;
  height: 50px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

export const StyledSectionFlexbox = styled.div`
  display: flex;
  opacity: ${( { $initialSection, $sectionName }) => $initialSection == $sectionName ? "1" : "0"};
  transition: max-height 1s ease, opacity 1s ease;
  box-sizing: border-box;
  hyphens: auto;
  overflow-wrap: break-word;
  word-break: break-word;
  border: 1px solid orange;

  ${media.mobile`
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-height: ${( { $initialSection, $sectionName }) => $initialSection == $sectionName ? "1000px" : "0px"};
    min-height: 0px;
    padding: 0px 5px 0px 0px;
    // overflow: hidden;
  `}

  ${media.desktop`
    justify-content: flex-end;
    align-items: flex-start;
    max-height: ${( { $initialSection, $sectionName }) => $initialSection == $sectionName ? "1000px" : "0px"};
  `}
`

export const StyledSectionHeadingsFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  min-height: 0;

  overflow-y: scroll;
  overflow-x: hidden;

  scroll-behavior: smooth;
  direction: ltr;
  scrollbar-color: ${({ theme }) => `${theme.primaryColor} ${theme.secondaryColor}`};
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 6px solid rgba(0, 0, 0, 0.18);
    border-left: 0;
    border-right: 0;
    background-color: #8070d4;
  }

  ${media.mobile`
    height: 100px;
    align-items: flex-start;
    flex: 1 1 auto;
    margin-top: 10px;
    padding: 5px 15px 10px 15px;
  `}

  ${media.desktop`
    height: 230px;
    max-height: ${( { $initialSection, $sectionName }) => $initialSection == $sectionName ? "1000px" : "0px"};
    width: 100%;
    gap: 30px;
    padding: ${({ $paddingDesktop }) => $paddingDesktop};
    transition: max-height 1s ease;
  `}
`

export const StyledSectionRowFlexbox = styled.div`
  display: flex;
  margin-top: ${({ $marginTop }) => $marginTop || "0px"};
  margin-right: ${({ $marginRight }) => $marginRight || "20px"};
  box-sizing: border-box;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;

  ${media.mobile`
    justify-content: center;
    align-items: flex-start;
    flex: 1 1 auto;
    gap: 10px;
    min-height: 0px;
    max-height: ${({ $collapse }) => $collapse ? "0px" : "160px"};
    margin-top: ${({ $collapse }) => $collapse ? "0px" : "10px"};
    padding: ${({ $collapse }) => $collapse ? "0px 15px 0px 15px" : "5px 15px 0px 15px"};
    opacity: ${({ $collapse }) => $collapse ? "0" : "1"};
    transition: max-height 1s ease, margin-top 1s ease, padding 1s ease, opacity 1s ease;
    overflow: hidden;
  `}

  ${media.desktop`
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    width: 90%;
    padding-right: 10px;
    row-gap: 20px;
    column-gap: 40px;
  `}
`

export const StyledSectionRowTechStackFlexbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: fit-content;
  box-sizing: border-box;

  ${media.mobile`
    row-gap: 0px;
    column-gap: 10px;
    padding: 10px 10px;
    transition: max-height 1s ease, opacity 1s ease;
  `}

  ${media.desktop`
    justify-content: flex-end;
    align-items: center;
    width: 90%;
    padding: ${({ $position }) => $position == "last" ? "0px 10px 20px 0px" : "0px 10px 0px 0px"};
    row-gap: 20px;
    column-gap: 40px;
  `}
`

export const Scroll = styled.div`
  height: auto;
  box-sizing: border-box;
  background-color: grey;
  width: 100%;
`

export const StyledSectionRowTextFlexbox = styled.div`
  display: flex;
  flex-direction: column; /* Change back to row to make scroll bar work as currently does */
  justify-content: flex-start;
  gap: 20px;
  min-height: 0;
  margin-right: ${({ $marginRight }) => $marginRight || "20px"};
  box-sizing: border-box;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;

  overflow-y: auto;
  overflow-x: hidden;

  scroll-behavior: smooth;
  direction: ltr;
  scrollbar-color: ${({ theme }) => `${theme.primaryColor} ${theme.secondaryColor}`};
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 6px solid rgba(0, 0, 0, 0.18);
    border-left: 0;
    border-right: 0;
    background-color: #8070d4;
  }

  ${media.mobile`
    height: 100px;
    align-items: flex-start;
    flex: 1 1 auto;
    margin-top: 10px;
    padding: 5px 15px 10px 15px;
  `}

  ${media.desktop`
    align-items: center;
    height: 200px;
    max-height: ${( { $initialSection, $sectionName }) => $initialSection == $sectionName ? "1000px" : "0px"};
    width: 100%;
    padding: 5px 15px 5px 15px;
    transition: max-height 1s ease;
  `}
`

export const StyledInitialSectionFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  box-sizing: border-box;

  ${media.mobile`
    flex: ${({ $collapse }) => $collapse ? "1 1 auto" : "none"};
    height: 100%;
    width: 100%;
    max-height: ${({ $collapse }) => $collapse ? "none" : "0px"};
    padding: 0px 20px 0px 20px;
    // overflow: hidden;
  `}
`

export const StyledTechPairFlexbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;


  ${media.mobile`
    gap: 0px;
  `}

  ${media.desktop`
    gap: 20px;
  `}
`

export const StyledContentFlexbox = styled.div`
  display: flex;
  flex-direction: ${({ $flexDirection }) => $flexDirection || "row"};
  justify-content: flex-start;
  align-items: flex-start;
  height: fit-content;
  width: ${({ $width }) => $width || "100%"};
  gap: ${({ $gap }) => $gap || "10px"};
  box-sizing: border-box;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
`;

export const StyledContentInteriorFlexbox = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

export const StyledDownloadButtonContainer = styled.div`
  display: inline-block;
  margin-top: 20px;
`

export const StyledDownloadButtonFlexbox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 10px;
`

export const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 36%;
  gap: 40px;
  margin-right: 4vw;
`;

export const StyledIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  box-sizing: border-box;

  ${media.mobile`
    align-items: center;
    justify-content: flex-start;
    flex-grow: 1 1 auto;
    height: 100%;
    max-height: ${({ $expandIntroText }) => $expandIntroText ? "100%" : "0%"};
    width: 100%;
    transition: max-height 1s ease-in-out;
    overflow: hidden;
  `}

  ${media.desktop`
    height: 88vh;
    width: 100%;
    justify-content: ${({ $current }) => $current == 0 ? "center" : "flex-start"};
    align-items: ${({ $current }) => $current == 0 ? "flex-end" : "center"};
    margin-top: 3%;
    // padding-left: ${({ $current }) => $current == 0 ? "0px" : "5%"};

    animation: ${({ $tempCurrent, $id }) =>
      $tempCurrent !== $id ? slideOutBottomAnimation : slideInTopAnimation
    };
  `}
`;

export const StyledIntroButtonContainer = styled.div`
  display: flex;
  margin-top: ${({ $marginTop }) => $marginTop || "0px"};
  margin-right: ${({ $marginRight }) => $marginRight || "20px"};

  ${media.mobile`
    flex: 0 0 auto;
    order: -1;
    justify-content: center;
    width: 100%;
    margin-top: ${({ $marginTopMobile}) => $marginTopMobile || "0px"};
    border-bottom: 3px solid black;
  `}

  ${media.desktop`
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    height: fit-content;
    width: 90%;
    padding-right: 10px;
    row-gap: 20px;
    column-gap: 40px;
    margin-bottom: 20px;
  `}
`;

export const StyledIntroButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ $initialSection, value, theme }) => $initialSection === value ? theme.secondaryColor : theme.primaryColor};

  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(7, 3, 3, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  cursor: pointer;

  ${media.mobile`
    padding: 10px;
    border: none;
    border-left: ${({ $left }) => $left ? "3px solid black" : "none"};
    border-right: ${({ $right }) => $right ? "3px solid black" : "none"};
    flex-grow: 1;
  `}

  ${media.desktop`
    padding: 20px;
    border: 3px solid black;
    border-radius: 20px;

    &:hover {
      background-color: ${props => props.theme.secondaryColor};
      box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3),
                inset 0 2px 4px rgba(255, 255, 255, 0.3), 
                inset 0 -4px 4px rgba(0, 0, 0, 0.6);
    }
  `}
`

export const StyledGalleryContainer = styled.div`
  display: flex;
  border: 1px solid cyan;

  ${media.mobile`
    justify-content: center;
    align-items: center;
    flex: 1 1 auto; /* Change to 0 0 auto if messing up scroll box again*/
    min-height: 400px;
    width: 100%;
    padding: 20px 0px 60px 0px;
    box-sizing: border-box;
  `}

  ${media.desktop`
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    width: fit-content;
    margin-right: 130px;
    margin-left: ${({ $current }) => $current == 0 ? "3vw" : "0vw"};
  `}
`;

/* Source - Temani Afif, taken from the article "https://freefrontend.com/css-gallery/" */
export const StyledGallery = styled.div`
  ${media.mobile`
    --s: 18vh;
  `}

  ${media.desktop`
    // --s: 10vw;
    --s: min(18vw, 190px);
  `}
  
  display: grid;
  grid-template-columns: repeat(3,auto);
  gap: calc(var(--s) / 22);
  position: relative;

  animation: ${bounceDownAnimation};
`;

export const StyledInput = styled.input`
  position: absolute;
  border: 6px solid #000;
  border-radius: 50%;
  width: calc(var(--s) / 1.25);
  height: calc(var(--s) / 1.25);
  cursor: pointer;
  --g: linear-gradient(#000 0 0) no-repeat;
  background: var(--g) 50%/var(--b,0%) 8px,var(--g) 50%/8px var(--b,0%);
  transition: transform 1.2s, box-shadow 0.2s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);

  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);

  ${media.mobile`
    top: calc(50% - var(--s) / 2.5);
    left: calc(50% - var(--s) / 2.5);

    &:checked {
      transform: 
        translateX(calc(-0.85 * var(--s) - 20px))
        scale(0.5) 
        rotate(45deg);
      --b: 70%;
    }
  `}

  ${media.desktop`
    top: calc(50% - var(--s) / 2.5);
    left: 0;

    &:checked {
      transform: 
        translateX(calc(1.43 * var(--s))) 
        translateY(calc(2 * var(--s)))
        scale(0.5) 
        rotate(45deg);
      --b: 70%;
    }
  `}

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  }

  &:checked ~ img {
    transform: translateX(30px);
    filter: brightness(1);
    pointer-events: initial;
  }

  &:checked {
    border: 8px solid #000;
  }
`;

export const StyledGalleryImage = styled.img`
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  aspect-ratio: 1;
  object-fit: cover;
  filter: brightness(0);
  pointer-events: none;
  transform-origin: var(--x) var(--y);
  transition: 1s calc((var(--i) - 1)*.02s);

  &:hover {
    transition: 0.2s;
    box-shadow: 0 0px 10px rgba(255, 255, 255, 1);
  }

  ${media.mobile`
    border: 3px solid black;
    width: calc(var(--s) * 0.5);
    transform: scale(0.2);

    &:nth-of-type(1) {
      border-radius: 40px 0px 0px 0px;
      --i: 1;
      --x: 150%;
      --y: 150%;
    }

    &:nth-of-type(2) {
      --i: 2;
      --x: 50%;
      --y: 150%;
    }

    &:nth-of-type(3) {
      border-radius: 0px 40px 0px 0px;
      --i: 3;
      --x: -50%;
      --y: 150%;
    }

    &:nth-of-type(4) {
      --i: 4;
      --x: 150%;
      --y: 50%;
    }

    &:nth-of-type(5) {
      --i: 5;
      --x: 50%;
      --y: 50%;
    }

    &:nth-of-type(6) {
      --i: 6;
      --x: -50%;
      --y: 50%;
    }

    &:nth-of-type(7) {
      border-radius: 0px 0px 0px 40px;
      --i: 7;
      --x: 150%;
      --y: -50%;
    }

    &:nth-of-type(8) {
      --i: 8;
      --x: 50%;
      --y: -50%;
    }

    &:nth-of-type(9) {
      border-radius: 0px 0px 40px 0px;
      --i: 9;
      --x: -50%;
      --y: -50%;
    }
  `}

  ${media.desktop`
    border: 6px solid black;
    width: var(--s);
    --scale: clamp(0.1, 0.01 + 0.5 * ((100vw - 1080px) / 840), 0.2);
    transform: scale(0.1);

    &:nth-of-type(1) {
      border-radius: 40px 0px 0px 0px;
      --i: 1;
      --x: 20%;
      --y: 150%;
    }

    &:nth-of-type(2) {
      --i: 2;
      --x: -80%;
      --y: 150%;
    }

    &:nth-of-type(3) {
      border-radius: 0px 40px 0px 0px;
      --i: 3;
      --x: -180%;
      --y: 150%;
    }

    &:nth-of-type(4) {
      --i: 4;
      --x: 20%;
      --y: 50%;
    }

    &:nth-of-type(5) {
      --i: 5;
      --x: -80%;
      --y: 50%;
    }

    &:nth-of-type(6) {
      --i: 6;
      --x: -180%;
      --y: 50%;
    }

    &:nth-of-type(7) {
      border-radius: 0px 0px 0px 40px;
      --i: 7;
      --x: 20%;
      --y: -50%;
    }

    &:nth-of-type(8) {
      --i: 8;
      --x: -80%;
      --y: -50%;
    }

    &:nth-of-type(9) {
      border-radius: 0px 0px 40px 0px;
      --i: 9;
      --x: -180%;
      --y: -50%;
    }
    `}
`;

export const StyledRowContainer = styled.div`
  height: fit-content;
  width: ${({ $width }) => $width || "100%"};
  gap: ${({ $gap }) => $gap || "10px"};
  box-sizing: border-box;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
`

export const StyledFloatContainer = styled.div`
  float: ${({ $float }) => $float || "left"};
  height: fit-content;
  width: ${({ $width }) => $width || "100%"};
  box-sizing: border-box;

  ${media.mobile`
    margin-top: 0px;
    margin-left: ${({ $float }) => $float === "right" ? "20px" : "0px"};
    margin-bottom: 0px;
    margin-right: ${({ $float }) => $float === "left" ? "20px" : "0px"};
  `}

  ${media.desktop`
    margin-top: 10px;
    margin-left: ${({ $float }) => $float === "right" ? "30px" : "0px"};
    margin-bottom: 20px;
    margin-right: ${({ $float }) => $float === "left" ? "30px" : "0px"};
  `}
`

export const StyledImageContainer = styled.div`
  float: ${({ $float }) => $float || "none"};
  height: fit-content;

  margin: ${({ $margin }) => $margin || "0px"};
  box-sizing: border-box;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.3), 
          inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  border-radius: 20px;

  ${media.mobile`
    width: ${({ $width }) => $width || "100%"};
    margin-top: 0px;
    margin-left: ${({ $float }) => $float === "right" ? "20px" : "0px"};
    margin-bottom: 10px;
    margin-right: ${({ $float }) => $float === "left" ? "20px" : "0px"};
  `}

  ${media.desktop`
    width: ${({ $width }) => $width || "100%"};
    margin-top: 10px;
    margin-left: ${({ $float }) => $float === "right" ? "30px" : "0px"};
    margin-bottom: 20px;
    margin-right: ${({ $float }) => $float === "left" ? "30px" : "0px"};
  `}
`

export const StyledImageWrapper = styled.div`
  position: relative;

  box-sizing: border-box;
  overflow: hidden;

  ${media.mobile`
    border: 4px solid black;
    border-radius: 20px;
  `}

  ${media.desktop`
    border: 6px solid black;
    border-radius: 20px 20px 0px 0px;
  `}
`

export const StyledCaptionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 0px 0px 20px 20px;
  margin-top: -6px;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;

  ${media.mobile`
    display: none;
    padding: 10px;
    border: 4px solid black;
  `}

  ${media.desktop`
    padding: 20px;
    border: 6px solid black;
  `}
`

export const StyledShadowOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4),
              inset 0 0px 40px rgba(7, 3, 3, 0.5), 
              inset 0 0px 20px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  z-index: 1;
`;

export const StyledImage = styled.img`
  display: block;
  height: 100%;
  width: 100%;
`;

export const StyledTitleFlexbox = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColor};
  overflow: hidden;

  ${media.mobile`
    justify-content: center;
    min-height: 60px;
    width: 100%;
    border-bottom: 4px solid black;
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
            inset 0 -2px 2px rgba(0, 0, 0, 0.6);
    margin-bottom: 20px;
  `}

  ${media.desktop`
    justify-content: flex-start;
    height: fit-content;
    width: 90%;
    border: 6px solid black;
    box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.3), 
            inset 0 -4px 4px rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
    border-radius: 20px;
    margin-bottom: 30px;
  `}
`

export const StyledTitleContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  ${media.mobile`
    justify-content: center;
    align-items: center;
    border-right: 4px solid black;

    animation: ${({ $tempCurrent, $id }) =>
      $tempCurrent !== $id ? slideOutRightMobileAnimation : slideInLeftMobileAnimation
    };
  `}

  ${media.desktop`
    justify-content: flex-start;
    align-items: center;
    padding: 30px 40px;
    border-right: 4px solid black;
  `}
`;

export const StyledTitleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  max-width: 60px;
  overflow: hidden;
  cursor: pointer;

  ${media.mobile`
    animation: ${({ $tempCurrent, $id }) =>
      $tempCurrent !== $id ? slideOutRightMobileAnimation : slideInLeftMobileAnimation
    };
  `}

  ${media.desktop`
    border-left: 2px solid black;
    transition: max-width 1s ease;

    &:hover {
      background-color: ${({ theme }) => theme.secondaryColor};
      box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.3), 
            inset 0 -4px 4px rgba(0, 0, 0, 0.6);
      max-width: 100px;
    }
  `}
`

export const StyledSVG = styled.svg`
  ${media.mobile`
    height: 40px;
  `}

  ${media.desktop`
    height: 80px;

    &:hover {
      transform: scale(1.1);
      transition: transform 0.4s ease;
    }
  `}
`;

export const StyledIntroTitleWrapper = styled.div`
  ${media.mobile`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
    width: 100%;
    background-color: ${({ theme }) => theme.primaryColor};
    border-bottom: 4px solid black;
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
            inset 0 -2px 2px rgba(0, 0, 0, 0.6);
  `}

  ${media.desktop`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  `}
`

export const StyledMainTitle = styled.h1`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);

  ${media.mobile`
    font-size: 2.5rem;

    animation: ${({ $tempCurrent, $id }) =>
      $tempCurrent !== $id ? slideOutRightMobileAnimation : slideInLeftMobileAnimation
    };
  `}

  ${media.desktop`
    font-size: 8rem;

    animation: ${({ $showSubTitle }) => 
      $showSubTitle  ? nudgeUpSubTitleAnimation
      : "none"
    };
  `}
`;

export const StyledTitle = styled.h1`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);

  ${media.mobile`
    font-size: 2.5rem;
  `}

  ${media.desktop`
    font-size: 4rem;
  `}
`;

export const StyledMinorTitleInitial = styled.h3`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);

  ${media.mobile`
    display: none;
  `}

  ${media.desktop`
    display: ${({ $showSubTitle }) => $showSubTitle ? "auto" : "none"};
    font-size: 3rem;

    animation: ${({ $showSubTitle, $subTitleEntranceComplete }) => 
    $showSubTitle && !$subTitleEntranceComplete ? swingInAnimation
    : "none"
  };
  `}
`;

export const StyledMinorTitle = styled.h3`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  white-space: nowrap;

  ${media.mobile`
    font-size: 2rem;
  `}

  ${media.desktop`
    font-size: 2.5rem;
  `}
`;

export const StyledHeadingText = styled.h3`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);


  color: ${({ theme }) => theme.textColor};
  pointer-events: none;

  ${media.mobile`
    font-size: 1.4rem;
  `}

  ${media.desktop`
    font-size: 2rem;
  `}
`;

export const StyledBodyTextInitialText = styled.p`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);

  ${media.mobile`
    font-size: 1.2rem;
    opacity: ${({ $collapse }) => $collapse ? "0" : "1"};
    transition: opacity 1s ease;
  `}

  ${media.desktop`
    padding-left: 40px;
    text-align: right;
    font-size: 1.5rem;
  `}
`;

export const StyledBodyText = styled.p`
  display: block;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);

  ${media.mobile`
    width: 100%;
    font-size: 1.2rem;
  `}

  ${media.desktop`
    font-size: 1.3rem;
    padding: ${({ $padding }) => $padding || "0px"};
  `}
`;

const createStyledIcon = (IconComponent) => styled(IconComponent)`
  height: 50px;
  width: 50px;
  transition: transform 0.4s;
  cursor: pointer;

  ${media.desktop`
    &:hover {
      transform: scale(1.2);
    }
  `}
`;

export const StyledNextIcon = createStyledIcon(NextIcon);
export const StyledDownloadIcon = createStyledIcon(DownloadIcon);
