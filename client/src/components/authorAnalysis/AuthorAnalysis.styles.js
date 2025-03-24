import styled from 'styled-components';
import { keyframes, css } from 'styled-components';

import { media } from '../../context/media';

import { slideInTopAnimation, slideOutRightAnimation } from '../../context/Animations';
import { fadeInAnimation, fadeOutAnimation, slideInBottomAnimation, slideOutBottomAnimation } from './AuthorAnalysisAnimations';

export const StyledFlexboxContainer = styled.div`
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
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  max-height: ${({ $showData }) => $showData ? "32vh" : "100vh"};
  transition: max-height 1s ease;
`

export const StyledTextEntryFlexbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.mobile`
    height: 100%;
    max-height: ${({ $showData }) => $showData ? "34vw" : "calc(100vh - 40px)"};
    transition: max-height 1s ease;
    width: 100%;
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
  background-color: ${({ theme }) => theme.primaryColor};
  z-index: 1;
  cursor: pointer;

  transition: border-radius 1s ease, margin-left 1s ease, width 1s ease, transform 0.2s ease, background-color 0.8s ease;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
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
  padding: 0xp;
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

  /* Hide scrollbar, covers various browsers */
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
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 10px;
  grid-auto-rows: auto;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 0px 20px 20px 0px;

  box-sizing: border-box;

  ${media.mobile`
    height: calc(34vw - 26px);
    margin-left: -10vw;
    border: 3px solid black;
  `}

  ${media.desktop`
    height: 160px;
    margin-left: -75px;
    padding: ${({$expanded}) => $expanded ? "10px 20px 10px 90px" : "0px"};
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
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
    transform: scale(1.02);
    transition: transform 0.2s ease, background-color 0.8s ease;
  }

  animation: ${({ $authorExpandedButtonAnimation }) => 
    $authorExpandedButtonAnimation ? fadeInAnimation : "none"
  };
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
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
  }

  animation: ${fadeInAnimation};
`

export const StyledGrid = styled.div`
  // display: ${({ $showData }) => $showData ? "grid" : "none"};
  display: grid;
  grid-auto-flow: dense;

  justify-items: stretch;
  align-items: stretch;
  column-gap: 10px;
  row-gap: 20px;

  max-height: ${({ $showData }) => $showData ? "100vh" : "0vh"};
  margin-bottom: ${({ $showData }) => $showData ? "20px" : "0px"};
  transition: max-height 1s ease, margin-bottom 1s ease;
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
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-auto-rows: minmax(100px, auto);
  `}

  ${media.desktop`
    width: 90%;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: minmax(150px, auto);
  `}

  animation: ${({ $showData }) => 
    $showData ? slideInBottomAnimation : slideOutBottomAnimation
  }
`

export const StyledDataBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 20px;
  box-sizing: border-box;
  grid-column: ${({ span }) => span};

  ${media.mobile`
    padding: 10px;
    border: 3px solid black;
  `}

  ${media.desktop`
    padding: 20px;
    border: 4px solid black;
  `}
`

export const StyledPlotContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  background-color: white;
  color: antiquewhite;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 1),
            0px 0px 6px rgba(0, 0, 0, 1),
            0px 0px 6px rgba(0, 0, 0, 1),
            0px 0px 6px rgba(0, 0, 0, 1),
            0px 0px 6px rgba(0, 0, 0, 1),               
            0px 0px 6px rgba(0, 0, 0, 1);

  grid-column: ${({ span }) => span};;
  grid-row: span 2;

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
  border-radius: 20px;
  grid-row: span 2;
  box-sizing: border-box;

  ${media.mobile`
    border: 3px solid black;
    grid-column: span 2;
    pointer-events: none;
  `}

  ${media.desktop`
    border: 4px solid black;
    grid-column: span 4;
  `}
`

export const StyledTopicButton = styled.button`
  padding: 20px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 20px;

  ${media.mobile`
    border: 3px solid black;
    pointer-events: none;
  `}

  ${media.desktop`
    border: 4px solid black;
  `}

  &:hover {
  background-color: ${props => props.theme.secondaryColor};
  box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
  }
`

export const FullScreenBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 1;
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
  border: 6px solid black;
  border-radius: 20px;
  background-color: white;
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
    font-size: 0.9rem;
    line-height: 1.4;
  `}

  ${media.desktop`
    font-size: 1rem;
  `}
`;