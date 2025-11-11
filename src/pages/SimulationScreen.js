import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const SimulationScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={outerContainer}>
      <iframe
        src="/web3/index.html"
        style={{
          width: "100%",
          height: "calc(100vh - 90px)", // 하단 네비게이션바 높이를 뺀 높이
          border: "none",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
        title="Phishing Simulation"
      />

      {/* 하단 네비게이션 */}
      <div style={bottomNav}>
        <img
          src="/quiz.png"
          alt="Quiz"
          style={navIcon}
          onClick={() => navigate("/quiz")}
        />
        <img
          src="/home.png"
          alt="Home"
          style={navIcon}
          onClick={() => navigate("/home")}
        />
        <img
          src="/simulation.png"
          alt="Simulation"
          style={{ ...navIcon, ...navIconActive }}
          onClick={() => navigate("/simulation")}
        />
      </div>
    </div>
  );
};

export default SimulationScreen;

const outerContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  minHeight: "100vh",
  backgroundColor: "#EAF5FF",
  padding: "2vh 5vw 10vh",
  boxSizing: "border-box",
  fontFamily: "'Inter', sans-serif",
};

const header = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "2rem",
  marginTop: "2vh", 
};

const logoText = {
  color: "#000",
  fontWeight: 700,
  fontSize: "clamp(1.5rem, 3vw, 1rem)",
};


const chatContainer = {
  flex: 1, 
  width: "100%",
  maxWidth: "700px",
  backgroundColor: "#ffffffa0",
  borderRadius: "12px",
  padding: "1.2rem",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.05)",
  marginBottom: "1rem",
};

const messageBubble = {
  padding: "1rem 1rem", // ✅ 내부 여백 증가
  borderRadius: "14px",
  maxWidth: "80%", // ✅ 양쪽 여백 확보
  wordBreak: "keep-all",
  fontSize: "clamp(1rem, 3vw, 2rem)",
  lineHeight: 1.5,
};

const inputArea = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "420px",
  gap: "0.6rem",
  marginBottom: "1rem",
  flexShrink: 0, 
};

const inputBox = {
  padding: "1rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "clamp(1rem, 3vw, 1rem)",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const sendButton = {
  backgroundColor: "#6EBEFF",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "0.9rem",
  fontSize: "clamp(0.85rem, 2vw, 1rem)",
  cursor: "pointer",
  fontWeight: 600,
  transition: "background 0.3s ease",
};

const bottomNav = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#fff",
  boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "25px 0",
};

const navIcon = {
  width: "clamp(28px, 5vw, 34px)",
  height: "auto",
  opacity: 0.6,
  cursor: "pointer",
  transition: "opacity 0.2s ease",
};

const navIconActive = {
  opacity: 1,
};
