import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

import IntroTextInitial from "./IntroTextInitial";
import IntroText from "./IntroText";
import IntroGallery from "./IntroGallery";

import { text } from "./text";
import { StyledContentContainer, StyledButtonsContainer, StyledTitle, StyledMinorTitle, StyledGallery } from "./Introduction.styles";

function Introduction({ home, activateSongGuesser, activateFaradayCage, activateAuthorAnalysis }) {
  const { theme } = useContext(ThemeContext);
  const { volume, clickSound } = useContext(AudioContext);

  const [initial, setInitial] = useState(true);
  const [current, setCurrent] = useState(0);
  const [tempCurrent, setTempCurrent] = useState(0);
  const [initialSection, setInitialSection] = useState("None");

  // Animation states
  const [showSubTitle, setShowSubTitle] = useState(false);
  const [subTitleEntranceComplete, setSubTitleEntranceComplete] = useState(false);
  const [expandIntroText, setExpandIntroText] = useState(false);
  const [galleryAnimationComplete, setGalleryAnimationComplete] = useState(false);
  const [collapseIntroText, setCollapseIntroText] = useState(false);

  const sectionData = [
    { id: 1, title: "Song Guesser", textA: text.songGuesserText1A, textB: text.songGuesserText1B, textC: text.songGuesserText1C, textD: text.songGuesserText1D, textImgA: text.songGuesserText1ImgA, layout: "A", reverse: false, imgA: "/images/Song Guesser - 001 - " + theme.name + ".jpg", imgAAlt: "Song Guesser main menu"},
    { id: 2, title: "Song Guesser", textA: text.songGuesserText2A, textB: text.songGuesserText2B, textC: text.songGuesserText2C, textD: text.songGuesserText2D, textImgA: text.songGuesserText2ImgA, textImgB: text.songGuesserText2ImgB, layout: "B", reverse: false, imgA: "/images/Song Guesser - 002 - " + theme.name + ".jpg", imgB: "/images/Song Guesser - 002 - Alt - " + theme.name + ".jpg", imgAAlt: "Song Guesser game screen", imgBAlt: "Prototype Author Analysis landing page"},
    { id: 3, title: "Song Guesser", textA: text.songGuesserText3A, textB: text.songGuesserText3B, textC: text.songGuesserText3C, textD: text.songGuesserText3D, textImgA: text.songGuesserText3ImgA, layout: "C", reverse: false, imgA: "/images/Song Guesser - 003 - " + theme.name + ".jpg", imgAAlt: "Song Guesser game over screen" },
    { id: 4, title: "Faraday Cage", textA: text.faradayCageText1A, textB: text.faradayCageText1B, textC: text.faradayCageText1C, textD: text.faradayCageText1D, textImgA: text.faradayCageText1ImgA, textImgB: text.faradadayCage1ImgB, layout: "C", reverse: true, imgA: "/images/Faraday Cage - 001 - " + theme.name + ".jpg", imgAAlt: "Faraday Cage diagram" },
    { id: 5, title: "Faraday Cage", textA: text.faradayCageText2A, textB: text.faradayCageText2B, textC: text.faradayCageText2C, textD: text.faradayCageText2D, textImgA: text.faradayCageText2ImgA, layout: "A", reverse: false, imgA: "/images/Faraday Cage - 002 - " + theme.name + ".jpg", imgAAlt: "Faraday Cage visualisation menu" },
    { id: 6, title: "Faraday Cage", textA: text.faradayCageText3A, textB: text.faradayCageText3B, textC: text.faradayCageText3C, textD: text.faradayCageText3D, textImgA: text.faradayCageText3ImgA, textImgB: text.faradayCageText3ImgB, layout: "B", reverse: true, links: true, imgA: "/images/Faraday Cage - 003 - " + theme.name + ".jpg", imgAAlt: "Faraday Cage plot zoom-in", imgBAlt: "Matlab output zoom-in" },
    { id: 7, title: "Author Analysis", textA: text.authorAnalysisText1A, textB: text.authorAnalysisText1B, textC: text.authorAnalysisText1C, textD: text.authorAnalysisText1D, textImgA: text.authorAnalysisText1ImgA, layout: "C", reverse: true, imgA: "/images/Author Analysis - 001 - " + theme.name + ".jpg", imgAAlt: "Author Analysis landing page" },
    { id: 8, title: "Author Analysis", textA: text.authorAnalysisText2A, textB: text.authorAnalysisText2B, textC: text.authorAnalysisText2C, textD: text.authorAnalysisText2D, textImgA: text.authorAnalysisText2ImgA, textImgB: text.authorAnalysisText2ImgB, layout: "B", reverse: false, imgA: "/images/Author Analysis - 002 - " + theme.name + ".jpg", imgAAlt: "Author Analysis text prediction dashboard", imgBAlt: "TBA" },
    { id: 9, title: "Author Analysis", textA: text.authorAnalysisText3A, textB: text.authorAnalysisText3B, textC: text.authorAnalysisText3C, textD: text.authorAnalysisText3D, textImgA: text.authorAnalysisText3ImgA,  layout: "A", reverse: true, imgA: "/images/Author Analysis - 003 - " + theme.name + ".jpg", imgAAlt: "Author Analysis author dashboard" },
  ];

  function imageChoice(event) {
    clickSound();
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
    clickSound();
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
    clickSound();
    if (expandIntroText) {
      setTempCurrent(0);
      setTimeout(() => {
        setCurrent(0);
        setInitialSection("None");
      }, 500);
    } else {
      setCollapseIntroText(false);
    }
    setExpandIntroText(prev => !prev)
  }

  function changeInitialSection(e) {
    clickSound();
    if (initialSection === "None") {
      setCollapseIntroText(true);
      setInitialSection(e.target.value);
    } else {
      if (initialSection === e.target.value) {
        setInitialSection("None")
        setCollapseIntroText(false);  
      } else {
        setInitialSection("None");
        setTimeout(() => {setInitialSection(e.target.value)}, 800);
      }
    }
  }

  // Time allowed insertion of subtitle to animation completion, avoids jarring title movement
  useEffect(() => {setTimeout(() => {setGalleryAnimationComplete(true)}, 1000)}, []);

  return (
    <StyledContentContainer>
      <IntroTextInitial id={0} title="Portfolio" text={text.introText} current={current} tempCurrent={tempCurrent} showSubTitle={showSubTitle} subTitleEntranceComplete={subTitleEntranceComplete} expandIntroText={expandIntroText} initialSection={initialSection} setInitialSection={setInitialSection} changeInitialSection={changeInitialSection} collapseIntroText={collapseIntroText}/>
      
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
          reverse={section.reverse}
          links={section.links}
          current={current}
          tempCurrent={tempCurrent}
          changeSection={changeSection}
          expandIntroText={expandIntroText}
          imgA={section.imgA}
          imgB={section.imgB}
        />
      ))}

      <IntroGallery imageChoice={imageChoice} toggleShowSubTitle={toggleShowSubTitle} toggleExpandIntroText={toggleExpandIntroText} galleryAnimationComplete={galleryAnimationComplete} current={current} sectionData={sectionData}/>
    </StyledContentContainer>
  )
}

export default Introduction