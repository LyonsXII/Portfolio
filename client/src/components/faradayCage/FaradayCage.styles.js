import { styled, css } from 'styled-components';

import { media } from '../../context/media';

import { slideInTopAnimation, slideOutRightAnimation } from '../../context/Animations';

import PlusIcon from "../../icons/plus.svg?react";
import PlusIconMobile from "../../icons/plusMobile.svg?react";
import MinusIcon from "../../icons/minus.svg?react";
import MinusIconMobile from "../../icons/minusMobile.svg?react";

export const StyledFlexboxContainer = styled.div`
  position: relative;
  height: 100dvh;
  width: 100dvw;
  display: flex;
  align-items: center;
  gap: 20px;
  box-sizing: border-box;

  animation: ${({ $transition } ) => !$transition ? slideInTopAnimation : slideOutRightAnimation};

  ${media.mobile`
    flex-direction: column;
    justify-content: center;
    padding-top: 100px;
    padding-bottom: 20px;
  `}

  ${media.desktop`
    justify-content: space-evenly;
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
    height: calc(50% - 10px);
    max-height: 300px;
    width: auto;
    max-width: calc(100% - 40px);
  `}

  ${media.desktop`
    flex-grow: 1;
    height: auto;
    min-height: 500px;
    max-height: 70dvh;
    min-width: 500px;
    max-width: 80dvh;
    margin-left: 40px;
  `}
`;

export const StyledButtonContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.mobile`
    height: calc(50% - 10px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 10px;
    max-height: 300px;
    width: calc(100% - 40px);
    max-width: 400px;
    margin-bottom: 20px;
  `}

  ${media.desktop`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    max-height: 90dvh;
    margin-right: 130px;
  `}
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.mobile`
    padding: 0px 10px;
  `}

  ${media.desktop`
    gap: 10px;
  `}
`

export const StyledRowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  ${media.mobile`
    flex-direction: column-reverse;
  `}

  ${media.desktop`
    gap: 20px;
  `}
`;

export const StyledButton = styled.button`
  word-wrap: break-word;
  white-space: normal;
  border: 4px solid black;
  border-radius: 20px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 6px 6px rgba(0, 0, 0, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.3), 
          inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  cursor: pointer;

  ${media.mobile`
    width: 100%;
    padding: 10px;
  `}

  ${media.desktop`
    width: auto;
    padding: 15px 30px;

    &:hover {
      background-color: ${({ theme }) => theme.secondaryColor};
      color: ${({ theme }) => theme.tertiaryColor};
      transform: scale(1.01);
      transition: transform 0.2s ease, background-color 0.8s ease;
    }
  `}
`;

export const StyledIncrementButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  border: 4px solid black;
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 6px 6px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -2px 2px rgba(0, 0, 0, 0.6);
  cursor: pointer;

  ${media.mobile`
    height: 20px;
    width: 100%;
    border-radius: ${({ $position }) => $position === "top" ? "0px 0px 20px 20px" : "20px 20px 0px 0px"};
    border-top: ${({ $position }) => $position === "top" ? "none" : "4px solid black"};
    border-bottom: ${({ $position }) => $position === "top" ? "4px solid black" : "none"};
    z-index: 2;
  `}

  ${media.desktop`
    height: 60px;
    width: 60px;
    border-radius: 40px;

    &:hover {
      background-color: ${({ theme }) => theme.secondaryColor};
      color: ${({ theme }) => theme.tertiaryColor};
      transform: scale(1.01);
      transition: transform 0.1s ease, background-color 0.8s ease;
    }
  `}
`;

export const StyledTextBox = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.textColor};
  border: 4px solid black;
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4);
  white-space: normal;
  word-wrap: break-word;
  box-sizing: border-box;

  ${media.mobile`
    align-items: stretch;
    height: 100%;
    width: 100%;

    ${({ $standalone, theme }) =>
      $standalone && css`
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 10px;
      background-color: ${theme.primaryColor};
      border-radius: 20px;
      box-shadow: 4px 6px 6px rgba(0, 0, 0, 0.4),
                  inset 0 2px 4px rgba(255, 255, 255, 0.3), 
                  inset 0 -2px 2px rgba(0, 0, 0, 0.6);
    `}
  `}

  ${media.desktop`
    flex-direction: column;
    align-items: center;
    min-width: 140px;
    border-radius: 20px;

    ${({ $standalone, theme }) =>
      $standalone && css`
      flex-direction: column;
      gap: 20px;
      padding: 15px;
      background-color: ${theme.primaryColor};
      border-radius: 20px;
      box-shadow: 4px 6px 6px rgba(0, 0, 0, 0.4),
                  inset 0 2px 4px rgba(255, 255, 255, 0.3), 
                  inset 0 -2px 2px rgba(0, 0, 0, 0.6);
    `}
  `}
`

export const StyledTextBoxDivider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $colour, theme }) => $colour === "main" ? theme.primaryColor : theme.secondaryColor};
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;

  ${media.mobile`
    flex-grow: ${({ $grow }) => $grow ? "1" : "0"};
    min-width:  ${({ $grow }) => $grow ? "0px" : "50px"};
    padding: 10px;
    border-left: ${({ $divider }) => $divider ? "4px solid black" : "none"};
  `}

  ${media.desktop`
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    padding: 15px;
    border-top: ${({ $divider }) => $divider ? "4px solid black" : "none"};
    border-radius: ${({ $position }) => $position === "first" ? "20px 20px 0px 0px" : "0px 0px 20px 20px"};
  `}
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
    font-size: 3rem;
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
    font-size: 1.1rem;
  `}

  ${media.desktop`
    font-size: 1.5rem;
  `}
`;

const createStyledIcon = (IconComponent) => styled(IconComponent)`
  ${media.mobile`
    display: ${({ $display }) => $display === "mobile" ? "block" : "none"};
    height: 13px;
    width: fit-content;
  `}

  ${media.desktop`
    display: ${({ $display }) => $display === "desktop" ? "block" : "none"};
    height: 50px;
    width: 100%;
  `}
`;

export const StyledPlusIcon = createStyledIcon(PlusIcon);
export const StyledPlusIconMobile = createStyledIcon(PlusIconMobile);
export const StyledMinusIcon = createStyledIcon(MinusIcon);
export const StyledMinusIconMobile = createStyledIcon(MinusIconMobile);