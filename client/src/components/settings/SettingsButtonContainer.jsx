import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledDiv = styled.div.attrs(({ settingsHidden }) => ({}))`
  height: 100%;
  min-height: 80px;
  width: 33%;
  min-width: 80px;
  display: ${({settingsHidden}) => !settingsHidden ? "flex" : "none"};
  flex-direction: column;
  align-items: center;
  border-left: 4px solid black;
  z-index: 2;
`;

function SettingsButtonContainer({ children, settingsHidden, toggleButtonsVisible }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledDiv theme={theme} settingsHidden={settingsHidden} onMouseOver={toggleButtonsVisible} onMouseLeave={toggleButtonsVisible}>
        {children}
      </StyledDiv>
  )
}

export default SettingsButtonContainer