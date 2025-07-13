import React, { useContext, useEffect, useRef } from "react";
import styled from 'styled-components';
import Plot from 'react-plotly.js';
import { useMediaQuery } from 'react-responsive';

import TopicAnalysis from "./TopicAnalysis.jsx";
import Wordcloud from "./Wordcloud.jsx";

import { ThemeContext } from "../../context/ThemeContext";

import { StyledGrid, StyledDataBox, StyledBodyText, StyledInfoButton, StyledSVG, StyledPlotContainer, StyledTopicButton, StyledWordcloudButton } from './AuthorAnalysis.styles';

function Dashboard({data, functional}) {
  const { theme } = useContext(ThemeContext);

  const {	
    showData,
    reportData,
    predictedAuthorsPlotData,
    fleschVsLexicalPlotData,
    wordTypesPlotData,
    wordcloudUrl
  } = data

  const {	
    toggleTopicGraph,
    toggleWordcloud,
    hoverText,
    handleHoverText,
    authorExpanded,
    predictionExpanded,
    selectedAuthor,
    showTopicGraph,
    showWordcloud
  } = functional

  // Plot configs
  const mobileLayout = useMediaQuery({ maxWidth: 768 });
  const predictedAuthorsPlotLayout = {
    title: {
      text: "Predicted Authors",
      font: {
        color: theme.textColor,
        size: mobileLayout ? 16 : 20
      },
      x: 0.5,
      y: 0.91,
      xanchor: "center",
      yanchor: "bottom",
    },
    xaxis: {
      title: {
        text: "",
        font: {
          color: theme.textColor,
          size: mobileLayout ? 12 : 16
        },
        standoff: mobileLayout ? 10 : 16
      },
      ticks: "",
      tickfont: {
        color: theme.textColor,
        size: mobileLayout ? 12 : 14
      },
      ticklen: 10,
      autorange: "reversed",
      gridcolor: "rgba(36, 36, 36, 0.2)",
      gridwidth: 1,
      showline: true,
      showgrid: false,
      showticklabels: false
    },
    yaxis: {
      title: {
        text: "",
        font: {
          color: theme.textColor,
          size: mobileLayout ? 12 : 16
        },
        standoff: mobileLayout ? 0 : 10
      },
      tickfont: {
        color: theme.textColor,
        size: 14
      },
      ticklen: 10,
      gridcolor: "rgba(36, 36, 36, 0.2)",
      gridwidth: 1,
      showline: true,
      showgrid: false,
      showticklabels: false
    },
    paper_bgcolor: theme.primaryColor,
    plot_bgcolor: "white",
    hoverlabel: {
      font: {
        color: theme.textColor
      }
    },
    autosize: true,
    height: "100%",
    margin: mobileLayout ? {t: 45, b: 15, l: 15, r: 15} : {t: 70, b: 30, l: 30, r: 30},
    // Plot region border box
    shapes: [
      {
        type: "rect",
        x0: 0,
        y0: 0,
        x1: 1,
        y1: 1,
        xref: "paper",
        yref: "paper",
        line: {
          color: "black",
          width: 3
        }
      }
    ]
  };
  const fleschVsLexicalPlotLayout = {
    title: {
      text: mobileLayout ? "FK Readability vs Lexical Diversity" : "Flesch-Kincaid Readability vs Lexical Diversity",
      font: {
        color: theme.textColor,
        size: mobileLayout ? 16 : 20
      },
      x: 0.5,
      y: 0.91,
      xanchor: "center",
      yanchor: "bottom",
    },
    xaxis: {
      title: {
        text: "Flesch-Kincaid Readability Score",
        font: {
          color: theme.textColor,
          size: mobileLayout ? 14 : 16
        },
        standoff: mobileLayout ? 12 : 16
      },
      tickfont: {
        color: theme.textColor,
        size: 14
      },
      ticklen: mobileLayout ? 5 : 10,
      autorange: "reversed",
      gridcolor: "rgba(36, 36, 36, 0.2)",
      gridwidth: 1,
      showline: true
    },
    yaxis: {
      title: {
        text: "Lexical Diversity",
        font: {
          color: theme.textColor,
          size: mobileLayout ? 14 : 16
        },
        standoff: mobileLayout ? 5 : 10
      },
      tickfont: {
        color: theme.textColor,
        size: 14
      },
      ticklen: mobileLayout ? 5 : 10,
      gridcolor: "rgba(36, 36, 36, 0.2)",
      gridwidth: 1,
      showline: true
    },
    paper_bgcolor: theme.primaryColor,
    plot_bgcolor: "white",
    hoverlabel: {
      font: {
        color: theme.textColor
      }
    },
    autosize: true,
    height: "100%",
    margin: mobileLayout 
      ? {t: 45, b: 65, l: 60, r: 15} 
      : {t: 65, b: 90, l: 75, r: 35},
    // Plot region border box
    shapes: [
      {
        type: "rect",
        x0: 0,
        y0: 0,
        x1: 1,
        y1: 1,
        xref: "paper",
        yref: "paper",
        line: {
          color: "black",
          width: 3
        }
      }
    ]
  };
  const wordTypesPlotLayout = {
    legend: {
      x: 0,
      y: mobileLayout ? -0.3 : -0.25,
      xanchor: "left",
      yanchor: "bottom",
      font: {
        color: theme.textColor,
        size: mobileLayout ? 12 : 14
      }
    },
    hoverlabel: {
      font: {
        color: theme.textColor,
        size:  14
      }
    },
    paper_bgcolor: theme.primaryColor,
    autosize: true,
    margin: mobileLayout 
      ? {t: 0, b: 0, l: 10, r: 10} 
      : {t: 20, b: 40, l: 20, r: 20},
  };

  // Trigger window resize event to update Plotly plots
    // Workaround - function listed in documentation not working (likely due to grid and max-height transition)
  useEffect(() => { 
    window.dispatchEvent(new Event("resize"));
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 500);

    return () => clearTimeout(timeout);
  }, 
    [reportData, selectedAuthor, showTopicGraph, showWordcloud, hoverText, theme, authorExpanded, predictionExpanded]);

  return (
    <StyledGrid $showData={showData}>
      <StyledDataBox theme={theme} span="span 2" $mobileOrder="1">
        <StyledBodyText>
          Total Words: {reportData["metrics"]["total_words"]}
          <br/>
          Average Word Length: {reportData["metrics"]["average_word_length"]}
          <br/>
          Total Sentences: {reportData["metrics"]["total_sentences"]}
          <br/>
          Average Sentence Length: {reportData["metrics"]["average_sentence_length"]}
        </StyledBodyText>
      </StyledDataBox>

      <StyledDataBox theme={theme} $mobileOrder="2">
        <StyledBodyText>
          Tense: {reportData["metrics"]["tense"]}
          <br/>
          Person: {reportData["metrics"]["person"]}
          <br/>
          Voice: {reportData["metrics"]["voice"]}
        </StyledBodyText>
      </StyledDataBox>

      <StyledDataBox theme={theme} $hoverText={hoverText} $value="emotion" $mobileOrder="3">
          <StyledBodyText>
            Valence: {reportData["predicted_emotions"]["valence"]}
            <br/>
            Arousal: {reportData["predicted_emotions"]["arousal"]}
            <br/>
            Dominance: {reportData["predicted_emotions"]["dominance"]}
            <br/>
          </StyledBodyText>
          <StyledInfoButton theme={theme} value="emotion" onMouseOver={handleHoverText} onMouseLeave={handleHoverText}>
            <StyledSVG
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="-1 0 32 32" 
            >
              <path fill="none" stroke="black" strokeWidth="4px" strokeLinejoin="round" strokeLinecap="round" d="M12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7ZM11 9C10.4477 9 10 9.44772 10 10C10 10.5523 10.4477 11 11 11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V10C13 9.44772 12.5523 9 12 9H11Z"/>

              <path fill="white" d="M12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7ZM11 9C10.4477 9 10 9.44772 10 10C10 10.5523 10.4477 11 11 11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V10C13 9.44772 12.5523 9 12 9H11Z"/>
            </StyledSVG>
          </StyledInfoButton>
      </StyledDataBox>

      { 
        predictionExpanded &&
        <StyledPlotContainer $mobileOrder="5" $desktopColSpan="4" $mobileColSpan="3">
          <Plot
            data={[predictedAuthorsPlotData]}
            layout={predictedAuthorsPlotLayout}
            config={{ displayModeBar: false, responsive: true }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        </StyledPlotContainer>
      }

      <StyledDataBox theme={theme} $mobileOrder="4" span="span 2">
        <StyledBodyText>
          Flesch-Kincaid: {reportData["metrics"]["fk_score"]}
          <br/>
          Reading Level: {reportData["metrics"]["fk_grade"]}
          <br/>
          Lexical Diversity: {reportData["metrics"]["lexical_diversity"]}
        </StyledBodyText>
        <StyledInfoButton theme={theme} value="complexity" onMouseOver={handleHoverText} onMouseLeave={handleHoverText}>
            <StyledSVG
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="-1 0 32 32" 
            >
              <path fill="none" stroke="black" strokeWidth="4px" strokeLinejoin="round" strokeLinecap="round" d="M12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7ZM11 9C10.4477 9 10 9.44772 10 10C10 10.5523 10.4477 11 11 11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V10C13 9.44772 12.5523 9 12 9H11Z"/>

              <path fill="white" d="M12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7ZM11 9C10.4477 9 10 9.44772 10 10C10 10.5523 10.4477 11 11 11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V10C13 9.44772 12.5523 9 12 9H11Z"/>
            </StyledSVG>
          </StyledInfoButton>
      </StyledDataBox>

      <StyledTopicButton theme={theme} onClick={toggleTopicGraph} $mobileOrder="6">
        <StyledBodyText>
          Show Topic Graph
        </StyledBodyText>
      </StyledTopicButton>

      <StyledWordcloudButton src={wordcloudUrl || "images/Placeholder Wordcloud.png"} onClick={toggleWordcloud} $mobileOrder="9" $desktopColSpan="4" $mobileColSpan="3" $desktopRowSpan="3" $mobileRowSpan="2"/>

      <StyledPlotContainer theme={theme} $mobileOrder="7" $desktopColSpan="3" $mobileColSpan="3">
        <Plot
          data={[fleschVsLexicalPlotData]}
          layout={fleschVsLexicalPlotLayout}
          config={{ displayModeBar: false, responsive: true }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </StyledPlotContainer>

      <StyledPlotContainer theme={theme} $mobileOrder="8" $desktopColSpan="2" $mobileColSpan="2">
        <Plot
          data={[wordTypesPlotData]}
          layout={wordTypesPlotLayout}
          config={{ displayModeBar: false, responsive: true }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
        />
      </StyledPlotContainer>

    </StyledGrid>
  )
}

export default Dashboard