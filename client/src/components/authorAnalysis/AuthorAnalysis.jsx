import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Plot from 'react-plotly.js';

import { ThemeContext } from "../../context/ThemeContext.jsx";
import { StyledFlexboxContainer, StyledMainButton, StyledTextEntryFlexbox, StyledTextBox, StyledTextField, StyledIcon, StyledDataFlexbox, StyledDataBox } from './AuthorAnalysis.styles';

function AuthorAnalysis({ transition }) {
  const { theme } = useContext(ThemeContext);

  const [predictionText, setPredictionText] = useState("");
  const [predictionData, setPredictionData] = useState("");

  const [expanded, setExpanded] = useState(false);
  const [showData, setShowData] = useState(false);

  function toggleExpanded() {
    setExpanded(prev => !prev);
    if (expanded) {
      setShowData(false);
    }
  }

  function handleChange(e) {
    setPredictionText(e.target.value);
  };

  async function predict() {
    try {
      const requestData = {
        mode: "Author Analysis - BERT",
        text: predictionText
      }
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Tell Flask we're sending JSON
        },
        body: JSON.stringify(requestData) // Convert JS object to JSON string
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setPredictionData(data);
      setShowData(true);
    } catch (err) {
      console.error("Error sending request:", err);
    }
  }

  return (
    <StyledFlexboxContainer $transition={transition}>
      <StyledTextEntryFlexbox $showData={showData}>
        <StyledMainButton theme={theme} onClick={expanded ? undefined : toggleExpanded} $expanded={expanded}>
          <StyledIcon src="./icons/nextSong.svg" $width="40px" $expanded={expanded} onClick={predict}/>
          <StyledIcon src="./icons/return.svg" $width="46px" $expanded={expanded} onClick={toggleExpanded}/>
        </StyledMainButton>
        <StyledTextBox theme={theme} $expanded={expanded}>
          <StyledTextField theme={theme} value={predictionText} onChange={handleChange} placeholder="Enter your text here..."/>
        </StyledTextBox>
      </StyledTextEntryFlexbox>

      <StyledDataFlexbox $showData={showData}>
        <StyledDataBox theme={theme}>
          {predictionData["predicted_author"]}
        </StyledDataBox>
      </StyledDataFlexbox>
    </StyledFlexboxContainer>
  )
}

export default AuthorAnalysis