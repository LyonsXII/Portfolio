import { createContext, useState, useEffect } from 'react';

const AudioContext = createContext();

function AudioProvider({ children }) {
  const [volume, setVolume] = useState(40);

  const click = new Audio("./music/misc/Click.mp3");
  const victory = new Audio("./music/misc/Victory.mp3");
  const defeat = new Audio("./music/misc/Defeat.mp3");
  click.volume = volume / 100;
  victory.volume = volume / 100;
  defeat.volume = volume / 100;

  function changeVolume(event) {
    setVolume(event.target.value);
  }

  function clickSound() {
    click.play();
  }

  function victorySound() {
    victory.play();
  }

  function defeatSound() {
    defeat.play();
  }

  useEffect(() => {
    if (volume) {
      const modifiedVolume = volume / 100;
      click.volume = modifiedVolume;
      victory.volume = modifiedVolume;
      defeat.volume = modifiedVolume;
    }
  }, [volume]);

  return (
    <AudioContext.Provider value={{ volume, changeVolume, clickSound, victorySound, defeatSound }}>
      {children}
    </AudioContext.Provider>
  );

};

export{ AudioProvider, AudioContext }