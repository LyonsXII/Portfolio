import styled from 'styled-components';

import { media } from '../../context/media';

import { slideInRightSettingsAnimation, slideOutRightSettingsAnimation, notchSlideLeftAnimation, notchSlideRightAnimation } from '../../context/Animations';

export const StyledNotchContainer = styled.div`
  background-color: ${({ theme }) => theme.primaryColor};
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
    border-right: none;
    border-radius: 20px 0px 0px 20px;
    position: absolute;
    top: calc(50% - 50px);
    right: 0px;
  `}

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
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
  right: -80px;
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
  min-height: 76px;
  width: 76px;
  min-width: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 4px solid black;
  z-index: 2;
`;

export const StyledSettingsButton = styled.div`
  height: auto;
  min-height: 76px;
  width: 100%;
  min-width: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryColor};
  border-top: ${({ type }) => type === "Lower" ? "4px solid black" : "none"};
  border-bottom: ${({ type }) => type === "Lower" ? "none" : "4px solid black"};
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.secondaryColor};
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