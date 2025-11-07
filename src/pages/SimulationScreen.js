import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const SimulationScreen = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "안녕하세요. [국세청]입니다. 환급금이 있습니다. 계좌번호를 입력해주세요.",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSend = () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];

    let aiResponse = "";
    if (userInput.includes("계좌") || userInput.includes("번호")) {
      aiResponse = "개인정보를 요구하는 메시지는 피싱일 가능성이 높습니다! 🚨";
    } else if (userInput.includes("확인") || userInput.includes("링크")) {
      aiResponse = "링크 클릭은 위험합니다. 해당 기관 공식 홈페이지를 직접 방문하세요.";
    } else {
      aiResponse = "의심되는 내용입니다. 출처를 다시 확인하세요.";
    }

    setMessages([...newMessages, { sender: "ai", text: aiResponse }]);
    setUserInput("");
  };

  return (
    <div style={outerContainer}>
      {/* Header */}
      <div style={header}>
        <h2 style={logoText}>시뮬레이션</h2>
      </div>

      {/* 메시지 영역 */}
      <div style={chatContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...messageBubble,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#0483E7" : "#fff",
              color: msg.sender === "user" ? "#fff" : "#000",
              border: msg.sender === "ai" ? "1px solid #ccc" : "none",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div style={inputArea}>
        <input
          type="text"
          placeholder="답변을 입력하세요"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={inputBox}
        />
        <button style={sendButton} onClick={handleSend}>
          답변하기
        </button>
      </div>

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
