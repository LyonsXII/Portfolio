import styled from 'styled-components';
import { keyframes, css } from 'styled-components';

import { media } from '../../context/media';

import { slideInTopAnimation, slideOutRightAnimation, bounceDownAnimation } from '../../context/Animations';
import { fadeInAnimation, fadeOutAnimation } from './AuthorAnalysisAnimations';

export const StyledFlexboxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  animation: ${({ $transition } ) => !$transition ? slideInTopAnimation : slideOutRightAnimation};
`;

export const StyledTextEntryFlexbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2vh 0vh;

  ${media.mobile`
    height: 100vh;
    max-height: ${({ $showData }) => $showData ? "34vw" : "calc(100vh - 40px)"};
    transition: max-height 1s ease;
    width: 100vw;
  `}

  ${media.desktop`
    height: 100vh;
    max-height: ${({ $showData }) => $showData ? "200px" : "calc(100vh - 40px)"};
    transition: max-height 1s ease;
    width: 80%;
  `}
`

export const StyledMainButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryColor};
  z-index: 1;
  transition: border-radius 1s ease;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
  }

  ${media.mobile`
    height: 34vw;
    width: ${({ $expanded }) => $expanded ? "15%" : "34vw"};
    border: 3px solid black;
    margin-left: ${({ $expanded }) => $expanded ? "0px" : "-10vw"};
    border-radius: ${({ $expanded }) => $expanded ? "40px" : "50%"};
    transition: border-radius 1s ease, margin-left 1s ease, width 1s ease;
  `}

  ${media.desktop`
    height: 200px;
    width: ${({ $expanded }) => $expanded ? "100px" : "200px"};
    border: 4px solid black;
    margin-left: ${({ $expanded }) => $expanded ? "0px" : "-75px"};
    border-radius: ${({ $expanded }) => $expanded ? "40px" : "50%"};
    transition: border-radius 1s ease, margin-left 1s ease, width 1s ease;
  `}
`

export const StyledTextBox = styled.div`
  width: 90%;
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
  display: ${({ $showData }) => $showData ? "grid" : "none"};
  grid-auto-flow: dense;

  justify-items: stretch;
  align-items: stretch;
  column-gap: 10px;
  row-gap: 20px;

  max-height: ${({ $showData }) => $showData ? "100%" : "0%"};
  transition: max-height 1s ease;
  margin-bottom: 20px;
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
  grid-column: ${({ span }) => span};
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

  grid-column: span 2;
  grid-row: span 2;

  ${media.mobile`
    order: 3px solid black;
  `}

  ${media.desktop`
    border: 4px solid black;
  `}
`

export const StyledIFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  transform: scale(1.2);
  transform-origin: 0 0;
  translate(-40%, -60%)
`;

export const StyledWordcloud = styled.img`
  border-radius: 20px;
  grid-row: span 2;

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

export const PyLDAvisContainer = styled.div`
  position: absolute;
  height: 90%;
  width: 90%;
  top: 5%;
  border: 6px solid black;
  border-radius: 20px;
  background-color: grey;
  z-index: 1000;
`

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