import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useMediaQuery } from 'react-responsive';

import ReturnButton from "../general/ReturnButton";
import LoadingIcon from "../general/LoadingIcon.jsx"
import MainButtons from "./MainButtons.jsx";
import Dashboard from "./Dashboard.jsx";
import TopicAnalysis from "./TopicAnalysis.jsx";
import Wordcloud from "./Wordcloud.jsx";

import { toolTipText } from "./toolTipText.js";

import { ThemeContext } from "../../context/ThemeContext.jsx";

import { StyledFlexboxContainer, StyledToolTip, StyledBackdrop, StyledBodyText } from './AuthorAnalysis.styles';

function AuthorAnalysis({ transition, home }) {
  const { theme } = useContext(ThemeContext);

  const [showData, setShowData] = useState(false);
  const [showAuthorData, setShowAuthorData] = useState(false);
  const [showTopicGraph, setShowTopicGraph] = useState(false);
  const [showWordcloud, setShowWordcloud] = useState(false);

  const [authorExpanded, setAuthorExpanded] = useState(false);
  const [predictionExpanded, setPredictionExpanded] = useState(false);

  const [predictionText, setPredictionText] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("Custom");
  const [hoverText, setHoverText] = useState({
    text: "",
    position: { x: 0, y: 0 }
  });

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
  const [topicAnalysisFile, setTopicAnalysisFile] = useState("");

  // Plot configs
  const mobileLayout = useMediaQuery({ maxWidth: 768 });
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
      size: mobileLayout ? 12 : 16
    },
    insidetextfont: {
      color: theme.textColor,
      size: mobileLayout ? 12 : 16
    },
    outsidetextfont: {
      color: theme.textColor,
      size: mobileLayout ? 12 : 16
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
    type: "pie",
    values: [1, 2],
    labels: ["Noun", "Adjective"],
    hoverinfo: 'skip',
    domain: { x: [0, 1], y: [0, 1] },
    hole: 0,
    textinfo: "percent",
    textfont: {
      size: mobileLayout ? 16 : 18, // Change font size
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
    // Currently setting based on window width
    // Ideally would want to align with container x position
    if (hoverText.text == "") {
      const rect = e.target.getBoundingClientRect();

      setHoverText({
        text: e.target.value,
        position: { x: (window.innerWidth / 2) - 400, y: rect.bottom + 126}
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

  async function fetch_topic_analysis() {
    try {
      const requestData = {
        author: selectedAuthor,
        text: predictionText
      }
      const response = await fetch("http://localhost:5002/topic_analysis", {
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
      const htmlText =  URL.createObjectURL(blob);
      setTopicAnalysisFile(htmlText)

    } catch(err) {
      console.error("Error sending request:", err);
    }
  }

  function handlePrediction() {
    setLoading(true);
    predict(predictionText)
    fetch_wordcloud("Custom", predictionText)
    fetch_topic_analysis();
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
    fetch_topic_analysis();
    update_marker_colours()
  }

  // Update data for plots when report data updated
  useEffect(() => {
    // Update prediction bar plot only if user making a prediction
    if (reportData.hasOwnProperty("predicted_authors")) {
      setPredictedAuthorsPlotData(prevData => ({
        ...prevData,
        x: reportData["predicted_authors"].slice(0, 5).map(([weight]) => weight),
        y: reportData["predicted_authors"].slice(0, 5).map(([weight, name]) => name),
        text: reportData["predicted_authors"].slice(0, 5).map(([weight, name]) => name),
        textposition: reportData["predicted_authors"].slice(0, 5).map(([weight, name]) => 
          weight > 0.50 ? "inside" : "outside"
      )
      }));

      function updateFleschVsLexicalPlotData() {
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
      updateFleschVsLexicalPlotData()
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
    <StyledFlexboxContainer $transition={transition}>
      <ReturnButton returnFunction={home}/>
      {loading && <LoadingIcon/>}

      {showTopicGraph && <TopicAnalysis toggleTopicGraph={toggleTopicGraph} topicAnalysisFile={topicAnalysisFile}/>}
      {showWordcloud && <Wordcloud toggleWordcloud={toggleWordcloud} src={wordcloudUrl}/>}

      {hoverText.text != "" && 
      <div>
          <StyledToolTip theme={theme} $hoverText={hoverText}>
            <StyledBodyText>
              {toolTipText[hoverText.text]}
            </StyledBodyText>
          </StyledToolTip>
        <StyledBackdrop/>
      </div>
      }

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
        }}
      />

      <Dashboard
        data={{
          showData,
          reportData,
          predictedAuthorsPlotData,
          fleschVsLexicalPlotData,
          wordTypesPlotData,
          wordcloudUrl
        }}
        functional={{
          toggleTopicGraph,
          toggleWordcloud,
          hoverText,
          handleHoverText,
          predictionExpanded,
          selectedAuthor,
          showTopicGraph,
          showWordcloud
        }}
      />
    </StyledFlexboxContainer>
  )
}

export default AuthorAnalysis