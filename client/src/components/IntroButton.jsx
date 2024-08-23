import React, { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

function IntroButton(prop) {
  const { theme } = useContext(ThemeContext);

  return (
    <button style={{
      height: "80px",
      width: "300px",
      backgroundColor: theme.primaryColor,
      color: theme.textColor,
      border: `4px solid ${theme.borderColor}`,
      borderRadius: "20px"
    }}>
      <h3>{prop.name}</h3>
    </button>
  )
}

export default IntroButton