import React from "react";
import "../styles/global.css";

const quizList = [
  {
    title: "객관식 퀴즈",
    description: "여러 선택지 중 정답을 골라보세요.",
    target: "quiz_choice",
  },
  {
    title: "OX 퀴즈",
    description: "O 또는 X로 판단해보세요.",
    target: "quiz_ox",
  },
];

const QuizSelectScreen = ({ navigateTo }) => {
  return (
    <div style={outerContainer}>
      {/* ✅ 중앙 타이틀 */}
      <div style={sectionTitle}>
        <h3 style={mainTitle}>퀴즈 유형 선택</h3>
      </div>

      {/* ✅ Quiz List (전체 카드 클릭 가능) */}
      <div style={quizListContainer}>
        {quizList.map((quiz, index) => (
          <div
            key={index}
            style={quizCard}
            onClick={() => navigateTo(quiz.target)} // ✅ 카드 클릭시 이동
          >
            <h4 style={quizTitle}>{quiz.title}</h4>
            <p style={quizDescription}>{quiz.description}</p>
          </div>
        ))}
      </div>

      {/* ✅ Bottom Nav */}
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

export default QuizSelectScreen;


const outerContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#EAF5FF",
  padding: "2vh 5vw 8vh",
  boxSizing: "border-box",
  fontFamily: "'Inter', sans-serif",
};

const sectionTitle = {
  textAlign: "center",
  transform: "translateY(-40%)",
};

const mainTitle = {
  color: "#000",
  fontSize: "clamp(1.5rem, 3vw, 1rem)",
  fontWeight: 700,
  marginBottom: "5rem",
};

const quizListContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  maxWidth: "420px",
  transform: "translateY(-10%)",
};

const quizCard = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
  padding: "1.2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "2rem",
  cursor: "pointer", // ✅ 클릭 가능 표시
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
};

const quizTitle = {
  color: "#000",
  fontWeight: 700,
  fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
  margin: 0,
};

const quizDescription = {
  fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
  color: "#444",
  margin: 0,
  lineHeight: 1.4,
};

quizCard[":hover"] = {
  transform: "scale(1.02)",
  boxShadow: "0 6px 14px rgba(0, 0, 0, 0.12)",
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
