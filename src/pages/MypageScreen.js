import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const MyPageScreen = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("사용자");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div style={outerContainer}>
      {/* Header */}
      <div style={header}>
        <h2 style={pageTitle}>마이페이지</h2>
      </div>

      {/* 프로필 영역 */}
      <div style={profileSection}>
        <img src="/user.png" alt="User Profile" style={profileCircle} />
        <p style={userNameText}>{userName} 님</p>
      </div>

      {/* 진행 상태 */}
      <div style={progressContainer}>
        {/* 🔹 시뮬레이션 */}
        <div style={progressCard}>
          <div style={progressTextBox}>
            <p style={progressTitle}>시뮬레이션 진행 상황</p>
            <p style={progressPercent}>60%</p>
          </div>
          <div style={progressBar}>
            <div style={{ ...progressFill, width: "60%" }} />
          </div>
        </div>

        {/* 🔹 퀴즈 */}
        <div style={progressCard}>
          <div style={progressTextBox}>
            <p style={progressTitle}>퀴즈 진행 상황</p>
            <p style={progressPercent}>40%</p>
          </div>
          <div style={progressBar}>
            <div style={{ ...progressFill, width: "40%" }} />
          </div>
        </div>
      </div>

      {/* 로그아웃 버튼 */}
      <div style={settingsContainer}>
        <button style={logoutTextButton} onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      {/* Bottom Navigation */}
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
          style={navIcon}
          onClick={() => navigate("/simulation")}
        />
      </div>
    </div>
  );
};

export default MyPageScreen;

const outerContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#EAF5FF",
  padding: "4vh 5vw 10vh",
  boxSizing: "border-box",
  fontFamily: "'Inter', sans-serif",
};

const header = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "2vh",
};

const pageTitle = {
  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
  fontWeight: 700,
  color: "#000",
  transform: "translateY(70%)",
};

const profileSection = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "2rem",
  transform: "translateY(30%)",
};

const profileCircle = {
  width: "clamp(60px, 10vw, 50px)",
  height: "clamp(60px, 10vw, 50px)",
  borderRadius: "50%",
  objectFit: "cover",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
};

const userNameText = {
  fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
  fontWeight: 600,
  color: "#000",
  marginTop: "0.5rem",
  transform: "translateY(10%)",
};

const progressContainer = {
  width: "100%",
  maxWidth: "420px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginBottom: "2rem",
  transform: "translateY(10%)",
};

const progressCard = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
  padding: "1.2rem 1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "2.5rem",
};

const progressTextBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
};

const progressTitle = {
  fontWeight: 600,
  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
  color: "#000",
  textAlign: "left",
};

const progressPercent = {
  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
  color: "#0483E7",
  fontWeight: 600,
  textAlign: "right",
};


const progressBar = {
  width: "100%",
  height: "12px",
  backgroundColor: "#dcdcdc",
  borderRadius: "6px",
  overflow: "hidden",
  display: "flex",
};

const progressFill = {
  height: "100%",
  backgroundColor: "#6EBEFF",
  borderRadius: "4px",
  transition: "width 1s ease",
};


const settingsContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5rem",
};

const logoutTextButton = {
  background: "none",
  border: "none",
  color: "#0483E7",
  fontSize: "clamp(0.8rem, 2vw, 1rem)",
  fontWeight: 500,
  cursor: "pointer",
  padding: "2rem 2rem",
  transition: "color 1s ease",
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
  padding: "22px 0",
};

const navIcon = {
  width: "clamp(28px, 5vw, 34px)",
  height: "auto",
  opacity: 0.6,
  cursor: "pointer",
  transition: "opacity 0.2s ease",
};
