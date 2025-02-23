import styled from 'styled-components';
import { keyframes, css } from 'styled-components';

import { media } from '../../context/media';

import { slideInTopAnimation, slideOutRightAnimation, bounceDownAnimation } from '../../context/Animations';
import { growInput, shrinkInput } from './AuthorAnalysisAnimations';

export const StyledFlexboxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  gap: 40px;

  ${media.mobile`
    align-items: flex-start;
  `}

  ${media.desktop`
    align-items: center;
  `}

  animation: ${({ $transition } ) => !$transition ? slideInTopAnimation : slideOutRightAnimation};
`;

export const StyledTextEntryFlexbox = styled.div`
  display: flex;
  justify-content: center;

  ${media.mobile`
    height: 100vh;
    max-height: calc(50vh + 17vw);
    width: 100vw;
    align-items: flex-end;
  `}

  ${media.desktop`
    height: 200px;
    width: 80%;
    align-items: center;
  `}
`

export const StyledMainButton = styled.button`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primaryColor};
  z-index: 1;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
  }

  ${media.mobile`
    height: 34vw;
    width: 34vw;
    border: 3px solid black;
  `}

  ${media.desktop`
    height: 200px;
    width: 200px;
    border: 6px solid black;
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
    height: calc(34vw - 6px);
    margin-left: -17vw;
    // Need to add a temp variable to handle the transition, until animation done can't be none
    display: ${({$expanded}) => $expanded ? "auto" : "none"};
    border: 3px solid black;
  `}

  ${media.desktop`
    height: 160px;
    margin-left: -100px;
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
