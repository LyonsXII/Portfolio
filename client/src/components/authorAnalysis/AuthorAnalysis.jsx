import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Plot from 'react-plotly.js';

import { ThemeContext } from "../../context/ThemeContext.jsx";
import { StyledFlexboxContainer, StyledMainButton, StyledTextEntryFlexbox, StyledTextBox, StyledTextField } from './AuthorAnalysis.styles';

function AuthorAnalysis({ transition }) {
  const { theme } = useContext(ThemeContext);

  const [requestData, setRequestData] = useState({
    mode: "Author Analysis - BERT",
    text: "He is born again! I feel him! The Dragon takes his first breath on the slopes of Dragonmount! He is coming! He is coming! Light help us! Light help the world! He lies in the snow and cries like the thunder! He burns like the sun!"
  })
  const [predictionData, setPredictionData] = useState({});

  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded(prev => !prev);
  }

  async function predict() {
    try {
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
    } catch (err) {
      console.error("Error sending request:", err);
    }
  }

  return (
    <StyledFlexboxContainer $transition={transition}>
      <StyledTextEntryFlexbox>
        <StyledMainButton theme={theme} onClick={toggleExpanded} $expanded={expanded}/>
        <StyledTextBox theme={theme} $expanded={expanded}>
          <StyledTextField theme={theme} placeholder="Enter your text here..."/>
        </StyledTextBox>
      </StyledTextEntryFlexbox>
    </StyledFlexboxContainer>
  )
}

export default AuthorAnalysis