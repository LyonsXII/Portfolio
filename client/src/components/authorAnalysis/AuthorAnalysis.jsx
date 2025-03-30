import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Plot from 'react-plotly.js';

import MainButtons from "./MainButtons.jsx";
import TopicAnalysis from "./TopicAnalysis.jsx";
import Wordcloud from "./Wordcloud.jsx";
import LoadingIcon from "../general/LoadingIcon.jsx"

import { toolTipText } from "./toolTipText.js";

import { ThemeContext } from "../../context/ThemeContext.jsx";

import { StyledFlexboxContainer, StyledButtonsFlexbox, StyledTextEntryFlexbox, StyledMainButton, StyledTextBox, StyledTextField, StyledAuthorButtonContainer, StyledAuthorButton, StyledIcon, StyledSVG, StyledGrid, StyledDataBox, StyledInfoButton, StyledToolTipWrapper, StyledToolTip, StyledBackdrop, StyledPlotContainer, StyledIFrame, StyledWordcloud, StyledTopicButton, StyledBodyText, StyledButtonText } from './AuthorAnalysis.styles';

function AuthorAnalysis({ transition }) {
  const { theme } = useContext(ThemeContext);

  const [showData, setShowData] = useState(false);
  const [showAuthorData, setShowAuthorData] = useState(false);
  const [showTopicGraph, setShowTopicGraph] = useState(false);
  const [showWordcloud, setShowWordcloud] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [hoverText, setHoverText] = useState({
    text: "",
    position: { x: 0, y: 0 }
  });

  const [predictionExpanded, setPredictionExpanded] = useState(false);
  const [authorExpanded, setAuthorExpanded] = useState(false);

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
    "voice": "passive",
    "word_types": {"Adjectives": 5, "Nouns": 3}
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
      size: 16
    },
    insidetextfont: {
      color: theme.textColor,
      size: 16
    },
    outsidetextfont: {
      color: theme.textColor,
      size: 16
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
  const [wordTypesPlotData, setWordTypesPlotData] = useState({
    values: [1, 2],
    labels: ["Noun", "Adjective"],
    type: "pie",
    hole: 0,
    textinfo: "percent",
    textfont: {
      size: 18, // Change font size
      color: theme.textColor, // Change font color
    },
    marker: {
      line: {
        color: "black",
        width: 3
      }
    },
    autosize: true
  })

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setPredictionText(e.target.value);
  };

  function handleHoverText(e) {
    if (hoverText.text == "") {
      const rect = e.target.getBoundingClientRect();
      setHoverText({
        text: e.target.value,
        position: { x: rect.right / 2, y: rect.top / 2},
      });
    } else {
      setHoverText({
        text: "",
        position: { x: 0, y: 0 }
      });
    }

  }

  function changeSelectedAuthor(author) {
    setSelectedAuthor(author);
  }

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

  function toggleTopicGraph() {
    setShowTopicGraph(prev => !prev);
  }

  function toggleWordcloud() {
    setShowWordcloud(prev => !prev);
  }

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
    function update_marker_colours(){
      let marker_colours = Array(authorList.length).fill("rgba(218, 49, 40, 0.6)");
      marker_colours = authorList.map((author) => {
        return author == selectedAuthor ? "rgba(40, 218, 94, 0.6)" : "rgba(218, 49, 40, 0.6)"
      })

      setFleschVsLexicalPlotData(prevData => ({
        ...prevData,
        marker: {
          ...prevData.marker,
          color: marker_colours
        }
      }))
    }

    fetch_author_report();
    fetch_wordcloud();
    update_marker_colours()
  }

  // Update plot data when report data updated (prediction or selected author)
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

    // Flesch Kincaid vs lexical diversity plot
    // If there's a previous prediction then replace it with the new marker from the new prediction metrics
    let marker_colours = Array(authorList.length).fill("rgba(218, 49, 40, 0.6)");
    marker_colours.push("rgba(40, 218, 94, 0.6)");
    if (authorList.length == fleschVsLexicalPlotData["text"].length) {
      setFleschVsLexicalPlotData(prevData => ({
        ...prevData,
        x: [...prevData.x, reportData["metrics"]["fk_score"]],
        y: [...prevData.y, reportData["metrics"]["lexical_diversity"]],
        text: [...prevData.text, "Your Text"],
        marker: {
          ...prevData.marker,
          color: marker_colours
        }
      }))

    } else {
      // Flesch Kincaid vs lexical diversity plot
      // If no previous prediction add prediction metrics as new marker to plot
      setFleschVsLexicalPlotData(prevData => ({
        ...prevData,
        x: [...prevData.x.slice(0, -1), reportData["metrics"]["fk_score"]],
        y: [...prevData.y.slice(0, -1), reportData["metrics"]["lexical_diversity"]],
        text: [...prevData.text, "Your Text"],
        marker: {
          ...prevData.marker,
          color: marker_colours
        }
      }))
    }
    }

    // Update pie chart
    let word_types = Object.keys(reportData["metrics"]["word_types"]);
    let word_type_counts = Object.values(reportData["metrics"]["word_types"]);

    setWordTypesPlotData(prevData => ({
      ...prevData,
      values: word_type_counts,
      labels: word_types
    }))

  }, [reportData]);

  // Resize plots to correct size on load
  useEffect(() => {
    const plotElement = document.getElementById("fleschVsLexicalPlot");
    if (plotElement) {
      Plotly.Plots.resize(plotElement);
    }
  }, [reportData]);

  // Retrieve author report data from backend on page load and update plot
  useEffect(() => {
    async function list_authors() {
      try {
        const response = await fetch("http://localhost:5001/author_details", {
          method: "GET"
        });
    
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        setAuthorList(data["authors"]);
        setFleschVsLexicalPlotData(prevData => ({
          ...prevData,
          x: data["fk_score"],
          y: data["lexical_diversity"],
          text: data["authors"]
        }
        ));
      } catch(err) {
        console.error("Fetch error:", err);
      }
    }

    list_authors();
  }, []);

  return (
    <div>
      {showTopicGraph && <TopicAnalysis toggleTopicGraph={toggleTopicGraph}/>}
      {showWordcloud && <Wordcloud toggleWordcloud={toggleWordcloud} src={wordcloudUrl}/>}
      {loading && <LoadingIcon/>}
      {hoverText.text != "" && 
      <div>
        <StyledToolTipWrapper>
          <StyledToolTip theme={theme} $hoverText={hoverText}>
            <StyledBodyText>
              {toolTipText[hoverText.text]}
            </StyledBodyText>
          </StyledToolTip>
        </StyledToolTipWrapper>
        <StyledBackdrop/>
      </div>
      }

      <StyledFlexboxContainer $transition={transition}>
        <MainButtons 
          showData={showData} 
          authorProps={{
            authorList,
            selectedAuthor,
            changeSelectedAuthor,
            authorExpanded,
            toggleAuthorExpanded,
            handleAuthorReport
          }}
          predictionProps={{
            predictionExpanded,
            togglePredictionExpanded,
            handleChange,
            handlePrediction,
            predictionText
          }}/>

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

          <StyledDataBox theme={theme} $hoverText={hoverText} $value="emotion">
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
              id="fleschVsLexicalPlot"
              data={[fleschVsLexicalPlotData]}
              layout={{
                title: {
                  text: "Flesch-Kincaid Readability vs Lexical Diversity",
                  font: {
                    color: theme.textColor,
                    size: 20
                  },
                  x: 0.5, // Title horizontal position
                  y: 0.91, // Title vertical position (increase for more space)
                  xanchor: "center", // Align title horizontally
                  yanchor: "bottom", // Align title vertically
                },
                xaxis: {
                  title: {
                    text: "Flesch-Kincaid Readability Score",
                    font: {
                      color: theme.textColor,
                      size: 16
                    },
                    standoff: 16
                  },
                  tickfont: {
                    color: theme.textColor,
                    size: 14
                  },
                  ticklen: 10,
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
                      size: 16
                    },
                    standoff: 10
                  },
                  tickfont: {
                    color: theme.textColor,
                    size: 14
                  },
                  ticklen: 10,
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
                margin: {
                  t: 65,
                  b: 90,
                  l: 75,
                  r: 35
                },
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
              }}
              config={{ displayModeBar: false, responsive: true }}
              useResizeHandler={true}
              style={{ width: '100%', height: '100%' }}
            />
          </StyledPlotContainer>

          <StyledPlotContainer span="span 2">
            <Plot
              id="wordTypesPlot"
              data={[wordTypesPlotData]}
              layout={{
                title: {
                  text: ""
                }, 
                legend: {
                  x: 0,
                  y: -0.25,
                  xanchor: "left",
                  yanchor: "bottom",
                  font: {
                    color: theme.textColor,
                    size: 14
                  }
                },
                hoverlabel: {
                  font: {
                    color: theme.textColor,
                    size: 14
                  }
                },
                paper_bgcolor: theme.primaryColor,
                autosize: true,
                height: "100%",
                margin: {
                  t: 20,
                  b: 40,
                  l: 20,
                  r: 20
                },
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