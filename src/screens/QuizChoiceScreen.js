import React, { useState } from "react";
import "../styles/global.css";

const quizData = [
  {
    question: "다음 중 피싱 문자에 해당하는 것은?",
    options: [
      "은행 앱 업데이트 안내 문자",
      "[국세청] 환급금이 있으니 링크 클릭",
      "회사 워크숍 일정 안내",
      "학교 시간표 공지",
    ],
    answer: 1,
  },
];

const QuizChoiceScreen = ({ navigateTo }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(40); // 예시 진행률

  const handleOptionClick = (index) => {
    setSelected(index);
    setShowFeedback(true);
  };

  const currentQuiz = quizData[0];

  return (
    <div style={outerContainer}>
      {/* Header */}
      <div style={header}>
        <h2 style={logoText}>객관식 퀴즈</h2>
      </div>

      {/* Progress Bar */}
      <div style={progressBar}>
        <div style={{ ...progressFill, width: `${progress}%` }} />
      </div>

      {/* Question */}
      <div style={questionBox}>
        <p style={questionText}>Q. {currentQuiz.question}</p>
      </div>

      {/* Choice List */}
      <div style={choiceList}>
        {currentQuiz.options.map((option, index) => (
          <div key={index} style={{ width: "100%" }}>
            <button
              onClick={() => handleOptionClick(index)}
              style={{
                ...choiceButton,
                backgroundColor:
                  showFeedback && index === currentQuiz.answer
                    ? "#4CAF50"
                    : showFeedback && selected === index
                    ? "#F44336"
                    : "#fff",
                color:
                  showFeedback && (selected === index || index === currentQuiz.answer)
                    ? "#fff"
                    : "#000",
              }}
            >
              {option}
            </button>

            {/* 🔹 각 선택지 아래 개별 피드백 표시 */}
            {showFeedback && selected === index && (
              <p
                style={{
                  color:
                    selected === currentQuiz.answer ? "#4CAF50" : "#F44336",
                  fontWeight: "600",
                  fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                  marginTop: "0.5rem",
                  textAlign: "center",
                }}
              >
                {selected === currentQuiz.answer
                  ? "정답입니다! "
                  : "틀렸습니다 "}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div style={bottomNav}>
        <img
          src="/quiz.png"
          alt="Quiz"
          style={{ ...navIcon, ...navIconActive }}
          onClick={() => navigateTo("quiz")}
        />
        <img
          src="/home.png"
          alt="Home"
          style={navIcon}
          onClick={() => navigateTo("home")}
        />
        <img
          src="/simulation.png"
          alt="Simulation"
          style={navIcon}
          onClick={() => navigateTo("simulation")}
        />
      </div>
    </div>
  );
};

export default QuizChoiceScreen;

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
  marginBottom: "1.5rem",
};

const progressFill = {
  height: "100%",
  backgroundColor: "#0483E7",
  transition: "width 0.5s ease",
  borderRadius: "5px",
};

const questionBox = {
  textAlign: "center",
  marginTop: "3rem",
  marginBottom: "2.5rem",
};

const questionText = {
  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
  fontWeight: 600,
  color: "#000",
};

const choiceList = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  maxWidth: "420px",
};

const choiceButton = {
  width: "100%",
  padding: "1rem",
  borderRadius: "12px",
  border: "1px solid #ccc",
  fontSize: "clamp(0.9rem, 2vw, 1rem)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  cursor: "pointer",
  transition: "all 0.2s ease",
  textAlign: "center",
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
