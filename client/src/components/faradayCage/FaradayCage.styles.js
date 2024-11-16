
import styled from 'styled-components';

export const StyledFlexboxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const StyledChartContainer = styled.div`
  height: 85vh;
  width: 40vw;
  border: 4px solid black;
`;

export const StyledButtonContainer = styled.div`
  height: 100vh;
  width: auto;
  margin-left: 6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const StyledRowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const StyledButton = styled.button`
  width: auto;
  padding: 15px 30px;
  word-wrap: break-word;
  white-space: normal;
  border: 4px solid black;
  border-radius: 20px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.primaryColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
    transform: scale(1.01);
    transition: transform 0.2s ease, background-color 0.8s ease;
  }
`;

export const StyledIncrementButton = styled.button`
  width: 10%;
  padding: 15px 30px;
  border: 4px solid black;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primaryColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
    transform: scale(1.01);
    transition: transform 0.1s ease, background-color 0.8s ease;
  }
`;

export const StyledToggle = styled.input`
  // Hide default tickbox
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 60px;
  height: 30px;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 0px 10px black;

  // Knob settings
  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    background-color: ${({ theme }) => theme.textColor};
    border-radius: 50%;
    transition: 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  // State when toggled off
  &:not(:checked) {
    opacity: 0.8;
  }

  // State changes when toggled on
  &:checked {
    background-color: ${({ theme }) => theme.tertiaryColor};
    &::after {
      left: calc(100% - 27px);
      opacity: 1;
    }
  }

  // Hover effect
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 16px black;
  }
`;

export const StyledTextH3 = styled.h3`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);   
`;

export const StyledTextH4 = styled.h4`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);   
`;