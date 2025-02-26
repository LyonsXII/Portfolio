import styled from 'styled-components';
import { keyframes, css } from 'styled-components';

import { media } from '../../context/media';

import { slideInTopAnimation, slideOutRightAnimation, bounceDownAnimation } from '../../context/Animations';
import { growInput, shrinkInput } from './AuthorAnalysisAnimations';

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
  width: 0px;
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

  animation: ${({$expanded}) => $expanded ? 
  css`${growInput} 1s ease-in-out forwards` : 
  css`${shrinkInput} 1s ease-in-out forwards`
  };
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
  display: ${({ $expanded }) => $expanded ? "auto" : "none"};
  width: ${({ $width }) => $width};

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
  }
`
export const StyledDataGrid = styled.div`
  display: grid;
  height: 100%;
  max-height: ${({ $showData }) => $showData ? "100%" : "0%"};
  transition: max-height 1s ease;
  width: 90%;
`

export const StyledDataBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: fit-content;
  background-color: ${({ theme }) => theme.primaryColor};
  border: 3px solid black;
  border-radius: 20px;
  padding: 10px;
`

export const StyledPlotContainer = styled.div`
  margin-top: 20px;
  width: 500px;
  border: 3px solid black;
  overflow: hidden;
  background-color: white;

  ${media.mobile`
    height: 460px;
  `}

  ${media.desktop`
    height: 860px;
  `}
`

export const StyledIFrame = styled.iframe`
  width: 100%;    /* Increase iframe size to compensate for the scale down */
  height: 100%;
  transform: scale(1);     /* Scale down the content */
  transform-origin: 0 0;      /* Anchor the scaling at the top-left corner */
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