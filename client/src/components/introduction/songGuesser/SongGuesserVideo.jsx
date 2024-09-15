import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../../context/ThemeContext";

const StyledContainer = styled.div`
  height: 50%;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.primaryColor};
  border-radius: 20px;
  box-shadow: 0px 0px 10px black;
`;

const StyledDivLeft = styled.div`
  height: 100%;
  width: calc(100% + 4px);
  border: 4px solid black;
  border-right: none;
  border-radius: 20px 0px 0px 20px;
`;

const StyledIframe = styled.iframe`
  border: none;
  border-radius: 16px 0px 0px 16px;
  width: 100%;
  height: calc(100% + 0.5px); // Avoids subpixel gap, something to do with subpixel rendering?
  margin-top: 0px;
`;

const StyledDivRight = styled.div`
  height: 100%;
  width: 6%;
  border: 4px solid black;
  border-radius: 0px 20px 20px 0px;
`;

const StyledButton = styled.button`
  height: 50%;
  width: 100%;
  border-bottom: ${props => props.position === "Top" ? "4px solid black" : null};
  border-radius: ${props => props.position === "Top" ? "0px 20px 0px 0px" : "0px 0px 20px 0px"};
  background-color: ${props => props.theme.secondaryColor};
`;

function SongGuesserVideo(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledContainer theme={theme}>
      <StyledDivLeft>
        <StyledIframe src={props.url}/>
      </StyledDivLeft>
      <StyledDivRight>
        <StyledButton theme={theme} position="Top" onClick={props.nextQuestion}/>
        <StyledButton theme={theme} position="Bottom" onClick={props.replaySong}/>
      </StyledDivRight>
    </StyledContainer>
  )
}

export default SongGuesserVideo