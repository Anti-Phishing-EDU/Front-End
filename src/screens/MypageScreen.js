import React, { useEffect, useState } from "react";
import "../styles/global.css";

const MyPageScreen = ({ navigateTo }) => {
  const [userName, setUserName] = useState("사용자");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  return (
    <div style={outerContainer}>
      {/* ✅ Header */}
      <div style={header}>
        <h2 style={pageTitle}>마이페이지</h2>
      </div>

      {/* ✅ 프로필 영역 */}
      <div style={profileSection}>
        <img src="/user.png" alt="User Profile" style={profileCircle} />
        <p style={userNameText}>{userName} 님</p>
      </div>

      {/* ✅ 진행 상태 */}
      <div style={progressContainer}>
        <div style={progressCard}>
          <p style={progressTitle}>시뮬레이션 진행 상황</p>
          <div style={progressBar}>
            <div style={{ ...progressFill, width: "60%" }}></div>
          </div>
          <p style={progressPercent}>60%</p>
        </div>

        <div style={progressCard}>
          <p style={progressTitle}>퀴즈 진행 상황</p>
          <div style={progressBar}>
            <div style={{ ...progressFill, width: "40%" }}></div>
          </div>
          <p style={progressPercent}>40%</p>
        </div>
      </div>

      {/* ✅ 로그아웃 버튼 */}
      <div style={settingsContainer}>
        <button
          style={logoutTextButton}
          onClick={() => {
            alert("로그아웃 되었습니다.");
            navigateTo("login");
          }}
        >
          로그아웃
        </button>
      </div>

      {/* ✅ Bottom Navigation */}
      <div style={bottomNav}>
        <img
          src="/quiz.png"
          alt="Quiz"
          style={navIcon}
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
  transform: "translateY(10%)"
};

const progressContainer = {
  width: "100%",
  maxWidth: "3500px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginBottom: "2rem",
  transform: "translateY(10%)"
};

const progressCard = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
  padding: "clamp(1rem, 2vw, 1.2rem)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.1rem",
};

const progressTitle = {
  fontWeight: 600,
  fontSize: "clamp(0.9rem, 2vw, 1rem)",
  margin: "0.2rem",
  justifyContent: "space-between",
};

const progressBar = {
  width: "100%",
  height: "12px",
  backgroundColor: "#dcdcdc",
  borderRadius: "6px",
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  backgroundColor: "#6EBEFF",
  borderRadius: "4px",
  transition: "width 0.2s ease",
};

const progressPercent = {
  fontSize: "clamp(1rem, 2vw, 1.1rem)",
  color: "#000",
  fontWeight: 500,
};

const settingsContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
};

const logoutTextButton = {
  background: "none",
  border: "none",
  color: "#0483E7",
  fontSize: "clamp(0.8rem, 2vw, 1rem)",
  fontWeight: 500,
  cursor: "pointer",
  padding: "0.3rem 2rem",
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
