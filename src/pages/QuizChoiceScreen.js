<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> 0422feb6 (feat: Update)
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import BackButton from "../components/BackButton";

<<<<<<< HEAD
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

const QuizChoiceScreen = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(40);
=======
const API_BASE = process.env.REACT_APP_API_BASE_URL || "";

const QuizChoiceScreen = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);   // {question, options[], answer}
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(40);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");
        // 특정 ID를 사용할 경우: /api/quizzes/1
        // 랜덤 문제를 원하면: /api/quizzes/random
        const res = await fetch(`${API_BASE}/api/quizzes/1`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // 방어적 체크
        if (
          !data ||
          typeof data.question !== "string" ||
          !Array.isArray(data.options) ||
          (typeof data.answer !== "number" && data.answer !== undefined)
        ) {
          throw new Error("Invalid quiz payload");
        }
        setQuiz(data);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);
>>>>>>> 0422feb6 (feat: Update)

  const handleOptionClick = (index) => {
    setSelected(index);
    setShowFeedback(true);
  };

<<<<<<< HEAD
  const currentQuiz = quizData[0];

  return (
  <div style={outerContainer}>
    <BackButton to="/quiz" />
    <div style={header}>
      <h2 style={logoText}>객관식 퀴즈</h2>
    </div>

      {/* Progress Bar */}
=======
  if (loading) {
    return (
      <div style={outerContainer}>
        <BackButton to="/quiz" />
        <div style={header}><h2 style={logoText}>객관식 퀴즈</h2></div>
        <p>퀴즈 불러오는 중…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div style={outerContainer}>
        <BackButton to="/quiz" />
        <div style={header}><h2 style={logoText}>객관식 퀴즈</h2></div>
        <p style={{ color: "#F44336" }}>불러오기 오류: {error}</p>
      </div>
    );
  }
  if (!quiz) {
    return (
      <div style={outerContainer}>
        <BackButton to="/quiz" />
        <div style={header}><h2 style={logoText}>객관식 퀴즈</h2></div>
        <p>퀴즈가 없습니다.</p>
      </div>
    );
  }

  const hasAnswer = typeof quiz.answer === "number";
  const question = quiz.question;
  const options = quiz.options;

  return (
    <div style={outerContainer}>
      <BackButton to="/quiz" />
      <div style={header}>
        <h2 style={logoText}>객관식 퀴즈</h2>
      </div>

>>>>>>> 0422feb6 (feat: Update)
      <div style={progressBar}>
        <div style={{ ...progressFill, width: `${progress}%` }} />
      </div>

<<<<<<< HEAD
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
                  ? "정답입니다!"
                  : "틀렸습니다"}
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
=======
      <div style={questionBox}>
        <p style={questionText}>Q. {question}</p>
      </div>

      <div style={choiceList}>
        {options.map((option, index) => {
          const isCorrect = hasAnswer && index === quiz.answer;
          const isSelected = selected === index;
          const bg =
            showFeedback && hasAnswer
              ? isCorrect
                ? "#4CAF50"
                : isSelected
                ? "#F44336"
                : "#fff"
              : "#fff";
          const color =
            showFeedback && hasAnswer && (isSelected || isCorrect) ? "#fff" : "#000";

          return (
            <div key={index} style={{ width: "100%" }}>
              <button
                onClick={() => handleOptionClick(index)}
                style={{ ...choiceButton, backgroundColor: bg, color }}
              >
                {option}
              </button>

              {showFeedback && isSelected && hasAnswer && (
                <p
                  style={{
                    color: isCorrect ? "#4CAF50" : "#F44336",
                    fontWeight: "600",
                    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                    marginTop: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  {isCorrect ? "정답입니다!" : "틀렸습니다"}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div style={bottomNav}>
        <img src="/quiz.png" alt="Quiz" style={{ ...navIcon, ...navIconActive }} onClick={() => navigate("/quiz")} />
        <img src="/home.png" alt="Home" style={navIcon} onClick={() => navigate("/home")} />
        <img src="/simulation.png" alt="Simulation" style={navIcon} onClick={() => navigate("/simulation")} />
>>>>>>> 0422feb6 (feat: Update)
      </div>
    </div>
  );
};

export default QuizChoiceScreen;
<<<<<<< HEAD
=======
/* 기존 style 객체들(outerContainer 등)은 그대로 사용 */

>>>>>>> 0422feb6 (feat: Update)

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
