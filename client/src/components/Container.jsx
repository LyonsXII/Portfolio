import React, { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

function Container({ children }) {
  const { theme, bg } = useContext(ThemeContext);

  return (
    <div>
      <div style={{
        backgroundColor: theme.backgroundColor,
        backgroundImage: bg,
        overflow: "hidden",
        color: theme.textColor,
        height: "100vh",
        width: "96vw"
      }}>
        {children}
      </div>

      <div style={{
          position: "absolute",
          zIndex: "1",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundImage: "url('./bg.webp')",
          backgroundSize: "cover",
          opacity: "0.03",
          pointerEvents: "none",
          height: "100%",
          width: "100%"
      }}>
      </div>
    </div>
  )
}

export default Container