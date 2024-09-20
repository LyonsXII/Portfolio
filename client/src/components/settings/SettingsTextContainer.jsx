import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledDiv = styled.div`
  height: 100%;
  min-height: 80px;
  width: 67%;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

function SettingsTextContainer({ children, ...props }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledDiv theme={theme}>
        {children}
      </StyledDiv>
  )
}

export default SettingsTextContainer