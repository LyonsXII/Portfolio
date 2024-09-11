import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import axios from "axios";

import SongGuesserButton from "./SongGuesserButton";

import { ThemeContext } from "../../../context/ThemeContext";

const StyledContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 88vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledGrid = styled.div`
  height: 20%;
  width: 80%;
  margin-top: 8vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  margin-left: ${props => props.position === "First" ? null : "4%"};
  gap: 20px;
`;

function SongGuesserGame(props) {
  const { theme } = useContext(ThemeContext);

  const [choices, setChoices] = useState([{}]);
  const [numQuestions, setNumQuestions] = useState(0);
  const [songInfo, setSongInfo] = useState([{}]);
  const [excluded, setExcluded] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const [songFilePath, setSongFilePath] = useState("");
  const [pipelineAudioFile, setPipelineAudioFile] = useState(null);
  const audioRef = React.useRef(null);
  const [videoURL, setVideoURL] = useState("https://www.youtube.com/watch?v=7U7BDn-gU18");

  // Fetch number of possible questions for category from database
  async function getNumQuestions() {
    const postData = {"category": props.category, "difficulty": props.difficulty};
    const response = await axios.post('http://localhost:5000/numQuestions', postData);
    setNumQuestions(response.data[0]["count"]);
    console.log("Number of questions: ", response.data[0]["count"]);
  }

  // Fetch options from database
  async function fetchData() {
    function shuffle(array) {
      // Fisher-Yates shuffle algorithm
      var m = array.length, t, i;

      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    }

    try {
      // Post request to backend
      if (excluded == [undefined]) {
        const choicesPostData = {"category": props.category, "difficulty": props.difficulty, "excluded": []};
      }
      const choicesPostData = {"category": props.category, "difficulty": props.difficulty, "excluded": excluded};
      const response = await axios.post('http://localhost:5000/choices', choicesPostData);

      // Setting retrieved data
      const data = response.data[0];
      setVideoURL(data.video_link);
      setSongFilePath(data.location);
      setExcluded((prev) => [...prev, data.id]);
      setSongInfo({id: data.id, property: data.property, song_name: data.song_name, difficulty: data.difficulty});
      const shuffledChoices = shuffle(response.data);
      setChoices(shuffledChoices);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {fetchData()}, []);

  function test() {
    getNumQuestions();
    fetchData();
  }

  return (
    <StyledContainer>
      <h1 onClick={test}>Guess the song...</h1>
      <StyledGrid>
        {choices.map((choice, index) => {
          return <SongGuesserButton key={index} index={index} id={choice.id} name={choice.property} correct={choice.correct} showAnswer={showAnswer} columns="span 6" rows="span 6"/>
        })}
      </StyledGrid>
    </StyledContainer>
  )
}

export default SongGuesserGame