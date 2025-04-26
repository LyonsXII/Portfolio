import { styled, css } from "styled-components";

import { media } from '../../context/media';

import { slideInTopAnimation, slideOutBottomAnimation, bounceDownAnimation, swingInAnimation, nudgeUpSubTitleAnimation, nudgeUpBodyTextAnimation, nudgeDownBodyTextAnimation } from '../../context/Animations';

import { slideInBottomIntroAnimation, slideInBottomIntroAnimationMobile, slideOutBottomIntroAnimation, slideOutBottomIntroAnimationMobile } from './IntroductionAnimations';

import NextIcon from "../../icons/nextSong.svg?react";
import DownloadIcon from "../../icons/download.svg?react";

export const StyledContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100vw;

  ${media.mobile`
    flex-direction: column;
  `}
`;

export const StyledIntroContentContainer = styled.div`
  display: flex;
  flex-direction: ${({ $flexDirection }) => $flexDirection || "column"};
  align-items: flex-start;
  height: 100%;
  max-height: 10000px;
  width: 90%;
  padding: 0px 20px;
  gap: ${({ $gap }) => $gap || "20px"};
  box-sizing: border-box;

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
`;

export const StyledIntroInitialContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  margin-top: 40px;
  gap: 20px;
  max-height: ${({ $expandIntroText }) => $expandIntroText ? "100%" : "0%"};
  opacity: ${({ $expandIntroText }) => $expandIntroText ? 1 : 0};
  transition: max-height 2s ease, opacity 2s ease;
  overflow: hidden;
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
  justify-content: flex-end;
  align-items: flex-start;
  max-height: ${( { $initialSection, $sectionName }) => $initialSection == $sectionName ? "250px" : "0px"};
  opacity: ${( { $initialSection, $sectionName }) => $initialSection == $sectionName ? "1" : "0"};
  transition: max-height 1s ease, opacity 1s ease;
  overflow: hidden;
`

export const StyledSectionHeadingsFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  height: 230px;
  width: 100%;
  margin-top: 20px;
  gap: 30px;
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
`

export const StyledSectionRowFlexbox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  height: fit-content;
  margin-top: ${({ $marginTop }) => $marginTop || "0px"};
  margin-right: ${({ $marginRight }) => $marginRight || "20px"};
  width: 90%;
  row-gap: 20px;
  column-gap: 40px;
  padding-right: 10px;
`

export const StyledSectionRowTextFlexbox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  height: 200px;
  margin-top: ${({ $marginTop }) => $marginTop || "0px"};
  margin-right: ${({ $marginRight }) => $marginRight || "20px"};
  width: 90%;
  row-gap: 20px;
  column-gap: 40px;
  padding-right: 20px;
  padding-bottom: 20px;

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
`

export const StyledInitialSectionFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`

export const StyledTechPairFlexbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
  gap: 20px;
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
  justify-content: center;
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
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    height: 100vh;

    max-height: ${({ $expandIntroText }) => $expandIntroText ? "56%" : "20%"};
    transition: max-height 0.5s ease-in-out;
  `}

  ${media.desktop`
    height: 84vh;
    width: 100%;
    align-items: ${({ $current }) => $current == 0 ? "flex-end" : "flex-start"};
    justify-content: ${({ $current }) => $current == 0 ? "center" : "flex-start"};
    padding-left: ${({ $current }) => $current == 0 ? "0px" : "5%"};
  `}

  animation: ${({ $tempCurrent, $id }) =>
    $tempCurrent !== $id ? slideOutBottomAnimation : slideInTopAnimation
  };
`;

export const StyledIntroButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.primaryColor};
  border: 3px solid black;
  border-radius: 20px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(7, 3, 3, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  }
`

export const StyledGalleryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 130px;

  ${media.mobile`
    width: 100%;
  `}

  ${media.desktop`
    height: 100vh;
    width: fit-content;
    margin-left: ${({ $current }) => $current == 0 ? "3vw" : "0vw"};
  `}
`;

/* Source - Temani Afif, taken from the article "https://freefrontend.com/css-gallery/" */
export const StyledGallery = styled.div`
  --s: 18vh; // Gallery image size
  
  display: grid;
  grid-template-columns: repeat(3,auto);
  gap: 10px;
  position: relative;

  animation: ${bounceDownAnimation};
`;

export const StyledInput = styled.input`
  position: absolute;
  border: 6px solid #000;
  border-radius: 50%;
  width: calc(var(--s) / 1.25); /* Dynamically size */
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
      border: 8px solid #000;
      transform: translateY(calc(0.925 * var(--s))) scale(0.5) rotate(45deg);
      --b: 70%;
    }
  `}

  ${media.desktop`
    top: calc(50% - var(--s) / 2.5);
    left: 0;

    &:checked {
      border: 8px solid #000;
      transform: translateX(calc(1.25 * var(--s))) translateY(calc(1.85 * var(--s))) scale(0.5) rotate(45deg);
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
    transform: scale(1);
    filter: brightness(1);
    pointer-events: initial;
    transform: translateY(-40px);
  }

  &:checked {
    border: 8px solid #000;
  }
`;

export const StyledGalleryImage = styled.img`
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  aspect-ratio: 1;
  object-fit: cover;
  transform: scale(0.1);
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
  margin: ${({ $margin }) => $margin || "0px"};
  box-sizing: border-box;
`

export const StyledImageContainer = styled.div`
  float: ${({ $float }) => $float || "none"};
  height: fit-content;
  width: ${({ $width }) => $width || "100%"};
  margin: ${({ $margin }) => $margin || "0px"};
  box-sizing: border-box;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.3), 
          inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  border-radius: 20px;
`

export const StyledImageWrapper = styled.div`
  position: relative;
  border: 6px solid black;
  border-radius: 20px 20px 0px 0px;
  box-sizing: border-box;
  overflow: hidden;
`

export const StyledCaptionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.primaryColor};
  border: 6px solid black;
  border-radius: 0px 0px 20px 20px;
  margin-top: -6px;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
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
  justify-content: flex-start;
  align-items: center;
  height: fit-content;
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  overflow: hidden;

  ${media.desktop`
    width: 90%;
    border: 6px solid black;
    box-sizing: border-box;
    border-radius: 20px;
    margin-bottom: 30px;
  `}
`

export const StyledTitleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 30px 40px;
  box-sizing: border-box;

  ${media.mobile`
    width: 100%;
    flex-direction: column;
    border-bottom: 3px solid black;
    padding: 4px 0px 8px 0px;
  `}
`;

export const StyledTitleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100px;
  max-width: 60px;
  border-left: 6px solid black;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  cursor: pointer;

  transition: max-width 0.6s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3),
          inset 0 2px 4px rgba(255, 255, 255, 0.3), 
          inset 0 -4px 4px rgba(0, 0, 0, 0.6);
    max-width: 100px;
  }
`

export const StyledIntroButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  ${media.mobile`
    margin-top: 1vh;
    gap: 10px;
  `}

  ${media.desktop`
    margin-top: 1vh;
    gap: 30px;
  `}
`;

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

export const StyledMainTitle = styled.h1`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);

  ${media.mobile`
    margin-top: 4%;
    font-size: 5rem;
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
    font-size: 3rem;
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
  font-size: 2rem;
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

  font-size: 2rem;
  color: ${({ theme }) => theme.textColor};
  pointer-events: none;
`;

export const StyledBodyTextInitialText = styled.p`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);

  ${media.mobile`
    margin-top: 10%;
    padding: 0% 4% 0% 4%;
    text-align: center;
    font-size: 1.2rem;

    animation: ${({ $introBodyTextAnimationActive }) => 
      $introBodyTextAnimationActive === "Entrance" 
        ? slideInBottomIntroAnimationMobile 
      : $introBodyTextAnimationActive === "Exit" 
          ? slideOutBottomIntroAnimationMobile
      : "none"
    };
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
    width: calc(100% - 40px);
    margin-top: 20px;
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

  &:hover {
    transform: scale(1.2);
  }
`;

export const StyledNextIcon = createStyledIcon(NextIcon);
export const StyledDownloadIcon = createStyledIcon(DownloadIcon);
