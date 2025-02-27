import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Plot from 'react-plotly.js';

import { ThemeContext } from "../../context/ThemeContext.jsx";
import { StyledFlexboxContainer, StyledMainButton, StyledTextEntryFlexbox, StyledTextBox, StyledTextField, StyledIcon, StyledFlexbox, StyledDataBox, StyledPlotContainer, StyledIFrame, StyledBodyText } from './AuthorAnalysis.styles';

function AuthorAnalysis({ transition }) {
  const { theme } = useContext(ThemeContext);

  const [predictionText, setPredictionText] = useState("");
  const [predictionData, setPredictionData] = useState({
    predicted_author: "Example 1",
    author_weights: [[0.5, "Example 1"], [0.3, "Example 2"], [0.1, "Example 3"], [0.05, "Example 4"], [0.05, "Example 5"]]
  });

  const [predictedAuthorsPlotData, setPredictedAuthorsPlotData] = useState({
    x: [0.5, 0.3, 0.1, 0.05, 0.05],
    y: ["Example 1", "Example 2", "Example 3", "Example 4" ,"Example 5"],
    type: 'bar',
    orientation: 'h',
    marker: {
      color: theme.primaryColor,
      line: {
        color: "black",
        width: 2,
      },
    },
    textfont: {
      color: 'antiquewhite' // Default color if you don't specify inside/outside
    },
    insidetextfont: {
      color: 'antiquewhite' // Text color for labels drawn inside the bar
    },
    outsidetextfont: {
      color: 'antiquewhite' // Text color for labels drawn outside the bar
    },
    text: ["Example 1", "Example 2", "Example 3", "Example 4", "Example 5"],
    textposition: ["inside", "inside", "outside", "outside", "outside"],
    hoverinfo: 'none',
    autosize: true
  });

  // Update plot data when predictions come in from backend
  useEffect(() => {
    setPredictedAuthorsPlotData(prevData => ({
      ...prevData,
      x: predictionData["author_weights"].slice(0, 5).map(([weight]) => weight),
      y: predictionData["author_weights"].slice(0, 5).map(([weight, name]) => name),
      text: predictionData["author_weights"].slice(0, 5).map(([weight, name]) => name),
      textposition: predictionData["author_weights"].slice(0, 5).map(([weight, name]) => 
        weight > 0.15 ? "inside" : "outside"
    )
    }));
  }, [predictionData]);

  const [expanded, setExpanded] = useState(false);
  const [showData, setShowData] = useState(true);

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
          <StyledIcon src="./icons/book.svg" $width="72px" $expanded={expanded} $main={true}/>
          <StyledIcon src="./icons/nextSong.svg" $width="40px" $expanded={expanded} onClick={predict}/>
          <StyledIcon src="./icons/return.svg" $width="46px" $expanded={expanded} onClick={toggleExpanded}/>
        </StyledMainButton>
        <StyledTextBox theme={theme} $expanded={expanded}>
          <StyledTextField theme={theme} value={predictionText} onChange={handleChange} placeholder="Enter your text here..."/>
        </StyledTextBox>
      </StyledTextEntryFlexbox>

      <StyledFlexbox $showData={showData}>
        <StyledDataBox theme={theme}>
          <StyledBodyText>
            Predicted Author:
            <br/>
            {predictionData["predicted_author"]}
          </StyledBodyText>
        </StyledDataBox>
        {/* <StyledPlotContainer theme={theme}>
          <StyledIFrame src="/lda_vis.html" title="pyLDAvis Visualisation"/>
        </StyledPlotContainer> */}
        <StyledPlotContainer>
          <Plot 
            data={[predictedAuthorsPlotData]}
            layout={{
              xaxis: {
                title: "",
                showgrid: false,
                zeroline: false,
                showticklabels: false
              },
              yaxis: {
                title: "",
                showgrid: false,
                zeroline: false,
                showticklabels: false,
                type: 'category', 
                autorange: 'reversed'
              },
              margin: { t: 10, b: 10, l: 10, r: 10 },
              paper_bgcolor: theme.secondaryColor,
              plot_bgcolor: theme.secondaryColor
            }}
            config={{ displayModeBar: false, responsive: true }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        </StyledPlotContainer>
      </StyledFlexbox>
    </StyledFlexboxContainer>
  )
}

export default AuthorAnalysis