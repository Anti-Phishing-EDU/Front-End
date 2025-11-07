import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import BackButton from "../components/BackButton";

const quizData = [
  { question: "피싱 문자는 실제 기관이름을 사칭할 수 있다?", answer: "O" },
];

const QuizOXScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(60);

  const handleAnswer = (choice) => {
    setSelected(choice);
    setShowFeedback(true);
  };

  const currentQuiz = quizData[0];

  return (
  <div style={outerContainer}>
    <BackButton to="/quiz" />
    <div style={header}>
      <h2 style={logoText}>OX 퀴즈</h2>
    </div>

      <div style={progressBar}>
        <div style={{ ...progressFill, width: `${progress}%` }} />
      </div>

      <div style={questionBox}>
        <p style={questionText}>Q. {currentQuiz.question}</p>
      </div>

      <div style={oxContainer}>
        <button
          onClick={() => handleAnswer("O")}
          style={{
            ...oxButton,
            backgroundColor:
              showFeedback && currentQuiz.answer === "O"
                ? "#4CAF50"
                : showFeedback && selected === "O"
                ? "#F44336"
                : "#fff",
            color:
              showFeedback && (selected === "O" || currentQuiz.answer === "O")
                ? "#fff"
                : "#000",
          }}
        >
          O
        </button>

        <button
          onClick={() => handleAnswer("X")}
          style={{
            ...oxButton,
            backgroundColor:
              showFeedback && currentQuiz.answer === "X"
                ? "#4CAF50"
                : showFeedback && selected === "X"
                ? "#F44336"
                : "#fff",
            color:
              showFeedback && (selected === "X" || currentQuiz.answer === "X")
                ? "#fff"
                : "#000",
          }}
        >
          X
        </button>
      </div>

      {showFeedback && (
        <p
          style={{
            marginTop: "1.5rem",
            color: selected === currentQuiz.answer ? "#4CAF50" : "#F44336",
            fontWeight: "600",
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
          }}
        >
          {selected === currentQuiz.answer ? "정답입니다!" : "틀렸습니다!"}
        </p>
      )}

      <div style={bottomNav}>
        <img
          src="/quiz.png"
          alt="Quiz"
          style={{ ...navIcon, ...navIconActive }}
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
          style={navIcon}
          onClick={() => navigate("/simulation")}
        />
      </div>
    </div>
  );
};

export default QuizOXScreen;

const outerContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#EAF5FF",
  padding: "2vh 5vw 8vh",
  boxSizing: "border-box",
  fontFamily: "'Inter', sans-serif",
  
};

const header = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "1rem",
};

const logoText = {
  color: "#000",
  fontWeight: 700,
  fontSize: "clamp(1.5rem, 3vw, 1rem)",
  marginBottom: "1rem",
  
};


const progressBar = {
  width: "80%",
  height: "10px",
  backgroundColor: "#dcdcdc",
  borderRadius: "5px",
  overflow: "hidden",
  
};

const progressFill = {
  height: "100%",
  backgroundColor: "#0483E7",
  transition: "width 0.5s ease",
  borderRadius: "5px",
};

const questionBox = {
  textAlign: "center",
  marginTop: "5rem",
  marginBottom: "5rem",
};

const questionText = {
  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
  fontWeight: 600,
  color: "#000",
};

//  OX
const oxContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "1.5rem",
  marginTop: "1rem",
};

const oxButton = {
  width: "70px",
  height: "70px",
  borderRadius: "12px",
  border: "1px solid #ccc",
  fontSize: "1.8rem",
  fontWeight: "700",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  cursor: "pointer",
  transition: "all 0.2s ease",
  backgroundColor: "#fff",
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
  padding: "20px 0",
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
