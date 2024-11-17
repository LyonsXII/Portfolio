import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { slideInTopAnimation, slideOutBottomAnimation } from '../../context/Animations';

const StyledFlexContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 60px;

  animation: ${({ $animationState }) => 
    $animationState === "Enter" 
      ? slideInTopAnimation
      : slideOutBottomAnimation
  };
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

  const [animationState, setAnimationState] = useState("Enter");

  return (
    <StyledFlexContainer $animationState={animationState}>
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