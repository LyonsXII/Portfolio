import React, { useState, useEffect, useContext, useRef } from "react";
import styled from 'styled-components';
import axios from "axios";

import SongGuesserScore from "./SongGuesserScore";
import SongGuesserChoice from "./SongGuesserChoice";
import SongGuesserVideo from "./SongGuesserVideo";

import { StyledGameFlexboxContainer, StyledGameContainer, StyledMainTitle, StyledChoiceGrid, StyledTextBox, StyledIcon } from "./SongGuesser.styles";

import { AudioContext } from "../../context/AudioContext";
import { SettingsContext } from "../../context/SettingsContext";

function SongGuesserGame({ category, difficulty, mode, setGameOver, handleGameOver }) {
  const { volume, clickSound, victorySound, defeatSound } = useContext(AudioContext);
  const { autoplay, autoNextQuestion } = useContext(SettingsContext);

  const [choices, setChoices] = useState([{}]);
  const [numQuestions, setNumQuestions] = useState(0);
  const [songInfo, setSongInfo] = useState([{}]);
  const [excluded, setExcluded] = useState([]); 
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [songFilePath, setSongFilePath] = useState("");
  const [song, setSong] = useState(null);
  const audioRef = useRef(null);
  const [videoURL, setVideoURL] = useState("");

  const [userClickedNext, setUserClickedNext] = useState(false);
  const nextQuestionTimeoutRef = useRef(null);

  // Fetch number of possible questions for category from database
  async function getNumQuestions() {
    try {
      const postData = {"category": category, "difficulty": difficulty};
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
      if (excluded.length === 0) {
        const choicesPostData = {"category": category, "difficulty": difficulty, "excluded": []};
      }
      const choicesPostData = {"category": category, "difficulty": difficulty, "excluded": excluded};
      const response = await axios.post('http://localhost:5000/choices', choicesPostData);

      // Setting retrieved data
      const data = response.data[0];
      if (songFilePath !== data.location) {
        setVideoURL(data.video_link);
        setSongFilePath(data.location);
        setExcluded((prev) => {
          if (!prev.includes(data.id)) {
            return [...prev, data.id]
          }
          return prev
        });
        setSongInfo({id: data.id, property: data.property, song_name: data.song_name, difficulty: data.difficulty});
        const shuffledChoices = shuffle(response.data);
        setChoices(shuffledChoices);
      }

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
    if (songFilePath) {
      try{
        const audio = await getAudio();
        const url = URL.createObjectURL(audio);
        setSong(url);
      } catch(error) {
        console.error('Error fetching the audio file:', error);
      }
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
    // Clear any existing autoNextQuestion timeout before automatically moving to the next question
    if (nextQuestionTimeoutRef.current) {
      clearTimeout(nextQuestionTimeoutRef.current);
      nextQuestionTimeoutRef.current = null;
    }
    clickSound();
    fetchData();
    setShowAnswer(false);
    setUserClickedNext(false);
  }

  function nextQuestionButton() {
    // Clear autoNextQuestion timeout if user clicked next button themselves
    if (nextQuestionTimeoutRef.current) {
      clearTimeout(nextQuestionTimeoutRef.current);
      nextQuestionTimeoutRef.current = null;
    }
    setUserClickedNext(true);
    nextQuestion();
  }

  function handleAnswer(correct) {
    clickSound();
    if (correct) {
      victorySound();
      setScore(prevScore => prevScore + 1);
    } else {
      defeatSound();
      if (mode === "Sudden Death") {setGameOver(true)}
    }
    setShowAnswer(true);
    audioRef.current.pause();

    if (correct && autoNextQuestion && mode != "Sudden Death") {
      if (!userClickedNext) {
        nextQuestionTimeoutRef.current = setTimeout(() => {
          nextQuestion();
          setUserClickedNext(false);
        }, 3000);
      }
    }
  }

  // Fetch first set of questions on component load
  useEffect(() => {fetchData()}, []);
  // Set current song whenever new set of choices is fetched
  useEffect(() => {updateSong()}, [songFilePath]);
  // Automatically play next song if autoplay toggled on in settings
  useEffect(() => {
    if (autoplay) {setTimeout(() => {playSong()}, 500)}
  }, [song]);
  // Update volume of audio playback when volume updated
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  return (
    <StyledGameFlexboxContainer>
      <audio ref={audioRef} src={song}/>
      {mode === "Regular" && <SongGuesserScore score={score}/>}
      <StyledGameContainer>
        {showAnswer === false ? 
          <StyledTextBox>
            <StyledMainTitle>Guess the song...</StyledMainTitle>
            <StyledIcon
              viewBox="-100 -60 720 600" 
              xmlns="http://www.w3.org/2000/svg"
              strokeColor="black"
              fillColor="antiquewhite"
              onClick={() => playSong()}>

              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="25" result="blur" />
                  <feOffset dx="0" dy="0" result="offsetBlur" />
                  <feFlood floodColor="rgba(0, 0, 0, 0.4)" />
                  <feComposite in2="offsetBlur" operator="in" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode />
                    <feMergeNode />
                    <feMergeNode />
                    <feMergeNode />
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g filter="url(#shadow)">
              <path 
                fill="#ededed"
                stroke="black"
                strokeWidth="20px"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M97.38,292.692V181.229c0-24.324,19.792-44.125,44.134-44.125h170.733v19.506 c0,5.525,3.065,10.59,7.941,13.162c4.884,2.59,10.786,2.229,15.343-0.885l100.888-69.057c3.607-2.475,5.771-6.557,5.788-10.934 c0.015-4.377-2.124-8.49-5.722-10.965L335.63,7.956c-4.548-3.146-10.483-3.508-15.383-0.949c-4.91,2.557-7.975,7.653-7.975,13.178 v19.539H141.515C63.483,39.724,0,103.208,0,181.229v111.463c0,26.881,21.801,48.684,48.689,48.684 C75.58,341.376,97.38,319.573,97.38,292.692z"/>

              <path 
                fill="#ededed"
                stroke="black"
                strokeWidth="20px"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M442.199,149.513c-26.891,0-48.691,21.801-48.691,48.701V309.64c0,24.342-19.793,44.143-44.134,44.143 H178.641v-19.506c0-5.523-3.065-10.588-7.941-13.162c-4.884-2.572-10.786-2.23-15.343,0.887L54.468,391.056 c-3.606,2.477-5.771,6.572-5.786,10.951c-0.017,4.359,2.122,8.475,5.72,10.965l100.856,69.961 c4.548,3.147,10.482,3.504,15.384,0.965c4.908-2.572,7.974-7.654,7.974-13.195v-19.539h170.756 c78.031,0,141.516-63.498,141.516-141.523V198.214C490.89,171.313,469.088,149.513,442.199,149.513z"/>

              <path 
                fill="none"
                d="M97.38,292.692V181.229c0-24.324,19.792-44.125,44.134-44.125h170.733v19.506 c0,5.525,3.065,10.59,7.941,13.162c4.884,2.59,10.786,2.229,15.343-0.885l100.888-69.057c3.607-2.475,5.771-6.557,5.788-10.934 c0.015-4.377-2.124-8.49-5.722-10.965L335.63,7.956c-4.548-3.146-10.483-3.508-15.383-0.949c-4.91,2.557-7.975,7.653-7.975,13.178 v19.539H141.515C63.483,39.724,0,103.208,0,181.229v111.463c0,26.881,21.801,48.684,48.689,48.684 C75.58,341.376,97.38,319.573,97.38,292.692z"/>

              <path 
                fill="none"
                d="M442.199,149.513c-26.891,0-48.691,21.801-48.691,48.701V309.64c0,24.342-19.793,44.143-44.134,44.143 H178.641v-19.506c0-5.523-3.065-10.588-7.941-13.162c-4.884-2.572-10.786-2.23-15.343,0.887L54.468,391.056 c-3.606,2.477-5.771,6.572-5.786,10.951c-0.017,4.359,2.122,8.475,5.72,10.965l100.856,69.961 c4.548,3.147,10.482,3.504,15.384,0.965c4.908-2.572,7.974-7.654,7.974-13.195v-19.539h170.756 c78.031,0,141.516-63.498,141.516-141.523V198.214C490.89,171.313,469.088,149.513,442.199,149.513z"/>
              </g>
            </StyledIcon>
          </StyledTextBox> 
          : <SongGuesserVideo url={videoURL} nextQuestionButton={nextQuestionButton} playSong={playSong} name={songInfo.song_name} property={songInfo.property}/>
        }

        <StyledChoiceGrid>
          {choices.map((choice, index) => {
            return <SongGuesserChoice key={index} index={index} id={choice.id} name={choice.property} correct={choice.correct} showAnswer={showAnswer} onClick={handleAnswer}/>
          })}
        </StyledChoiceGrid>
      </StyledGameContainer>
    </StyledGameFlexboxContainer>
  )
}

export default SongGuesserGame