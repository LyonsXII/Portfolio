import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Plot from 'react-plotly.js';

import TopicAnalysis from "./TopicAnalysis.jsx";
import Wordcloud from "./Wordcloud.jsx";

import { ThemeContext } from "../../context/ThemeContext.jsx";

import { StyledFlexboxContainer, StyledButtonsFlexbox, StyledTextEntryFlexbox, StyledMainButton, StyledTextBox, StyledTextField, StyledIcon, StyledGrid, StyledDataBox, StyledPlotContainer, StyledIFrame, StyledWordcloud, StyledTopicButton, StyledBodyText } from './AuthorAnalysis.styles';

function AuthorAnalysis({ transition }) {
  const { theme } = useContext(ThemeContext);
  const [ chartFontSize, setChartFontSize ] = useState("16");

  const [expanded, setExpanded] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showAuthorData, setShowAuthorData] = useState(false);
  const [showTopicGraph, setShowTopicGraph] = useState(false);
  const [showWordcloud, setShowWordcloud] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const [predictionText, setPredictionText] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("Robert Jordan")
  const [reportData, setReportData] = useState({
    predicted_authors: [[0.5, "Example 1"], [0.3, "Example 2"], [0.1, "Example 3"], [0.05, "Example 4"], [0.05, "Example 5"]],
    predicted_emotions: {
      valence: 3,
      arousal: 3,
      dominance: 3
    },
    metrics: {
    "total_words": 0,
    "total_sentences": 0,
    "total_syllables": 0,
    "fk_score": 0,
    "fk_grade": "Professional",
    "average_word_length": 0,
    "average_sentence_length": 0,
    "lexical_diversity": 0,
    "tense": "past",
    "person": "third",
    "voice": "passive"
    },
    wordcloud: "images/Placeholder Wordcloud.png"
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
      color: theme.textColor,
      size: chartFontSize
    },
    insidetextfont: {
      color: theme.textColor,
      size: chartFontSize
    },
    outsidetextfont: {
      color: theme.textColor,
      size: chartFontSize
    },
    text: ["Example 1", "Example 2", "Example 3", "Example 4", "Example 5"],
    textposition: ["inside", "inside", "outside", "outside", "outside"],
    hoverinfo: 'none',
    autosize: true
  });

  function toggleExpanded() {
    setExpanded(prev => !prev);
    if (expanded) {
      setShowData(false);
    }
  }

  function handleChange(e) {
    setPredictionText(e.target.value);
  };

  function toggleTopicGraph() {
    setShowTopicGraph(prev => !prev);
  }

  function toggleWordcloud() {
    setShowWordcloud(prev => !prev);
  }

  function updateLayout() {
    const width = window.innerWidth;
    let fontSize;
    if (width < 768) {
      fontSize = "30";
    } else {
      fontSize = "30";
    }
    setChartFontSize(fontSize);
  };

  async function predict() {
    try {
      const requestData = {
        text: predictionText
      }
      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      data["wordcloud"] = `data:image/png;base64,${data["wordcloud"]}`
      setReportData(data);
      setShowData(true);
    } catch (err) {
      console.error("Error sending request:", err);
    }
  }

  async function fetch_author_report(author) {
    try {
      const requestData = {
        author: selectedAuthor
      }
      const response = await fetch("http://localhost:5001/read_author_report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data[0]);
      // setReportData(data[0]);
      // setShowAuthorData(true);
    } catch(err) {
      console.error("Error sending request:", err);
    }
  }

  // Update plot data when predictions come in from backend
  useEffect(() => {
    if (reportData.hasOwnProperty("predicted_authors")) {
      setPredictedAuthorsPlotData(prevData => ({
        ...prevData,
        x: reportData["predicted_authors"].slice(0, 5).map(([weight]) => weight),
        y: reportData["predicted_authors"].slice(0, 5).map(([weight, name]) => name),
        text: reportData["predicted_authors"].slice(0, 5).map(([weight, name]) => name),
        textposition: reportData["predicted_authors"].slice(0, 5).map(([weight, name]) => 
          weight > 0.15 ? "inside" : "outside"
      )
      }));
    }
  }, [reportData]);

  useEffect(() => {
    updateLayout(); // Initial layout update
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return (
    <div>
      {showTopicGraph && <TopicAnalysis toggleTopicGraph={toggleTopicGraph}/>}
      {showWordcloud && <Wordcloud toggleWordcloud={toggleWordcloud} src={reportData["wordcloud"]}/>}

    <StyledFlexboxContainer $transition={transition}>
      <StyledButtonsFlexbox>
        <StyledMainButton theme={theme} onClick={fetch_author_report}>
          <StyledIcon src="./icons/book.svg" $width="72px" $expanded={expanded} $main={true}/>
          <StyledIcon src="./icons/nextSong.svg" $width="40px" $expanded={expanded} onClick={predict}/>
          <StyledIcon src="./icons/return.svg" $width="46px" $expanded={expanded} onClick={toggleExpanded}/>
        </StyledMainButton>

        <StyledTextEntryFlexbox $showData={showData} $expanded={expanded}>
          <StyledMainButton theme={theme} onClick={expanded ? undefined : toggleExpanded} $expanded={expanded}>
            <StyledIcon src="./icons/book.svg" $width="72px" $expanded={expanded} $main={true}/>
            <StyledIcon src="./icons/nextSong.svg" $width="40px" $expanded={expanded} onClick={predict}/>
            <StyledIcon src="./icons/return.svg" $width="46px" $expanded={expanded} onClick={toggleExpanded}/>
          </StyledMainButton>
          <StyledTextBox theme={theme} $expanded={expanded}>
            <StyledTextField theme={theme} value={predictionText} onChange={handleChange} placeholder="Enter your text here..."/>
          </StyledTextBox>
        </StyledTextEntryFlexbox>
      </StyledButtonsFlexbox>

      <StyledGrid $showData={showData}>
        <StyledDataBox theme={theme} span="span 2">
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

        <StyledDataBox theme={theme}>
          <StyledBodyText>
            Tense: {reportData["metrics"]["tense"]}
            <br/>
            Person: {reportData["metrics"]["person"]}
            <br/>
            Voice: {reportData["metrics"]["voice"]}
          </StyledBodyText>
        </StyledDataBox>

        <StyledDataBox theme={theme}>
            <StyledBodyText>
              Valence: {reportData["predicted_emotions"]["valence"]}
              <br/>
              Arousal: {reportData["predicted_emotions"]["arousal"]}
              <br/>
              Dominance: {reportData["predicted_emotions"]["dominance"]}
              <br/>
            </StyledBodyText>
        </StyledDataBox>

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

        <StyledDataBox theme={theme} span="span 2">
          <StyledBodyText>
            Flesch-Kincaid: {reportData["metrics"]["fk_score"]}
            <br/>
            Reading Level: {reportData["metrics"]["fk_grade"]}
            <br/>
            Lexical Diversity: {reportData["metrics"]["lexical_diversity"]}
          </StyledBodyText>
        </StyledDataBox>

        <StyledTopicButton theme={theme} onClick={toggleTopicGraph}>
          <StyledBodyText>
            Show Topic Graph
          </StyledBodyText>
        </StyledTopicButton>

        <StyledWordcloud src={reportData["wordcloud"]} onClick={toggleWordcloud}/>
      </StyledGrid>
    </StyledFlexboxContainer>
    </div>
  )
}

export default AuthorAnalysis