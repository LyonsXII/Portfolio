import { createContext, useState } from 'react';

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [autoplay, setAutoplay] = useState(false);
  const [autoNextQuestion, setAutoNextQuestion] = useState(false);
  const [autoNextQuestionDelay, setAutoNextQuestionDelay] = useState(3);
  const [skipVideo, setSkipVideo] = useState(false);

  function toggleAutoplay() {
    setAutoplay(prev => !prev);
  }

  function toggleAutoNextQuestion() {
    setAutoNextQuestion(prev => !prev);
  }

  function adjustAutoNextQuestionDelay(event) {
    setAutoNextQuestionDelay(event.target.value)
  }

  function toggleSkipVideo() {
    setSkipVideo(prev => !prev);
  }

  return (
    <SettingsContext.Provider value={{ autoplay, toggleAutoplay, autoNextQuestion, toggleAutoNextQuestion, autoNextQuestionDelay, adjustAutoNextQuestionDelay, skipVideo, toggleSkipVideo }}>
      {children}
    </SettingsContext.Provider>
  );

};

export{ SettingsProvider, SettingsContext }