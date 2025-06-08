import styled from 'styled-components';

import { media } from '../../context/media';

import { slideInRightSettingsAnimation, slideInBottomSettingsMobileAnimation, slideOutRightSettingsAnimation, slideOutBottomSettingsMobileAnimation, notchSlideLeftAnimation, notchSlideUpMobileAnimation, notchSlideRightAnimation, notchSlideDownMobileAnimation } from './SettingsAnimations';

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
    height: 20px;
    width: 100px;
    border-bottom: none;
    border-radius: 20px 20px 0px 0px;
    position: absolute;
    left: calc(50% - 50px);
    bottom: 0px;

    animation: ${({ $animationState }) => 
      $animationState === "Enter" 
        ? notchSlideUpMobileAnimation : 
        $animationState === "Exit" 
        ? notchSlideDownMobileAnimation :
        "none"
    };
  `}

  ${media.desktop`
    height: 100px;
    width: 20px;
    border-radius: 20px 0px 0px 20px;
    border-right: none;
    position: absolute;
    top: calc(50% - 50px);
    right: 0px;

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
  `}
`;

export const StyledSettingsContainer = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.textColor};
  z-index: 3;

  ${media.mobile`
    display: flex;
    justify-content: flex-start;
    bottom: -64px;
    left: 0px;
    width: 100vw;

    animation: ${({ $animationState }) => 
      $animationState === "Enter" 
        ? slideInBottomSettingsMobileAnimation 
        : $animationState === "Exit" 
        ? slideOutBottomSettingsMobileAnimation 
        : "none"
    };
  `}

  ${media.desktop`
    display: flex;
    justify-content: flex-end;
    top: 0px;
    right: -84px;
    height: 100vh;

    animation: ${({ $animationState }) => 
      $animationState === "Enter" 
        ? slideInRightSettingsAnimation : 
        $animationState === "Exit" 
        ? slideOutRightSettingsAnimation :
        "none"
    };
  `}
`;

export const StyledHoverTextContainer = styled.div`
  ${media.mobile`
    display: none;
  `}

  ${media.desktop`
    position: absolute;
    top: 0px;
    right: 80px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 2;
    pointer-events: none;
  `}
`;

export const StyledButtonContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 2;

  ${media.mobile`
    bottom: 0;
    left: 0;
    height: 60px;
    width: 100%;
    border-top: 4px solid black;
  `}

  ${media.desktop`
    flex-direction: column;
    top: 0;
    right: 0;
    height: 100%;
    width: 80px;
    border-left: 4px solid black;
  `}
`;

export const StyledLinkContainer = styled.a`
  ${media.mobile`
    order: ${({ $mobileOrder }) => $mobileOrder || 0};
  `}
`

export const StyledSettingsButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryColor};
  box-sizing: border-box;
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  cursor: pointer;

  ${media.mobile`
    display: ${({ $mobile }) => $mobile ? "flex" : "none"};
    height: 60px;
    width: 60px;
    border-left: ${({ $position }) => $position === "Top" ? "none" : "4px solid black"};
    border-right: ${({ $mobileEnd }) => $mobileEnd ? "4px solid black" : "none"};
  `}

  ${media.desktop`
    height: 80px;
    width: 80px;
    border-top: ${({ $position }) => $position === "Top" ? "none" : "4px solid black"};
    border-bottom: ${({ $position }) => $position === "Bottom" ? "none" : "4px solid black"};
    margin-top: -4px;

    &:hover {
      background-color: ${({ theme }) => theme.secondaryColor};
      box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
    }
  `}
`;

export const StyledSVG = styled.img`
  ${media.mobile`
    height: 50px;
    width: 50px;
  `}

  ${media.desktop`
    height: 70px;
    width: 70px;
  `}
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
  ${media.mobile`
    order: ${({ $mobileOrder }) => $mobileOrder || 0};
    flex-grow: 1;
    height: 100%;
    width: 100%;
    background-color: ${({ theme, $background }) => $background === "true" ? theme.secondaryColor : "none"};
  `}

  ${media.desktop`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
    width: 100%;
    background-color: ${({ theme, $background }) => $background === "true" ? theme.secondaryColor : "none"};
  `}
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

  box-sizing: border-box;

  ${media.mobile`
    align-items: flex-start;
  `}

  ${media.desktop`
    align-items: center;
  `}
`;

export const StyledSettingsMenuHeader = styled.div`
  display: ${({ $settingsMenuHidden }) => $settingsMenuHidden === true ? "none" : "flex"};
  justify-self: center;
  align-self: flex-start;
  width: 100%;
  border-radius: 20px 20px 0px 0px;
  box-sizing: border-box;
  z-index: 4;

  ${media.mobile`
    flex-wrap: wrap;
    gap: 4px;
    background-color: black; /* Used with gap to create pseudo border for interior edges */
    height: fit-content;
    min-height: 10vh;
    border-bottom: 4px solid black;
    overflow: hidden;
  `}

  ${media.desktop`
    height: 10vh;
    border-bottom: 4px solid black;
  `}
`;

export const StyledSettingsMenuHeaderElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: fit-content;
  white-space: nowrap;
  background-color: ${({ $value, $active, theme }) => $value === $active ? theme.secondaryColor : theme.primaryColor};
  // box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
  //             inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  cursor: pointer;

  ${media.mobile`
    width: 50%;
    padding: 10px;
  `}

  ${media.desktop`
    width: 100%;
    padding: 0px 20px;
    border-radius: ${({ $position }) => $position === "First" ? "16px 0px 0px 0px" :
    $position === "Last" ? "0px 16px 0px 0px" : "0px"};
    border-right: ${({ $position }) => $position === "Last" ? "none" : "4px solid black"};
  `}
`

export const StyledSettingsMenuContainer = styled.div`
  background-color: ${({ theme }) => theme.primaryColor};
  border: 4px solid black;
  border-radius: 20px;
  z-index: 3;
  display: ${({ $settingsMenuHidden }) => $settingsMenuHidden === true ? "none" : "flex"};
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;

  ${media.mobile`
    height: fit-content;
    min-height: calc(80vh - 64px);
    width: 80vw;
    margin-top: 64px;
  `}

  ${media.desktop`
    height: 50vh;
    width: fit-content;
    min-width: 70vw;
  `}
`;

export const StyledSettingsMenuTextContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 0px 0px 20px 20px;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;

  ${media.mobile`
    flex-grow: 1;
    padding: 20px 10px;
  `}

  ${media.desktop`
    padding: 30px;
  `}
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
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${media.mobile`
    gap: 20px;
    width: 100%;
    padding: 0px 10px;
  `}

  ${media.desktop`
    gap: 40px;
    width: ${({ $width }) => $width || "25%"};
  `}
`;

export const StyledSettingsMenuSliderWrapper = styled.div`
  position: relative;
  height: fit-content;
  width: 100%;
`

export const StyledSliderValue = styled.div`
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.primaryColor};
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 2;
`;

export const StyledSettingsMenuSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  min-width: 80px;
  height: 30px;
  background-color: ${({ theme }) => theme.tertiaryColor};
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  border-radius: 20px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 2px rgba(7, 3, 3, 0.3), 
              inset 0 -2px 2px rgba(0, 0, 0, 0.6);
  padding-inline: 6px;

  &:hover {
    opacity: 1;
  }

  //Webkit browsers
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 19px;
    height: 19px;
    background: ${({ theme }) => theme.primaryColor};
    border: 1px solid black;
    border-radius: 50%;
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.4), 
            inset 0 2px 2px rgba(7, 3, 3, 0.3), 
            inset 0 -4px 2px rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }

  //Firefox
  &::-moz-range-thumb {
    width: 19px;
    height: 19px;
    background: ${({ theme }) => theme.primaryColor};
    border: 1px solid black;
    border-radius: 50%;
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.4), 
            inset 0 2px 2px rgba(7, 3, 3, 0.3), 
            inset 0 -4px 2px rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }

  // Custom thumb styling for internet explorer and edge
  &::-ms-thumb {
    width: 19px;
    height: 19px;
    background: ${({ theme }) => theme.primaryColor};
    border: 1px solid black;
    border-radius: 50%;
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.4), 
            inset 0 2px 2px rgba(7, 3, 3, 0.3), 
            inset 0 -4px 2px rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
`;

export const StyledSettingsMenuCheckbox = styled.input`
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

export const StyledSettingsMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: fit-content;
  min-width: 140px;
  padding: 10px 20px;
  border: 4px solid black;
  border-radius: 40px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 4px 6px 6px rgba(0, 0, 0, 0.4),
        inset 0 2px 4px rgba(255, 255, 255, 0.3), 
        inset 0 -2px 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.tertiaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
    transform: scale(1.01);
    transition: transform 0.1s ease, background-color 0.8s ease;
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

  ${media.mobile`
    font-size: 1.4rem;
  `}

  ${media.desktop`
    font-size: 2rem;
  `}
`;

export const StyledSettingsMenuBodyText = styled.p`
  flex-grow: 1;
  text-align: ${({ $align }) => $align || "right"};
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
    font-size: 1.5rem;
  `}
`;