import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import IntroTextInitial from "./IntroTextInitial";
import IntroText from "./IntroText";
import IntroGallery from "./IntroGallery";

import { text } from "./text";
import { StyledContentContainer, StyledButtonsContainer, StyledTitle, StyledMinorTitle, StyledGallery } from "./Introduction.styles";

function Introduction({ home, activateSongGuesser, activateFaradayCage, activateAuthorAnalysis }) {
  const [initial, setInitial] = useState(true);
  const [current, setCurrent] = useState(0);
  const [tempCurrent, setTempCurrent] = useState(0);
  const [initialSection, setInitialSection] = useState("None");

  // Animation states
  const [showSubTitle, setShowSubTitle] = useState(false);
  const [subTitleEntranceComplete, setSubTitleEntranceComplete] = useState(false);
  const [expandIntroText, setExpandIntroText] = useState(false);
  const [introBodyTextAnimationActive, setIntroBodyTextAnimationActive] = useState("none");
  const [galleryAnimationComplete, setGalleryAnimationComplete] = useState(false);

  const sectionData = [
    { id: 1, title: "Song Guesser", textA: text.songGuesserText1A, textB: text.songGuesserText1B, textC: text.songGuesserText1C, textD: text.songGuesserText1D, textImgA: text.songGuesserText1ImgA, textImgB: text.songGuesserText1ImgB, layout: "A", imgA: "/images/Song Guesser - 001.jpg" },
    { id: 2, title: "Song Guesser", textA: text.songGuesserText2A, textB: text.songGuesserText2B, textC: text.songGuesserText2C, textD: text.songGuesserText2D, textImgA: text.songGuesserText2ImgA, textImgB: text.songGuesserText2ImgB, layout: "B", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 3, title: "Song Guesser", textA: text.songGuesserText3A, textB: text.songGuesserText3B, textC: text.songGuesserText3C, textD: text.songGuesserText3D, textImgA: text.songGuesserText3ImgA, textImgB: text.songGuesserText3ImgB, layout: "C", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 4, title: "Faraday Cage", textA: text.faradayCageText1A, textB: text.faradayCageText1B, textC: text.faradayCageText1C, textD: text.songGuesserText3D, textImgA: text.songGuesserText3ImgA, textImgB: text.songGuesserText3ImgB, layout: "B", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 5, title: "Faraday Cage", textA: text.faradayCageTextA, textB: text.faradayCageTextB, layout: "B", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 6, title: "Faraday Cage", textA: text.faradayCageTextA, textB: text.faradayCageTextB, layout: "C", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 7, title: "Author Analysis", textA: text.authorAnalysisTextA, textB: text.authorAnalysisTextTextB, layout: "A", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 8, title: "Author Analysis", textA: text.authorAnalysisTextTextA, textB: text.authorAnalysisTextTextB, layout: "B", imgA: "./images/Song Guesser - 001.jpg" },
    { id: 9, title: "Author Analysis", textA: text.authorAnalysisTextTextA, textB: text.authorAnalysisTextTextB, layout: "C", imgA: "./images/Song Guesser - 001.jpg" },
  ];

  function imageChoice(event) {
    // Reset any expanded text in initial section
    setTimeout(() => {
      setInitialSection("None");
    }, 500);

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
      case "Author Analysis":
        activateAuthorAnalysis();
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
        setInitialSection("None");
      }, 500);
    }
    setExpandIntroText(prev => !prev)
  }

  function changeInitialSection(e) {
    if (initialSection == "None") {
      setInitialSection(e.target.value)
    } else {
      setInitialSection("None");
      if (initialSection != e.target.value) {
        setTimeout(() => {setInitialSection(e.target.value)}, 800);
      }
    }
  }

  // Time allowed insertion of subtitle to animation completion, avoids jarring title movement
  useEffect(() => {setTimeout(() => {setGalleryAnimationComplete(true)}, 1000)}, []);

  return (
    <StyledContentContainer>
      <IntroTextInitial id={0} title="Portfolio" text={text.introText} current={current} tempCurrent={tempCurrent} showSubTitle={showSubTitle} subTitleEntranceComplete={subTitleEntranceComplete} expandIntroText={expandIntroText} introBodyTextAnimationActive={introBodyTextAnimationActive} initialSection={initialSection} setInitialSection={setInitialSection} changeInitialSection={changeInitialSection}/>
      
      {sectionData.map((section) => (
        <IntroText
          key={section.id}
          id={section.id}
          title={section.title}
          textA={section.textA}
          textB={section.textB}
          textC={section.textC}
          textD={section.textD}
          textImgA={section.textImgA}
          textImgB={section.textImgB}
          layout={section.layout}
          current={current}
          tempCurrent={tempCurrent}
          changeSection={changeSection}
          $expandIntroText={expandIntroText}
          imgA={section.imgA}
        />
      ))}

      <IntroGallery imageChoice={imageChoice} toggleShowSubTitle={toggleShowSubTitle} toggleExpandIntroText={toggleExpandIntroText} galleryAnimationComplete={galleryAnimationComplete} current={current} sectionData={sectionData}/>
    </StyledContentContainer>
  )
}

export default Introduction