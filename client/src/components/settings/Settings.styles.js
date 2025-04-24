import styled from 'styled-components';

import { media } from '../../context/media';

import { slideInRightSettingsAnimation, slideOutRightSettingsAnimation, notchSlideLeftAnimation, notchSlideRightAnimation } from '../../context/Animations';

export const StyledNotchContainer = styled.div`
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  border: 4px solid black;
  position: absolute;
  z-index: 3;
  cursor: pointer;

  ${media.mobile`
    display: none;
    height: 100px;
    width: 20px
    border-bottom: none;
    border-radius: 20px 0px 0px 20px;
    position: absolute;
    bottom: 0px;
  `}

  ${media.desktop`
    height: 100px;
    width: 20px;
    border-radius: 20px 0px 0px 20px;
    border-right: none;
    position: absolute;
    top: calc(50% - 50px);
    right: 0px;
  `}

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
  }

  animation: ${({ $animationState }) => 
    $animationState === "Enter" 
      ? notchSlideLeftAnimation : 
      $animationState === "Exit" 
      ? notchSlideRightAnimation :
      "none"
  };
`;

export const StyledSettingsContainer = styled.div`
  position: absolute;
  top: 0px;
  right: -84px;
  color: ${({ theme }) => theme.textColor};
  height: 100vh;
  z-index: 2;

  ${media.mobile`
    display: none;
  `}

  ${media.desktop`
    display: flex;
    justify-content: flex-end;
  `}

  animation: ${({ $animationState }) => 
    $animationState === "Enter" 
      ? slideInRightSettingsAnimation : 
      $animationState === "Exit" 
      ? slideOutRightSettingsAnimation :
      "none"
  };
`;

export const StyledHoverTextContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 2;
  pointer-events: none;
`;

export const StyledButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 4px solid black;
  z-index: 2;
`;

export const StyledSettingsButton = styled.div`
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryColor};
  border-top: ${({ $position }) => $position === "Top" ? "none" : "4px solid black"};
  border-bottom: ${({ $position }) => $position === "Bottom" ? "none" : "4px solid black"};
  margin-top: -4px;
  box-sizing: border-box;
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.3), 
            inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.3), 
            inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  }
`;

export const StyledSVG = styled.img`
  height: 70px;
  width: 70px;
`

export const StyledSettingsText = styled.div`
  height: 80px;
  width: fit-content;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.secondaryColor};
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.3), 
          inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  visibility: ${({ $curr, $text }) => $curr === $text ? "visible" : "hidden"};
  margin-top: -4px;
  border-left: 4px solid black;
  border-right: none;
  border-top: ${({ $position }) => $position === "Top" ? "none" : "4px solid black"};
  border-bottom: ${({ $position }) => $position === "Bottom" ? "none" : "4px solid black"};
  box-sizing: border-box;
  border-radius: ${({ $position }) => 
    $position === "Top" ? "0px 0px 0px 20px" : 
    $position === "Bottom" ? "20px 0px 0px 0px" :
    "20px 0px 0px 20px"};
`;

export const StyledSpacer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  width: 100%;
  background-color: ${({ theme, $background }) => $background === "true" ? theme.secondaryColor : "none"};
`;

export const StyledSettingsMenuBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 1;
  opacity: 0.8;
  display: ${({ $settingsMenuHidden }) => $settingsMenuHidden === true ? "none" : "inline"};
`;

export const StyledSettingsMenuFlexbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: ${({ $settingsMenuHidden }) => $settingsMenuHidden === true ? "none" : "flex"};
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const StyledSettingsMenuHeader = styled.div`
  height: 10vh;
  width: 100%;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 20px 20px 0px 0px;
  border-bottom: 4px solid black;
  z-index: 4;
  display: ${({ $settingsMenuHidden }) => $settingsMenuHidden === true ? "none" : "flex"};
  justify-self: center;
  align-self: flex-start;
  box-sizing: border-box;
`;

export const StyledSettingsMenuContainer = styled.div`
  height: 50vh;
  width: fit-content;
  min-width: 70vw;
  background-color: ${({ theme }) => theme.primaryColor};
  border: 4px solid black;
  border-radius: 20px;
  z-index: 3;
  display: ${({ $settingsMenuHidden }) => $settingsMenuHidden === true ? "none" : "flex"};
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
`;

export const StyledSettingsMenuTextContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 0px 0px 20px 20px;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
`;

export const StyledSettingsMenuSectionFlexbox= styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  box-sizing: border-box;
`;

export const StyledSettingsMenuSectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: ${({ $width }) => $width || "25%"};
  gap: 40px;
`;

export const SettingsMenuSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  min-width: 80px;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  border-radius: 20px;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);

  &:hover {
    opacity: 1;
  }

  //Webkit browsers
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: ${({ theme }) => theme.primaryColor};
    cursor: pointer;
  }

  //Firefox
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: ${({ theme }) => theme.primaryColor};
    border: 4px solid black;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4),
                inset 0 2px 4px rgba(7, 3, 3, 0.3), 
                inset 0 -2px 2px rgba(0, 0, 0, 0.6);
  }

  // Custom thumb styling for internet explorer and edge
  &::-ms-thumb {
    width: 25px;
    height: 25px;
    background: ${({ theme }) => theme.primaryColor};
    cursor: pointer;
  }
`;

export const SettingsMenuCheckbox = styled.input`
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

export const StyledH4 = styled.h4`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);   
`;

export const StyledSettingsMenuHeadingText = styled.h3`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 2rem;
`;

export const StyledSettingsMenuBodyText = styled.p`
  flex-grow: 1;
  text-align: right;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 1.5rem;
`;