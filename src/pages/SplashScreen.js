import React from "react";
import "../styles/global.css";

const SplashScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2.5vh",
        background: "#FFFFFF",
        padding: "5vh 0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2vh",
          width: "100%",
        }}
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/4dc57ad81321673d483495be52ce645e5e486d87?width=320"
          alt="Logo"
          style={{
            width: "35vw",
            maxWidth: "160px",
            height: "auto",
          }}
        />
        <h1
          style={{
            color: "var(--primary-blue)",
            textAlign: "center",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700,
          }}
        >
          PHISHIELD
        </h1>
        <p
          style={{
            color: "var(--secondary-blue)",
            textAlign: "center",
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            fontStyle: "italic",
            fontWeight: 600,
          }}
        >
          AI PHISHING RESPONSE SIMULATION
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
