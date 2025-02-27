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
  justify-content: center;
  align-items: center;
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
  height: calc(100% - 40px);
  width: calc(80% - 20px);
  margin-left: 20%;
  padding: 20px 20px 20px 0px;
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

  /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;

  /* Hide scrollbar for IE & Edge */
  -ms-overflow-style: none;
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
export const StyledFlexbox = styled.div`
  display: ${({ $showData }) => $showData ? "flex" : "none"};
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  height: 100%;
  max-height: ${({ $showData }) => $showData ? "100%" : "0%"};
  transition: max-height 1s ease;
  width: 100%;
`

export const StyledDataBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryColor};
  border: 3px solid black;
  border-radius: 20px;
  padding: 10px;
`

export const StyledPlotContainer = styled.div`
  width: 50%;
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

  ${media.mobile`
    height: 300px;
  `}

  ${media.desktop`
    height: 860px;
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

export const StyledBodyText = styled.p`
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),
              0px 0px 6px rgba(0, 0, 0, 1),               
              0px 0px 6px rgba(0, 0, 0, 1);

  ${media.mobile`
    font-size: 1.2rem;
  `}

  ${media.desktop`
    font-size: 1.5rem;
  `}
`;