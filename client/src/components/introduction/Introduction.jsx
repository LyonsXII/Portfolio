import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import IntroButton from "./IntroButton";
import IntroTextInitial from "./IntroTextInitial";
import IntroText from "./IntroText";
import IntroGallery from "./IntroGallery";

import { text } from "./text";
import { StyledContentContainer, StyledButtonsContainer, StyledIntroContainer, StyledTitle, StyledMinorTitle, StyledGallery } from "./Introduction.styles";

function Introduction({ home, activateSongGuesser, activateFaradayCage }) {
  const [initial, setInitial] = useState(true);
  const [current, setCurrent] = useState(0);
  const [tempCurrent, setTempCurrent] = useState(0);

  // Animation states
  const [showSubTitle, setShowSubTitle] = useState(false);
  const [subTitleEntranceComplete, setSubTitleEntranceComplete] = useState(false);
  const [expandIntroText, setExpandIntroText] = useState(false);
  const [introBodyTextAnimationActive, setIntroBodyTextAnimationActive] = useState("none");
  const [galleryAnimationComplete, setGalleryAnimationComplete] = useState(false);

  const sectionData = [
    { id: 1, title: "Song Guesser", textA: text.songGuesserTextA, textB: text.songGuesserTextB, layout: "A", imgA: "/images/Song Guesser - 001.jpg" },
    { id: 2, title: "Song Guesser", textA: text.songGuesserTextA, textB: text.songGuesserTextB, layout: "B", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 3, title: "Song Guesser", textA: text.songGuesserTextA, textB: text.songGuesserTextB, layout: "C", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 4, title: "Faraday Cage", textA: text.faradayCageTextA, textB: text.faradayCageTextB, layout: "A", imgA: "./images/Song Guesser - 002.jpg" },
    { id: 5, title: "Faraday Cage", textA: text.faradayCageTextA, textB: text.faradayCageTextB, layout: "B", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 6, title: "Faraday Cage", textA: text.faradayCageTextA, textB: text.faradayCageTextB, layout: "C", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 7, title: "Book Notes", textA: text.bookNotesTextA, textB: text.bookNotesTextB, layout: "A", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 8, title: "Book Notes", textA: text.bookNotesTextA, textB: text.bookNotesTextB, layout: "B", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 9, title: "Book Notes", textA: text.bookNotesTextA, textB: text.bookNotesTextB, layout: "C", imgA: "./images/Song Guesser - 001.jpg" },
  ];

  function imageChoice(event) {
    const choice = parseInt(event.target.dataset.id)

    if (choice === current) {
      setTempCurrent(0);
      setTimeout(() => {
        setCurrent(0);
      }, 500)
    } else {
      setTempCurrent(choice);
      setTimeout(() => {
        setCurrent(choice);
      }, 500)
    }
  }

  function changeSection(event) {
    switch(event.currentTarget.dataset.title) {
      case "Song Guesser":
        activateSongGuesser();
        break;
      case "Faraday Cage":
        activateFaradayCage();
        break;
      default:
        home();
    } 
  }

  function toggleShowSubTitle() {
    setShowSubTitle(true);
    setTimeout(() => {setSubTitleEntranceComplete(true)}, 1000);
  }

  function toggleExpandIntroText() {
    if (expandIntroText) {
      setTempCurrent(0);
      setTimeout(() => {
        setCurrent(0);
      }, 500)
      // Avoid end of body text exit animation during transition
      if (current === 0) {setTimeout(() => {setExpandIntroText(false)}, 1000)} 
      else {setTimeout(() => {setExpandIntroText(false)}, 500)}
      setIntroBodyTextAnimationActive("Exit");
      setTimeout(() => {setIntroBodyTextAnimationActive("none")}, 1000);
    } else {
      setExpandIntroText(true);
      setIntroBodyTextAnimationActive("Entrance");
      setTimeout(() => {setIntroBodyTextAnimationActive("none")}, 1000);
    }
  }

  // Time allowed insertion of subtitle to animation completion, avoids jarring title movement
  useEffect(() => {setTimeout(() => {setGalleryAnimationComplete(true)}, 1000)}, []);

  return (
    <StyledContentContainer>
      <IntroTextInitial id={0} title="Portfolio" text={text.introText} current={current} tempCurrent={tempCurrent} showSubTitle={showSubTitle} subTitleEntranceComplete={subTitleEntranceComplete} expandIntroText={expandIntroText} introBodyTextAnimationActive={introBodyTextAnimationActive}/>
      {sectionData.map((section) => (
        <IntroText
          key={section.id}
          id={section.id}
          title={section.title}
          textA={section.textA}
          textB={section.textB}
          layout={section.layout}
          current={current}
          tempCurrent={tempCurrent}
          changeSection={changeSection}
          imgA={section.imgA}
        />
      ))}
      <IntroGallery imageChoice={imageChoice} toggleShowSubTitle={toggleShowSubTitle} galleryAnimationComplete={galleryAnimationComplete} toggleExpandIntroText={toggleExpandIntroText} sectionData={sectionData}/>
    </StyledContentContainer>
  )
}

export default Introduction