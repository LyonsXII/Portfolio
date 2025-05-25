import styled from 'styled-components';

import { media } from '../../context/media';

import { slideInTopAnimation, slideOutRightAnimation } from '../../context/Animations';

export const StyledFlexboxContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 40px;

  animation: ${({ $transition } ) => !$transition ? slideInTopAnimation : slideOutRightAnimation};

  ${media.mobile`
    flex-direction: column;
  `}

  ${media.desktop`

  `}
`;

export const StyledPlotContainer = styled.div`
  aspect-ratio: 1 / 1;
  border: 4px solid black;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;

  ${media.mobile`
    height: fit-content;
    width: calc(100% - 40px);
  `}

  ${media.desktop`
    flex-grow: 1;
    height: auto;
    min-height: 500px;
    max-height: 80vh;
    min-width: 500px;
    max-width: 80vh;
    margin: 10vh 0vh;
    margin-left: 160px;
  `}
`;

export const StyledButtonContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;

  ${media.mobile`

  `}

  ${media.desktop`
    gap: 30px;
    max-height: 90vh;
    margin-right: 160px;
  `}
`;

export const StyledRowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const StyledButton = styled.button`
  width: auto;
  padding: 15px 30px;
  word-wrap: break-word;
  white-space: normal;
  border: 4px solid black;
  border-radius: 20px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 6px 6px rgba(0, 0, 0, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.3), 
          inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
    transform: scale(1.01);
    transition: transform 0.2s ease, background-color 0.8s ease;
  }
`;

export const StyledIncrementButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  padding: 0px;
  border: 4px solid black;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 6px 6px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.3), 
            inset 0 -2px 2px rgba(0, 0, 0, 0.6);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
    transform: scale(1.01);
    transition: transform 0.1s ease, background-color 0.8s ease;
  }
`;

export const StyledTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: auto;
  padding: 15px 30px;
  word-wrap: break-word;
  white-space: normal;
  border: 4px solid black;
  border-radius: 20px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.3), 
            inset 0 -4px 4px rgba(0, 0, 0, 0.6);
`

export const StyledToggle = styled.input`
  // Hide default tickbox
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 60px;
  min-width: 60px;
  height: 30px;
  background-color: ${({ theme }) => theme.tertiaryColor};
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 2px rgba(7, 3, 3, 0.3), 
              inset 0 -2px 2px rgba(0, 0, 0, 0.6);

  // Knob settings
  &::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 6px;
    width: 19px;
    height: 19px;
    background-color: ${({ theme }) => theme.primaryColor};
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.4), 
                inset 0 2px 2px rgba(7, 3, 3, 0.3), 
                inset 0 -4px 2px rgba(0, 0, 0, 0.6);
    border: 1px solid black;
    border-radius: 50%;
    transition: 0.3s ease;
  }

  // State when toggled off
  &:not(:checked) {
    opacity: 0.8;
  }

  // State changes when toggled on
  &:checked {
    background-color: ${({ theme }) => theme.tertiaryColor};
    &::after {
      left: calc(100% - 27px);
      opacity: 1;
    }
  }

  // Hover effect
  &:hover {
    transform: scale(1.02);
  }
`;

export const StyledTextH3 = styled.h3`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);   

  ${media.mobile`
    font-size: 1.6rem;
  `}

  ${media.desktop`

  `}
`;

export const StyledTextH4 = styled.h4`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);

  ${media.mobile`
    font-size: 1.2rem;
  `}

  ${media.desktop`

  `}
`;