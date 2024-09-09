import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledFlexContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 60px;
`;

const StyledImage = styled.div`
  height: 400px;
  width: 80%;
  border: 4px solid black;
  border-radius: 20px;
  margin-top: 30px;
`;

function IntroText(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledFlexContainer>
      <h2>{props.title}</h2>
      <StyledImage />
      <h4 style={{marginTop: "40px", paddingLeft: "40px",}}>
        {props.textA}
          <br />
          <br />
        {props.textB}
      </h4>
    </StyledFlexContainer>
  )
}

export default IntroText