import { createContext, useState } from 'react';

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [autoplay, setAutoplay] = useState(false);
  const [autoNextQuestion, setAutoNextQuestion] = useState(false);
  const [autoNextQuestionDelay, setAutoNextQuestionDelay] = useState(3);

  function toggleAutoplay() {
    setAutoplay(prev => !prev);
  }

  function toggleAutoNextQuestion() {
    setAutoNextQuestion(prev => !prev);
  }

  function adjustAutoNextQuestionDelay(event) {
    setAutoNextQuestionDelay(event.target.value)
  }

  return (
    <SettingsContext.Provider value={{ autoplay, toggleAutoplay, autoNextQuestion, toggleAutoNextQuestion, autoNextQuestionDelay, adjustAutoNextQuestionDelay }}>
      {children}
    </SettingsContext.Provider>
  );

};

export{ SettingsProvider, SettingsContext }