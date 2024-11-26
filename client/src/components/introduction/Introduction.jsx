import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import IntroButton from "./IntroButton";
import IntroTextInitial from "./IntroTextInitial";
import IntroText from "./IntroText";
import IntroGallery from "./IntroGallery";

import { text } from "./text";
import { StyledContentContainer, StyledButtonsContainer, StyledIntroContainer, StyledTitle, StyledMinorTitle, StyledGallery } from "./Introduction.styles";

function Introduction({ activateSongGuesser, activateFaradayCage }) {
  const [initial, setInitial] = useState(true);
  const [songGuesser, setSongGuesser] = useState(false);
  const [faraday, setFaraday] = useState(false);
  const [bookNotes, setBookNotes] = useState(false);
  const [current, setCurrent] = useState(0);

  // Animation states
  const [showSubTitle, setShowSubTitle] = useState(false);
  const [subTitleEntranceComplete, setSubTitleEntranceComplete] = useState(false);
  const [expandIntroText, setExpandIntroText] = useState(false);
  const [introBodyTextAnimationActive, setIntroBodyTextAnimationActive] = useState("none");
  const [galleryAnimationComplete, setGalleryAnimationComplete] = useState(false);

  // Section Data
  const sectionData = [
    { id: 1, title: "Song Guesser A", textA: text.songGuesserTextA, textB: text.songGuesserTextB, layout: "A" },
    { id: 2, title: "Song Guesser B", textA: text.songGuesserTextA, textB: text.songGuesserTextB, layout: "B" },
    { id: 3, title: "Song Guesser C", textA: text.songGuesserTextA, textB: text.songGuesserTextB, layout: "C" },
    { id: 4, title: "Faraday Cage A", textA: text.faradayCageTextA, textB: text.faradayCageTextB, layout: "A" },
    { id: 5, title: "Faraday Cage B", textA: text.faradayCageTextA, textB: text.faradayCageTextB, layout: "B" },
    { id: 6, title: "Faraday Cage C", textA: text.faradayCageTextA, textB: text.faradayCageTextB, layout: "C" },
    { id: 7, title: "Book Notes A", textA: text.bookNotesTextA, textB: text.bookNotesTextB, layout: "A" },
    { id: 8, title: "Book Notes B", textA: text.bookNotesTextA, textB: text.bookNotesTextB, layout: "B" },
    { id: 9, title: "Book Notes C", textA: text.bookNotesTextA, textB: text.bookNotesTextB, layout: "C" },
  ];

  function imageChoice(event) {
    const choice = Math.ceil(event.target.dataset.id / 3);
    const names = {
      1: "Song Guesser",
      2: "Faraday Cage",
      3: "Book Notes"
    }
    const functions = {
      1: setSongGuesser,
      2: setFaraday,
      3: setBookNotes
    }

    setTimeout(() => {
      event.target.dataset.id === current ? setInitial(true) : setInitial(false);
      Object.entries(functions).forEach(([key, func]) => {
        if (parseInt(key) === choice) {
          func(true); // Activate the matching state
        } else {
          func(false); // Deactivate all others
        }
      });
    }, 500)

    const currentChoice = Math.ceil(current / 3);
    if (currentChoice === choice) {
      setCurrent(0);
    } else {
      setCurrent(parseInt(event.target.dataset.id));
    }
    
  }

  function toggleShowSubTitle() {
    setShowSubTitle(true);
    setTimeout(() => {setSubTitleEntranceComplete(true)}, 1000);
  }

  function toggleExpandIntroText() {
    if (expandIntroText) {
      setTimeout(() => {setExpandIntroText(false)}, 1000);
      setIntroBodyTextAnimationActive("Exit");
      setTimeout(() => {setIntroBodyTextAnimationActive("none")}, 1000);
    } else {
      setExpandIntroText(true);
      setIntroBodyTextAnimationActive("Entrance");
      setTimeout(() => {setIntroBodyTextAnimationActive("none")}, 1000);
    }
  }

  // Time allowed insertion of subtitle to animation completion, avoids jarring title movement
  useEffect(() => {
    setTimeout(() => {setGalleryAnimationComplete(true)}, 1000)
  } 
  , []);

  return (
    <StyledContentContainer>
      <IntroTextInitial title="Portfolio" text={text.introText} current={current} showSubTitle={showSubTitle} subTitleEntranceComplete={subTitleEntranceComplete} expandIntroText={expandIntroText} introBodyTextAnimationActive={introBodyTextAnimationActive}/>
      {sectionData.map((section) => (
        <IntroText
          key={section.id}
          id={section.id}
          title={section.title}
          textA={section.textA}
          textB={section.textB}
          layout={section.layout}
          current={current}
        />
      ))}
      <IntroGallery imageChoice={imageChoice} toggleShowSubTitle={toggleShowSubTitle} galleryAnimationComplete={galleryAnimationComplete} toggleExpandIntroText={toggleExpandIntroText}/>
    </StyledContentContainer>
  )
}

export default Introduction