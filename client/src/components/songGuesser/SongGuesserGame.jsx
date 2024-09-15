import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import axios from "axios";

import SongGuesserChoice from "./SongGuesserChoice";
import SongGuesserVideo from "./SongGuesserVideo";

import { ThemeContext } from "../../context/ThemeContext";

const StyledContainer = styled.div`
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
  const [song, setSong] = useState("./music/misc/Click.mp3");
  const [videoURL, setVideoURL] = useState("https://www.youtube.com/watch?v=7U7BDn-gU18");

  const click = new Audio("./music/misc/Click.mp3");

  // Fetch number of possible questions for category from database
  async function getNumQuestions() {
    try {
      const postData = {"category": props.category, "difficulty": props.difficulty};
      const response = await axios.post('http://localhost:5000/numQuestions', postData);
      setNumQuestions(response.data[0]["count"]);
    } catch(error) {
      console.error('Error fetching data:', error);
    }

  }

  // Fetch choices from database
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

  // Fetch mp3 file from backend
  async function getAudio() {
    const songPostData = {"location": songFilePath};
    const songData = await axios.post('http://localhost:5000/mp3', songPostData, {responseType: "blob"});
    return songData.data
  }

  // Set current song to correct choice
  async function updateSong() {
    try{
      const audio = await getAudio();
      const url = URL.createObjectURL(audio);
      const newSong = new Audio(url);
      setSong(newSong);
    } catch(error) {
      console.error('Error fetching the audio file:', error);
    }
  }

  function replaySong() {
    song.currentTime = 0;
    song.play();
  }

  function handleAnswer(correct) {
    if (correct) {

    } else {

    }
    setShowAnswer(true);
    click.play();
    song.pause();
  }

  function startGame() {
    setExcluded([]);
    nextQuestion();
  }

  function nextQuestion() {
    click.play();
    fetchData();
    setShowAnswer(false);
  }

  // Fetch first set of questions on component load
  useEffect(() => {fetchData()}, []);
  // Set current song whenever new set of choices is fetched
  useEffect(() => {updateSong()}, [songFilePath]);

  return (
    <StyledContainer>
      {showAnswer === false ? 
        <h1 onClick={()=>{song.play()}}>Guess the song...</h1> : 
        <SongGuesserVideo url={videoURL} nextQuestion={nextQuestion} replaySong={replaySong}/>
      }

      <StyledGrid>
        {choices.map((choice, index) => {
          return <SongGuesserChoice key={index} index={index} id={choice.id} name={choice.property} correct={choice.correct} showAnswer={showAnswer} onClick={handleAnswer} columns="span 6" rows="span 6"/>
        })}
      </StyledGrid>
    </StyledContainer>
  )
}

export default SongGuesserGame