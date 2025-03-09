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
    border: 6px solid black;
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
    border: 6px solid black;
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
  grid-template-columns: repeat(12, 1fr);
  justify-items: stretch;
  align-items: stretch;
  gap: 10px;
  height: 2000px;
  max-height: ${({ $showData }) => $showData ? "100%" : "0%"};
  transition: max-height 1s ease;
  width: 100%;
  padding: 0% 3%;
  box-sizing: border-box;
  overflow-y: scroll;

  /* Hide scrollbar, covers various browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`
const responsiveGridColumn = (spanMobile, spanDesktop) => css`
  ${media.mobile`
    grid-column: ${ spanMobile };
  `}

  ${media.desktop`
    grid-column: ${spanDesktop };
  `}
`

export const StyledDataBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryColor};
  border: 3px solid black;
  border-radius: 20px;

  ${({ spanMobile, spanDesktop }) => responsiveGridColumn(spanMobile, spanDesktop)}

  ${media.mobile`
    padding: 10px;
  `}

  ${media.desktop`
    padding: 20px;
  `}
`

export const StyledPlotContainer = styled.div`
  grid-column: ${({ span }) => span};
  border: 3px solid black;
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

  ${({ spanMobile, spanDesktop }) => responsiveGridColumn(spanMobile, spanDesktop)}

  ${media.mobile`
    height: 100%;
  `}

  ${media.desktop`
    height: 400px;
    width: 100%
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
  border: 3px solid black;
  border-radius: 20px;

  ${({ spanMobile, spanDesktop }) => responsiveGridColumn(spanMobile, spanDesktop)}

  ${media.mobile`
    height: 240px;
    pointer-events: none;
  `}

  ${media.desktop`
    height: fit-content;
    width: 100%
  `}
`

export const StyledTopicButton = styled.button`
  padding: 20px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.primaryColor};
  border: 3px solid black;
  border-radius: 20px;

  ${({ spanMobile, spanDesktop }) => responsiveGridColumn(spanMobile, spanDesktop)}

  &:hover {
  background-color: ${props => props.theme.secondaryColor};
  box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
  }
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