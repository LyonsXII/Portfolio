import styled from 'styled-components';

import { media } from '../../context/media';

import { slideInTopAnimation, slideOutBottomAnimation, bounceDownAnimation, swingInAnimation, nudgeUpSubTitleAnimation, nudgeUpBodyTextAnimation, nudgeDownBodyTextAnimation } from '../../context/Animations';

import { slideInBottomIntroAnimation, slideInBottomIntroAnimationMobile, slideOutBottomIntroAnimation, slideOutBottomIntroAnimationMobile } from './IntroductionAnimations';

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
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 30px;
`;

export const StyledContentFlexbox = styled.div`
  display: flex;
  justify-content: center;
  height: 340px;
  width: 90%;
  gap: 40px;
  margin-top: 30px;
`;

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

  ${media.mobile`
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;

    max-height: ${({ $expandIntroText }) => $expandIntroText ? "56%" : "20%"};
    transition: max-height 0.5s ease-in-out;
  `}

  ${media.desktop`
    height: 80vh;
    width: 60%;
    align-items: flex-end;
    justify-content: center;
  `}

  animation: ${({ $tempCurrent, $id }) =>
    $tempCurrent !== $id ? slideOutBottomAnimation : slideInTopAnimation
  };
`;

export const StyledGalleryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.mobile`
    width: 100%;
  `}

  ${media.desktop`
    height: 100vh;
    width: 30%;
    margin-left: 4vw;
  `}
`;

// Source - Temani Afif, taken from the article "https://freefrontend.com/css-gallery/"
export const StyledGallery = styled.div`
  --s: 20vh; // Gallery image size
  
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
      transform: translateY(calc(1.85 * var(--s))) scale(0.5) rotate(45deg);
      --b: 70%;
    }
  `}

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
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

export const StyledImage = styled.img`
  border: 6px solid black;
  border-radius: 20px;

  ${media.mobile`
    height: 15%;
    width: 100%;
  `}

  ${media.desktop`
    height: ${({ $height }) => $height};
    width: ${({ $width }) => $width};
  `}
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColorTransparent};

  ${media.mobile`
    width: 100%;
    flex-direction: column;
    border-bottom: 3px solid black;
    padding: 4px 0px 8px 0px;
  `}

  ${media.desktop`
    width: 90%;
    border: 6px solid black;
    border-radius: 20px;
    padding: 20px 40px;
  `}
`;

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

export const StyledSpacer = styled.div`
  ${media.mobile`
    display: none;
  `}

  ${media.desktop`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
  `}
`;

export const StyledSVG = styled.svg`
  ${media.mobile`
    height: 40px;
  `}

  ${media.desktop`
    height: 80px;
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

    animation: ${({ $showSubTitle, $subTitleEntranceComplete, $introBodyTextAnimationActive }) => 
      $showSubTitle && !$subTitleEntranceComplete ? nudgeUpSubTitleAnimation
      : $introBodyTextAnimationActive === "Entrance" ? nudgeUpBodyTextAnimation 
      : $introBodyTextAnimationActive === "Exit" ? nudgeDownBodyTextAnimation
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
    font-size: 6rem;
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

    animation: ${({ $showSubTitle, $expandIntroText, $subTitleEntranceComplete, $introBodyTextAnimationActive }) => 
    $showSubTitle && !$subTitleEntranceComplete ? swingInAnimation
    : $introBodyTextAnimationActive === "Entrance" ? nudgeUpBodyTextAnimation 
    : $introBodyTextAnimationActive === "Exit" ? nudgeDownBodyTextAnimation
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
    padding: 4% 0px 0px 4%;
    text-align: right;
    font-size: 1.5rem;

    animation: ${({ $introBodyTextAnimationActive }) => 
      $introBodyTextAnimationActive === "Entrance" 
        ? slideInBottomIntroAnimation 
      : $introBodyTextAnimationActive === "Exit" 
          ? slideOutBottomIntroAnimation
      : "none"
    };
  `}
`;

export const StyledBodyText = styled.p`
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
    width: 90%;
    margin-top: 30px;
    font-size: 1.5rem;
  `}
`;