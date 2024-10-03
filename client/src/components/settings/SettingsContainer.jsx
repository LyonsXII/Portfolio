import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledDiv = styled.div`
  color: ${({ theme }) => theme.textColor};
  height: 100vh;
  width: 12vw;
  display: ${({ $settingsHidden }) => ($settingsHidden ? "none" : "flex")};
  justify-content: flex-end;
`;

function SettingsContainer({ children, settingsHidden }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledDiv theme={theme} $settingsHidden={settingsHidden}>
        {children}
      </StyledDiv>
  )
}

export default SettingsContainer