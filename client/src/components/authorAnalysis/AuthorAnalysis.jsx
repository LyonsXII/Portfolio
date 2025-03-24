import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Plot from 'react-plotly.js';

import TopicAnalysis from "./TopicAnalysis.jsx";
import Wordcloud from "./Wordcloud.jsx";
import LoadingIcon from "../general/LoadingIcon.jsx"

import { ThemeContext } from "../../context/ThemeContext.jsx";

import { StyledFlexboxContainer, StyledButtonsFlexbox, StyledTextEntryFlexbox, StyledMainButton, StyledTextBox, StyledTextField, StyledAuthorButtonContainer, StyledAuthorButton, StyledIcon, StyledGrid, StyledDataBox, StyledPlotContainer, StyledIFrame, StyledWordcloud, StyledTopicButton, StyledBodyText, StyledButtonText } from './AuthorAnalysis.styles';

function AuthorAnalysis({ transition }) {
  const { theme } = useContext(ThemeContext);
  const [ chartFontSize, setChartFontSize ] = useState("16");

  const [predictionExpanded, setPredictionExpanded] = useState(false);
  const [authorExpanded, setAuthorExpanded] = useState(false);
  const [authorExpandedButtonAnimation, setAuthorExpandedButtonAnimation] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showAuthorData, setShowAuthorData] = useState(false);
  const [showTopicGraph, setShowTopicGraph] = useState(false);
  const [showWordcloud, setShowWordcloud] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const [predictionText, setPredictionText] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("Custom");

  const [authorList, setAuthorList] = useState(["Robert Jordan"]);
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
    }
  });
  const [wordcloudUrl, setWordcloudUrl] = useState("");
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
  const [fleschVsLexicalPlotData, setFleschVsLexicalPlotData] = useState({
    x: [70, 50, 85, 40, 60],
    y: [0.65, 0.75, 0.58, 0.80, 0.70],
    text: ["Author A", "Author B", "Author C", "Author D", "Author E"],
    hoverinfo: "text",
    mode: "markers",
    marker: {
      size: 10,
      color: ["red", "blue", "green", "purple", "orange"],
    },
    type: "scatter",
    autosize: true
  });

  const [loading, setLoading] = useState(false);

  function togglePredictionExpanded() {
    if (predictionExpanded) {
      setShowData(false);
    } else {
      setSelectedAuthor("Custom")
    }

    if (authorExpanded) {
      setAuthorExpanded(false);
      setShowData(false);
      setSelectedAuthor("Custom");
    }

    setPredictionExpanded(prev => !prev);
  }

  function toggleAuthorExpanded() {
    if (authorExpanded) {
      setShowData(false);
    } else {
      setPredictionText("")
    }

    if (predictionExpanded) {
      setPredictionExpanded(false);
      setShowData(false);
    }

    setAuthorExpanded(prev => !prev);
  }

  function handleChange(e) {
    setPredictionText(e.target.value);
  };

  function changeSelectedAuthor(author) {
    setSelectedAuthor(author);
  }

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
      setReportData(data);
      setShowData(true);
      setLoading(false);

    } catch (err) {
      console.error("Error sending request:", err);
    }
  }

  async function fetch_author_report() {
    try {
      const requestData = {
        author: selectedAuthor
      }
      const response = await fetch("http://localhost:5001/author_report", {
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
      setReportData(data);
      setShowData(true);
      setShowAuthorData(true);

    } catch(err) {
      console.error("Error sending request:", err);
    }
  }

  async function fetch_wordcloud() {
    try {
      const requestData = {
        author: selectedAuthor,
        text: predictionText
      }
      const response = await fetch("http://localhost:5001/wordcloud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const blob = await response.blob();
      const wordcloudUrl = URL.createObjectURL(blob)
      setWordcloudUrl(wordcloudUrl)

    } catch(err) {
      console.error("Error sending request:", err);
    }
  }

  function handlePrediction() {
    setLoading(true);
    predict(predictionText)
    fetch_wordcloud("Custom", predictionText)
  }

  async function handleAuthorReport() {
    fetch_author_report();
    fetch_wordcloud();
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

  // Change plot fontsize when window size changes
  useEffect(() => {
    updateLayout(); // Initial layout update
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Retrieve list of authors from backend on page load
  useEffect(() => {
    async function list_authors() {
      try {
        const response = await fetch("http://localhost:5001/list_authors", {
          method: "GET"
        });
    
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        setAuthorList(data);
      } catch(err) {
        setError(err.message);
      }
    }

    list_authors();
  }, []);

  // Trigger button entrance for author expanded once box fully expanded
  useEffect(() => {
    if (authorExpanded) {
      setTimeout(() => {
        setAuthorExpandedButtonAnimation(true);
      }, 600);
    } else {
      setAuthorExpandedButtonAnimation(false);
    }
  }, [authorExpanded]);

  return (
    <div>
      {showTopicGraph && <TopicAnalysis toggleTopicGraph={toggleTopicGraph}/>}
      {showWordcloud && <Wordcloud toggleWordcloud={toggleWordcloud} src={wordcloudUrl}/>}
      {loading && <LoadingIcon/>}

      <StyledFlexboxContainer $transition={transition}>
        <StyledButtonsFlexbox $showData={showData}>
          <StyledTextEntryFlexbox $showData={showData} $expanded={authorExpanded}>
            <StyledMainButton theme={theme} onClick={authorExpanded ? undefined : toggleAuthorExpanded} $expanded={authorExpanded}>
              <StyledIcon src="./icons/book.svg" $width="72px" $expanded={authorExpanded} $main={true}/>
              <StyledIcon src="./icons/nextSong.svg" $width="40px" $expanded={authorExpanded} onClick={handleAuthorReport}/>
              <StyledIcon src="./icons/return.svg" $width="46px" $expanded={authorExpanded} onClick={toggleAuthorExpanded}/>
            </StyledMainButton>
            <StyledAuthorButtonContainer theme={theme} $expanded={authorExpanded}>
              {authorList.map((author, index) => {
                  return (
                    <StyledAuthorButton theme={theme} key={index} $value={author} $selectedAuthor={selectedAuthor} $authorExpandedButtonAnimation={authorExpandedButtonAnimation} onClick={() => changeSelectedAuthor(author)}>
                      <StyledButtonText>{author}</StyledButtonText>
                    </StyledAuthorButton>
                  )
              })}
            </StyledAuthorButtonContainer>
          </StyledTextEntryFlexbox>

          <StyledTextEntryFlexbox $showData={showData} $expanded={predictionExpanded}>
            <StyledMainButton theme={theme} onClick={predictionExpanded ? undefined : togglePredictionExpanded} $expanded={predictionExpanded}>
              <StyledIcon src="./icons/book.svg" $width="72px" $expanded={predictionExpanded} $main={true}/>
              <StyledIcon src="./icons/nextSong.svg" $width="40px" $expanded={predictionExpanded} onClick={handlePrediction}/>
              <StyledIcon src="./icons/return.svg" $width="46px" $expanded={predictionExpanded} onClick={togglePredictionExpanded}/>
            </StyledMainButton>
            <StyledTextBox theme={theme} $expanded={predictionExpanded}>
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

          { 
            predictionExpanded &&
            <StyledPlotContainer span="span 2">
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
          }

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

          <StyledWordcloud src={wordcloudUrl} onClick={toggleWordcloud}/>

          <StyledPlotContainer span="span 3">
              <Plot 
                data={[fleschVsLexicalPlotData]}
                layout={{
                  title: {
                    text: "Flesch-Kincaid Readability vs Lexical Diversity",
                    font: {
                      color: theme.textColor,
                      size: 22
                    }
                  },
                  xaxis: {
                    title: {
                      text: "Flesch-Kincaid Readability Score",
                      font: {
                        color: theme.textColor,
                        size: 16
                      }
                    }
                  },
                  yaxis: {
                    title: {
                      text: "Lexical Diversity",
                      font: {
                        color: theme.textColor,
                        size: 16
                      }
                    }
                  },
                  paper_bgcolor: theme.secondaryColor,
                  plot_bgcolor: theme.secondaryColor,
                  autosize: true,
                  height: "100%"
                }}
                config={{ displayModeBar: false, responsive: true }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
              />
            </StyledPlotContainer>
        </StyledGrid>
      </StyledFlexboxContainer>

    </div>
  )
}

export default AuthorAnalysis