import React, { useState, useEffect, useContext, useRef } from "react";
import styled from 'styled-components';
import axios from "axios";

import SongGuesserScore from "./SongGuesserScore";
import SongGuesserChoice from "./SongGuesserChoice";
import SongGuesserVideo from "./SongGuesserVideo";

import { AudioContext } from "../../context/AudioContext";

const StyledFlexboxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
`;

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  margin-top: -2vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledChoiceGrid = styled.div`
  height: 20%;
  width: 80%;
  margin-top: ${props => props.showAnswer === true ? "0vh" : "8vh"};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  gap: 20px;
`;

function SongGuesserGame(props) {
  const { volume, clickSound, victorySound, defeatSound } = useContext(AudioContext);

  const [choices, setChoices] = useState([{}]);
  const [numQuestions, setNumQuestions] = useState(0);
  const [songInfo, setSongInfo] = useState([{}]);
  const [excluded, setExcluded] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const [songFilePath, setSongFilePath] = useState("");
  const [song, setSong] = useState("./music/misc/Click.mp3");
  const audioRef = useRef(null);
  const [videoURL, setVideoURL] = useState("https://www.youtube.com/watch?v=7U7BDn-gU18");

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
      setSong(url);
    } catch(error) {
      console.error('Error fetching the audio file:', error);
    }
  }

  function playSong() {
    if (audioRef.current.paused) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

  }

  // Game functionality
  function startGame() {
    setExcluded([]);
    nextQuestion();
  }

  function nextQuestion() {
    clickSound();
    fetchData();
    setShowAnswer(false);
  }

  function handleAnswer(correct) {
    console.log(correct);
    if (correct) {
      victorySound();
      setScore(prevScore => prevScore + 1);
    } else {
      defeatSound();
    }
    setShowAnswer(true);
    clickSound();
    audioRef.current.pause();
  }

  // Fetch first set of questions on component load
  useEffect(() => {fetchData()}, []);
  // Set current song whenever new set of choices is fetched
  useEffect(() => {updateSong()}, [songFilePath]);
  // Update volume of audio playback when volume updated
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  return (
    <StyledFlexboxContainer>
      <audio ref={audioRef} src={song}/>
      {props.mode === "Regular" && <SongGuesserScore score={score}/>}
      <StyledContainer>
        {showAnswer === false ? 
          <h1 onClick={() => playSong()}>Guess the song...</h1> : 
          <SongGuesserVideo url={videoURL} nextQuestion={nextQuestion} playSong={playSong}/>
        }

        <StyledChoiceGrid showAnswer={showAnswer}>
          {choices.map((choice, index) => {
            return <SongGuesserChoice key={index} index={index} id={choice.id} name={choice.property} correct={choice.correct} showAnswer={showAnswer} onClick={handleAnswer}/>
          })}
        </StyledChoiceGrid>
      </StyledContainer>
    </StyledFlexboxContainer>
  )
}

export default SongGuesserGame