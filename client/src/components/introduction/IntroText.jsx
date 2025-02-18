import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { StyledTitle, StyledMinorTitle, StyledBodyText, StyledImage, StyledTitleContainer, StyledIntroButtonContainer, StyledSpacer, StyledButtonsContainer, StyledIntroContainer } from "./Introduction.styles";

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 30px;
`;

const StyledContentFlexbox = styled.div`
  display: flex;
  justify-content: center;
  height: 340px;
  width: 90%;
  gap: 40px;
  margin-top: 30px;
`;

const layoutMap = {
  A: ({ containerProps, title, theme, textA, textB, changeSection, imgA }) => (
    <StyledIntroContainer {...containerProps}>
      <StyledTitleContainer theme={theme}>
        <StyledTitle>{title}</StyledTitle>
        <StyledSpacer/>
        <StyledIntroButtonContainer>
          <StyledMinorTitle>Go to Section</StyledMinorTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            style={{ height: "80px" }}
            onClick={changeSection}
            data-title={title}
          >
            <path fill="none" stroke="black" strokeWidth="4px" strokeLinejoin="round" strokeLinecap="round" d="M13.9546 5.18341L18.9324 9.60815C19.863 10.4353 20.3283 10.8489 20.4998 11.3373C20.6503 11.7662 20.6503 12.2335 20.4998 12.6624C20.3283 13.1508 19.863 13.5644 18.9324 14.3916L13.9546 18.8163C13.5323 19.1917 13.3211 19.3794 13.1418 19.3861C12.986 19.3919 12.8364 19.3247 12.7372 19.2044C12.6231 19.0659 12.6231 18.7834 12.6231 18.2184V15.4284C10.195 15.4284 7.63044 16.2083 5.75782 17.5926C4.78293 18.3133 4.29546 18.6737 4.1098 18.6595C3.92883 18.6456 3.81398 18.575 3.72008 18.4196C3.62374 18.2603 3.70883 17.7624 3.879 16.7666C4.98397 10.3004 9.43394 8.57129 12.6231 8.57129V5.78134C12.6231 5.21632 12.6231 4.93381 12.7372 4.79531C12.8364 4.67498 12.986 4.6078 13.1418 4.61363C13.3211 4.62034 13.5323 4.80803 13.9546 5.18341Z"/>

            <path fill={theme.textColor} d="M13.9546 5.18341L18.9324 9.60815C19.863 10.4353 20.3283 10.8489 20.4998 11.3373C20.6503 11.7662 20.6503 12.2335 20.4998 12.6624C20.3283 13.1508 19.863 13.5644 18.9324 14.3916L13.9546 18.8163C13.5323 19.1917 13.3211 19.3794 13.1418 19.3861C12.986 19.3919 12.8364 19.3247 12.7372 19.2044C12.6231 19.0659 12.6231 18.7834 12.6231 18.2184V15.4284C10.195 15.4284 7.63044 16.2083 5.75782 17.5926C4.78293 18.3133 4.29546 18.6737 4.1098 18.6595C3.92883 18.6456 3.81398 18.575 3.72008 18.4196C3.62374 18.2603 3.70883 17.7624 3.879 16.7666C4.98397 10.3004 9.43394 8.57129 12.6231 8.57129V5.78134C12.6231 5.21632 12.6231 4.93381 12.7372 4.79531C12.8364 4.67498 12.986 4.6078 13.1418 4.61363C13.3211 4.62034 13.5323 4.80803 13.9546 5.18341Z"/>
          </svg>
        </StyledIntroButtonContainer>
      </StyledTitleContainer>

      <StyledContentContainer>
        <StyledBodyText style={{ marginTop: "40px", width: "90%" }}>
          {textA}
          <br />
          <br />
          {textB}
        </StyledBodyText>
        <StyledContentFlexbox>
          <StyledBodyText>
            {textA}
          </StyledBodyText>
          <StyledImage $height="100%" $width="60" src={imgA}/>
        </StyledContentFlexbox>
      </StyledContentContainer>
    </StyledIntroContainer>
  ),
  B: ({ containerProps, title, theme, textA, textB }) => (
    <StyledIntroContainer {...containerProps}>
      <StyledTitleContainer theme={theme}>
        <StyledTitle>{title}</StyledTitle>
        <StyledSpacer/>
        <StyledIntroButtonContainer>
          <StyledMinorTitle>Go to Section</StyledMinorTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            style={{ height: "80px" }}
          >
            <path fill="none" stroke="black" strokeWidth="4px" strokeLinejoin="round" strokeLinecap="round" d="M13.9546 5.18341L18.9324 9.60815C19.863 10.4353 20.3283 10.8489 20.4998 11.3373C20.6503 11.7662 20.6503 12.2335 20.4998 12.6624C20.3283 13.1508 19.863 13.5644 18.9324 14.3916L13.9546 18.8163C13.5323 19.1917 13.3211 19.3794 13.1418 19.3861C12.986 19.3919 12.8364 19.3247 12.7372 19.2044C12.6231 19.0659 12.6231 18.7834 12.6231 18.2184V15.4284C10.195 15.4284 7.63044 16.2083 5.75782 17.5926C4.78293 18.3133 4.29546 18.6737 4.1098 18.6595C3.92883 18.6456 3.81398 18.575 3.72008 18.4196C3.62374 18.2603 3.70883 17.7624 3.879 16.7666C4.98397 10.3004 9.43394 8.57129 12.6231 8.57129V5.78134C12.6231 5.21632 12.6231 4.93381 12.7372 4.79531C12.8364 4.67498 12.986 4.6078 13.1418 4.61363C13.3211 4.62034 13.5323 4.80803 13.9546 5.18341Z"/>

            <path fill={theme.textColor} d="M13.9546 5.18341L18.9324 9.60815C19.863 10.4353 20.3283 10.8489 20.4998 11.3373C20.6503 11.7662 20.6503 12.2335 20.4998 12.6624C20.3283 13.1508 19.863 13.5644 18.9324 14.3916L13.9546 18.8163C13.5323 19.1917 13.3211 19.3794 13.1418 19.3861C12.986 19.3919 12.8364 19.3247 12.7372 19.2044C12.6231 19.0659 12.6231 18.7834 12.6231 18.2184V15.4284C10.195 15.4284 7.63044 16.2083 5.75782 17.5926C4.78293 18.3133 4.29546 18.6737 4.1098 18.6595C3.92883 18.6456 3.81398 18.575 3.72008 18.4196C3.62374 18.2603 3.70883 17.7624 3.879 16.7666C4.98397 10.3004 9.43394 8.57129 12.6231 8.57129V5.78134C12.6231 5.21632 12.6231 4.93381 12.7372 4.79531C12.8364 4.67498 12.986 4.6078 13.1418 4.61363C13.3211 4.62034 13.5323 4.80803 13.9546 5.18341Z"/>
          </svg>
        </StyledIntroButtonContainer>
      </StyledTitleContainer>
    </StyledIntroContainer>
  ),
  C: ({ containerProps, title, theme, textA }) => (
    <StyledIntroContainer {...containerProps}>
      <StyledTitleContainer theme={theme}>
        <StyledTitle>{title}</StyledTitle>
        <StyledSpacer/>
        <StyledIntroButtonContainer>
          <StyledMinorTitle>Go to Section</StyledMinorTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            style={{ height: "80px" }}
          >
            <path fill="none" stroke="black" strokeWidth="4px" strokeLinejoin="round" strokeLinecap="round" d="M13.9546 5.18341L18.9324 9.60815C19.863 10.4353 20.3283 10.8489 20.4998 11.3373C20.6503 11.7662 20.6503 12.2335 20.4998 12.6624C20.3283 13.1508 19.863 13.5644 18.9324 14.3916L13.9546 18.8163C13.5323 19.1917 13.3211 19.3794 13.1418 19.3861C12.986 19.3919 12.8364 19.3247 12.7372 19.2044C12.6231 19.0659 12.6231 18.7834 12.6231 18.2184V15.4284C10.195 15.4284 7.63044 16.2083 5.75782 17.5926C4.78293 18.3133 4.29546 18.6737 4.1098 18.6595C3.92883 18.6456 3.81398 18.575 3.72008 18.4196C3.62374 18.2603 3.70883 17.7624 3.879 16.7666C4.98397 10.3004 9.43394 8.57129 12.6231 8.57129V5.78134C12.6231 5.21632 12.6231 4.93381 12.7372 4.79531C12.8364 4.67498 12.986 4.6078 13.1418 4.61363C13.3211 4.62034 13.5323 4.80803 13.9546 5.18341Z"/>

            <path fill={theme.textColor} d="M13.9546 5.18341L18.9324 9.60815C19.863 10.4353 20.3283 10.8489 20.4998 11.3373C20.6503 11.7662 20.6503 12.2335 20.4998 12.6624C20.3283 13.1508 19.863 13.5644 18.9324 14.3916L13.9546 18.8163C13.5323 19.1917 13.3211 19.3794 13.1418 19.3861C12.986 19.3919 12.8364 19.3247 12.7372 19.2044C12.6231 19.0659 12.6231 18.7834 12.6231 18.2184V15.4284C10.195 15.4284 7.63044 16.2083 5.75782 17.5926C4.78293 18.3133 4.29546 18.6737 4.1098 18.6595C3.92883 18.6456 3.81398 18.575 3.72008 18.4196C3.62374 18.2603 3.70883 17.7624 3.879 16.7666C4.98397 10.3004 9.43394 8.57129 12.6231 8.57129V5.78134C12.6231 5.21632 12.6231 4.93381 12.7372 4.79531C12.8364 4.67498 12.986 4.6078 13.1418 4.61363C13.3211 4.62034 13.5323 4.80803 13.9546 5.18341Z"/>
          </svg>
        </StyledIntroButtonContainer>
      </StyledTitleContainer>
    </StyledIntroContainer>
  ),
};

function IntroText({ id, title, textA, textB, layout, current, tempCurrent, changeSection, imgA }) {
  const { theme } = useContext(ThemeContext);

  if (current != id) {return null}

  const containerProps = { $id: id, $current: current, $tempCurrent: tempCurrent, $title: title };

  const renderLayout = layoutMap[layout];

  return renderLayout
    ? renderLayout({ containerProps, title, theme, textA, textB, changeSection, imgA })
    : null;
}

export default IntroText