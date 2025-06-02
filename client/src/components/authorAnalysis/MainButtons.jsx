import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { StyledButtonsFlexbox, StyledTextEntryFlexbox, StyledTextBox, StyledTextField, StyledMainButton, StyledIcon, StyledAuthorButtonContainer, StyledAuthorButton, StyledButtonText } from './AuthorAnalysis.styles';

function MainButtons({ showData, authorProps, predictionProps}) {
  const { theme } = useContext(ThemeContext);

  const {	
    authorList,
    selectedAuthor,
    changeSelectedAuthor,
    authorExpanded,
    toggleAuthorExpanded,
    handleAuthorReport
  } = authorProps

  const {	
    predictionExpanded,
    togglePredictionExpanded,
    handleChange,
    handlePrediction,
    predictionText
  } = predictionProps

  const [authorExpandedButtonAnimation, setAuthorExpandedButtonAnimation] = useState(false);

  // Trigger button entrance for author expanded once box fully expanded
  useEffect(() => {
    if (authorExpanded) {
      setTimeout(() => {
        setAuthorExpandedButtonAnimation(true);
      }, 800);
    } else {
      setAuthorExpandedButtonAnimation(false);
    }
  }, [authorExpanded]);

  return (
    <StyledButtonsFlexbox $showData={showData}>
      <StyledTextEntryFlexbox $showData={showData} $expanded={authorExpanded} $hide={!predictionExpanded}>
        <StyledMainButton theme={theme} onClick={authorExpanded ? undefined : toggleAuthorExpanded} $expanded={authorExpanded}>
          <StyledIcon src="./icons/book.svg" $width="50%" $expanded={authorExpanded} $main={true}/>
          <StyledIcon src="./icons/next.svg" $width="70%" $expanded={authorExpanded} onClick={handleAuthorReport}/>
          <StyledIcon src="./icons/return.svg" $width="70%" $expanded={authorExpanded} onClick={toggleAuthorExpanded}/>
        </StyledMainButton>
        <StyledAuthorButtonContainer theme={theme} $expanded={authorExpanded}>
          {authorList.map((author, index) => {
              return (
                <StyledAuthorButton theme={theme} key={index} $value={author} $selectedAuthor={selectedAuthor} $authorExpandedButtonAnimation={authorExpandedButtonAnimation} onClick={() => changeSelectedAuthor(author)}>
                  <StyledButtonText>{author}</StyledButtonText>
                </StyledAuthorButton>
              )
          })}
        </StyledAuthorButtonContainer>
      </StyledTextEntryFlexbox>

      <StyledTextEntryFlexbox $showData={showData} $expanded={predictionExpanded} $hide={!authorExpanded}>
        <StyledMainButton theme={theme} onClick={predictionExpanded ? undefined : togglePredictionExpanded} $expanded={predictionExpanded}>
          <StyledIcon src="./icons/search.svg" $width="50%" $expanded={predictionExpanded} $main={true}/>
          <StyledIcon src="./icons/next.svg" $width="70%" $expanded={predictionExpanded} onClick={handlePrediction}/>
          <StyledIcon src="./icons/return.svg" $width="70%" $expanded={predictionExpanded} onClick={togglePredictionExpanded}/>
        </StyledMainButton>
        <StyledTextBox theme={theme} $expanded={predictionExpanded}>
          <StyledTextField theme={theme} value={predictionText} onChange={handleChange} $expanded={predictionExpanded} placeholder="Enter your text here..."/>
        </StyledTextBox>
      </StyledTextEntryFlexbox>
    </StyledButtonsFlexbox>
  )
}

export default MainButtons