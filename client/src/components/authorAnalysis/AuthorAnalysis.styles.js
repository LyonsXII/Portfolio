import styled from 'styled-components';
import { keyframes, css } from 'styled-components';

import { slideInTopAnimation, slideOutRightAnimation, bounceDownAnimation } from '../../context/Animations';
import { growInput, shrinkInput } from './AuthorAnalysisAnimations';

export const StyledFlexboxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;

  animation: ${({ $transition } ) => !$transition ? slideInTopAnimation : slideOutRightAnimation};
`;

export const StyledTextEntryFlexbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 80vw;
`

export const StyledMainButton = styled.button`
  height: 200px;
  width: 200px;
  border: 6px solid #000;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primaryColor};
  z-index: 1;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
  }
`

export const StyledTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
  width: 0px;
  border: 6px solid #000;
  border-radius: 0px 20px 20px 0px;
  background-color: ${({ theme }) => theme.secondaryColor};
  margin-left: -100px;

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
  background: transparent; /* Makes the background transparent */
  border: none;
  outline: none;           /* Removes the default focus outline */
  color: ${({ theme }) => theme.textColor};
  font-size: 1.2rem;
  white-space: normal;          /* Allows text to wrap */
  overflow-wrap: break-word;    /* Forces long words to break */
  overflow: hidden;
  resize: none;
  box-sizing: border-box;
  overflow-y: auto;        /* Enables vertical scrolling when needed */
  overflow-x: hidden;      /* Prevents horizontal scrolling */

  /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;

  /* Hide scrollbar for IE & Edge */
  -ms-overflow-style: none;
`
