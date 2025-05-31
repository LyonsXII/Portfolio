import styled from 'styled-components';
import { keyframes, css } from 'styled-components';

import { media } from '../../context/media';

import { slideInTopAnimation, slideOutRightAnimation } from '../../context/Animations';
import { fadeInAnimation, delayedFadeInAnimation, fadeOutAnimation, slideInBottomAnimation, slideOutBottomAnimation } from './AuthorAnalysisAnimations';

export const StyledFlexboxContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${({ $transition } ) => !$transition ? slideInTopAnimation : slideOutRightAnimation};
`;


export const StyledButtonsFlexbox = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.mobile`
    flex-direction: column;
    max-height: ${({ $showData }) => $showData ? "34vw" : "100vh"};
    max-width: ${({ $showData }) => $showData ? "calc(100% - 100px)" : "calc(100% - 40px)"};
    margin-top: ${({ $showData }) => $showData ? "20px" : "0px"};
    margin-left: ${({ $showData }) => $showData ? "80px" : "0px"};
    transition: ${({ $showData }) => $showData 
    ? "max-height 0.5s ease, max-width 0.5s ease, margin-top 0.5s ease, margin-left 0.5s ease"
    : "max-height ease 0.5s, max-width 0.5s ease 0.5s, margin-top 0.5s ease 0.5s, margin-left 0.5s ease 0.5s"
    };
  `}

  ${media.desktop`
    gap: 60px;
    max-height: ${({ $showData }) => $showData ? "260px" : "100vh"};
    max-width: ${({ $showData }) => $showData ? "calc(100vw - 200px)" : "80%"};
    margin-top: ${({ $showData }) => $showData ? "20px" : "0px"};
    margin-left: ${({ $showData }) => $showData ? "80px" : "0px"};
    transition: all 0.5s ease;
  `}
`

export const StyledTextEntryFlexbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.mobile`
    height: 100%;
    width: 100%;
    max-height: ${({ $hide }) => !$hide ? "0vw" : "34vw"};
    opacity: ${({ $hide }) => $hide ? "100%" : "0%"};
    padding: ${({ $hide }) => $hide ? "10px 0px" : "0px"};
    transition: ${({ $showData, $hide }) => 
      $showData && $hide
        ? "max-height 0.5s ease 0.5s, opacity 1s ease 1s, padding 1s ease"
      : $showData && !$hide 
        ? "max-height 1s ease 1s, opacity 0.5s ease 0.5s, padding 1s ease 1s"
      : !$showData && $hide
        ? "max-height 0.5s ease 0.5s, opacity 1s ease 1s, padding 1s ease"
      : !$showData && !$hide
        ? "max-height 1s ease 1s, opacity 0.5s ease 0.5s, padding 1s ease 1s"
      : ""
    };
    overflow: hidden;
  `}

  ${media.desktop`
    height: 100%;
    max-height: ${({ $showData }) => $showData ? "200px" : "calc(100vh - 40px)"};
    max-width: ${({ $expanded }) => $expanded ? "80%" : "200px"};
    transition: max-height 1s ease, max-width 1s ease;
    width: 100%;
  `}
`

export const StyledMainButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
          inset 0 4px 6px rgba(255, 255, 255, 0.3), 
          inset 0 -6px 6px rgba(0, 0, 0, 0.6);
  z-index: 1;
  cursor: pointer;

  transition: border-radius 1s ease, margin-left 1s ease, width 1s ease, transform 0.2s ease, background-color 0.8s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
        inset 0 6px 10px rgba(255, 255, 255, 0.3), 
        inset 0 -10px 10px rgba(0, 0, 0, 0.6);
    transform: scale(1.02);
  }

  ${media.mobile`
    height: 34vw;
    width: ${({ $expanded }) => $expanded ? "15%" : "34vw"};
    border: 3px solid black;
    margin-left: ${({ $expanded }) => $expanded ? "0px" : "-10vw"};
    border-radius: ${({ $expanded }) => $expanded ? "40px" : "50%"};
  `}

  ${media.desktop`
    height: 200px;
    width: ${({ $expanded }) => $expanded ? "100px" : "200px"};
    border: 4px solid black;
    margin-left: ${({ $expanded }) => $expanded ? "0px" : "-75px"};
    border-radius: ${({ $expanded }) => $expanded ? "40px" : "50%"};
  `}
`

export const StyledTextBox = styled.div`
  width: 100%;
  max-width: ${({$expanded}) => $expanded ? "100%" : "0%"};
  transition: max-width 1s ease;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0px 20px 20px 0px;
  background-color: ${({ theme }) => theme.secondaryColor};

  ${media.mobile`
    height: calc(34vw - 26px);
    margin-left: -10vw;
    border: 3px solid black;
  `}

  ${media.desktop`
    height: 160px;
    margin-left: -75px;
    border: 4px solid black;
  `}
`

export const StyledTextField = styled.textarea`
  padding: 0px;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.2rem;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),               
              0px 0px 6px rgba(0, 0, 0, 1);
  white-space: normal;
  overflow-wrap: break-word;
  overflow: hidden;
  resize: none;
  box-sizing: border-box;
  overflow-y: auto; 
  overflow-x: hidden;

  /* Hide scrollbar for different browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  ${media.mobile`
    height: calc(100% - 40px);
    width: calc(100% - 80px);
    margin: 20px 0px 0px 56px;
  `}

  ${media.desktop`
    height: calc(100% - 40px);
    width: calc(100% - 110px);
    margin: 20px 0px 0px 90px;
  `}
`

export const StyledAuthorButtonContainer = styled.div`
  width: 100%;
  max-width: ${({$expanded}) => $expanded ? "100%" : "0%"};
  transition: max-width 1s ease;
  display: grid;
  grid-auto-rows: auto;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 0px 20px 20px 0px;
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
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

  ${media.mobile`
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    grid-gap: 5px;
    height: calc(34vw - 26px);
    margin-left: -10vw;
    padding: ${({$expanded}) => $expanded ? "5px 10px 5px 45px" : "0px"};
    border: 3px solid black;
  `}

  ${media.desktop`
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 10px;
    height: 160px;
    margin-left: -75px;
    padding: ${({$expanded}) => $expanded ? "15px 20px 15px 90px" : "0px"};
    transition: max-width 1s ease, padding 1s ease;
    border: 4px solid black;
  `}
`

export const StyledAuthorButton = styled.button`
  display: ${({ $authorExpandedButtonAnimation }) => $authorExpandedButtonAnimation ? "flex" : "none"};
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${({ theme, $selectedAuthor, $value }) => $selectedAuthor === $value ? theme.tertiaryColor : theme.primaryColor};
  border: 3px solid black;
  border-radius: 10px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.textColor};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4),
          inset 0 4px 6px rgba(255, 255, 255, 0.3), 
          inset 0 -2px 2px rgba(0, 0, 0, 0.6);
  cursor: pointer;

  animation: ${({ $authorExpandedButtonAnimation }) => 
    $authorExpandedButtonAnimation ? fadeInAnimation : "none"
  };

  ${media.mobile`
    padding: 4px 5px;
  `}

  ${media.desktop`
    padding: 4px 10px;

    &:hover {
      background-color: ${props => props.theme.secondaryColor};
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4),
              inset 0 4px 6px rgba(255, 255, 255, 0.3), 
              inset 0 -2px 2px rgba(0, 0, 0, 0.6);
      transform: scale(1.02);
      transition: transform 0.2s ease, background-color 0.8s ease;
    }
  `}
`

export const StyledIcon = styled.img`
  display: ${({ $expanded, $main }) => 
    $main && $expanded ? "none"
    : $main && !$expanded ? "auto" 
    : !$main && $expanded ? "auto"
    : "none"
  };
  width: ${({ $width }) => $width};

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    transform: scale(1.08);
    transition: transform 0.2s ease;
  }

  animation: ${({ $expanded, $main }) => 
    $main && $expanded ? fadeOutAnimation
    : $main && !$expanded ? fadeInAnimation
    : !$main && $expanded ? delayedFadeInAnimation
    : fadeOutAnimation
  };;
`

export const StyledGrid = styled.div`
  display: grid;
  grid-auto-flow: dense;
  position: relative;
  justify-items: stretch;
  align-items: stretch;
  column-gap: 10px;
  row-gap: 20px;
  max-height: ${({ $showData }) => $showData ? "100vh" : "0vh"};

  transition: max-height 1s ease, margin-bottom 1s ease;
  transition-delay: ${({ $showData }) => $showData ? "0.5s" : "0s"};
  padding: 0% 3%;
  box-sizing: border-box;
  overflow-y: scroll;

  /* Hide scrollbar, covers various browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  ${media.mobile`
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-auto-rows: minmax(100px, auto);
    width: 100%;
    margin-top: 20px;
    margin-bottom: ${({ $showData }) => $showData ? "20px" : "0px"};
  `}

  ${media.desktop`
    width: 90%;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(150px, auto);
    margin-bottom: ${({ $showData }) => $showData ? "40px" : "0px"};
  `}

  animation: ${({ $showData }) => 
    $showData ? slideInBottomAnimation : slideOutBottomAnimation
  }
`

export const StyledDataBox = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  box-sizing: border-box;
  grid-column: ${({ span }) => span};
  z-index: 2;

  ${media.mobile`
    padding: 10px;
    border: 3px solid black;
  `}

  ${media.desktop`
    padding: 20px;
    border: 4px solid black;
  `}
`

export const StyledInfoButton = styled.button`
  ${media.mobile`
    display: none;
  `}

  ${media.desktop`
    height: 30px;
    width: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    border: 3px solid black;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.secondaryColor};
    box-sizing: border-box;
    z-index: 4;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.tertiaryColor};
      box-shadow: 0 0px 10px rgba(255, 255, 255, 0.6);
      transform: scale(1.05);
      transition: transform 0.2s ease;
    }
  `}
`

export const StyledSVG = styled.svg`
  pointer-events: none;

  ${media.mobile`
    height: 30px;
  `}

  ${media.desktop`
    height: 30px;
  `}
`;

export const StyledToolTip = styled.div`
  height: fit-content;
  width: 800px;
  border: 4px solid black;
  border-radius: 20px;
  position: absolute;
  top: ${({ $hoverText }) => $hoverText.position.y}px;
  left: ${({ $hoverText }) => $hoverText.position.x}px;
  background-color: ${({ theme }) => theme.primaryColor};
  padding: 20px;
  color: ${({ theme }) => theme.textColor};
  box-sizing: border-box;
  opacity: 1;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  z-index: 3;
  white-space: pre-line;
`

export const StyledBackdrop = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: black; 
  z-index: 2;
  opacity: 0.8;
  pointer-events: none;
`;

export const StyledPlotContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4),
        inset 0 4px 6px rgba(255, 255, 255, 0.3), 
        inset 0 -2px 2px rgba(0, 0, 0, 0.6);
  color: antiquewhite;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 1),
            0px 0px 6px rgba(0, 0, 0, 1),
            0px 0px 6px rgba(0, 0, 0, 1),
            0px 0px 6px rgba(0, 0, 0, 1),
            0px 0px 6px rgba(0, 0, 0, 1),               
            0px 0px 6px rgba(0, 0, 0, 1);

  grid-column: ${({ span }) => span};;
  grid-row: span 3;

  ${media.mobile`
    border: 3px solid black;
  `}

  ${media.desktop`
    border: 4px solid black;
  `}
`

export const StyledWordcloud = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 14px;
  box-sizing: border-box;

  ${media.mobile`
    border: 3px solid black;
    grid-column: span ${({ $mobileColSpan }) => $mobileColSpan || "span 1"};
    grid-row: span ${({ $mobileRowSpan }) => $mobileRowSpan || "span 1"};
    pointer-events: none;
  `}

  ${media.desktop`
    border: 4px solid black;
    grid-column: span ${({ $desktopColSpan }) => $desktopColSpan || "span 1"};
    grid-row: span ${({ $desktopRowSpan }) => $desktopRowSpan || "span 1"};
  `}
`

export const StyledTopicButton = styled.button`
  padding: 20px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  cursor: pointer;

  ${media.mobile`
    border: 3px solid black;
    pointer-events: none;
  `}

  ${media.desktop`
    border: 4px solid black;
  `}

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
                inset 0 2px 4px rgba(255, 255, 255, 0.3), 
                inset 0 -4px 4px rgba(0, 0, 0, 0.6);
    transform: scale(1.02);
    transition: transform 0.2s ease, background-color 0.8s ease;
  }
`

export const FullScreenBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 2;
  opacity: 0.8;
`

export const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 90%;
  top: 5vh;
  left: 5vw;
  overflow: none;
  z-index: 2;
  
  ${media.mobile`
    width: 90%;
  `}

  ${media.desktop`
    width: calc(90% - 180px);
  `}
`

export const StyledIFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
`;

export const StyledBodyText = styled.p`
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),               
              0px 0px 6px rgba(0, 0, 0, 1);

  ${media.mobile`
    font-size: 0.9rem;
    line-height: 1.4;
  `}

  ${media.desktop`
    font-size: 1.5rem;
  `}
`;

export const StyledButtonText = styled.p`
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),               
              0px 0px 6px rgba(0, 0, 0, 1);

  ${media.mobile`
    font-size: 0.8rem;
    line-height: 1.4;
  `}

  ${media.desktop`
    font-size: 1rem;
  `}
`;