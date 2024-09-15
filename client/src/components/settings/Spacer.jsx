import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  width: 100%;
  background-color: ${(props) => props.background === "true" ? props.theme.primaryColor : "none"};
`;

function Spacer({ children, ...props }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledDiv theme={theme} background={props.background}>
        {children}
      </StyledDiv>
  )
}

export default Spacer