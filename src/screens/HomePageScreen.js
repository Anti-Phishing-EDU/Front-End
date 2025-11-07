import React, { useState, useEffect } from "react";
import "../styles/global.css";

const phishingAlerts = [
  "[은행 사칭] ‘계좌 이상 거래 감지’ 문자 클릭 주의!",
  "[택배 피싱] ‘배송 지연 안내’ 링크 클릭 금지!",
  "[환급금 사기] 국세청 사칭 문자로 개인정보 탈취 시도!",
];

const phishingCases = [
  {
    title: "OO은행 보안인증 사칭 문자",
    summary: "‘계좌 잠금 해제’ 안내 링크 클릭 유도 → 보안카드 유출 사례",
  },
  {
    title: "택배 배송조회 스미싱",
    summary: "‘운송장 번호 확인’ 문구로 악성앱 설치 유도한 사례",
  },
  {
    title: "공공기관 환급금 안내 사기",
    summary: "‘환급 대상 조회’ 링크를 통해 계좌정보 탈취된 사례",
  },
];

const HomePageScreen = ({ navigateTo }) => {
  const [currentAlert, setCurrentAlert] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % phishingAlerts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={outerContainer}>
      {/* ✅ Header */}
      <div style={header}>
        <h2 style={logoText}>PHISHIELD</h2>
        <img
          src="/user.png"
          alt="User"
          style={profileIcon}
          onClick={() => navigateTo("mypage")}
        />
      </div>

      {/* ✅ Alert Banner */}
      <div style={alertBanner}>
        <p style={alertText}>{phishingAlerts[currentAlert]}</p>
      </div>

      {/* ✅ Section Title */}
      <div style={sectionTitle}>
        <h3 style={mainTitle}>최신 피싱 사례</h3>
        <p style={subtitle}>최근 발견된 주요 피싱 사례를 확인하세요.</p>
      </div>

      {/* ✅ Case List */}
      <div style={caseList}>
        {phishingCases.map((item, index) => (
          <div key={index} style={caseCard}>
            <h4 style={caseTitle}>{item.title}</h4>
            <p style={caseSummary}>{item.summary}</p>
          </div>
        ))}
      </div>

      {/* ✅ Bottom Nav */}
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
          style={{ ...navIcon, ...navIconActive }}
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

export default HomePageScreen;

const outerContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#EAF5FF",
  padding: "3vh 5vw 10vh",
  boxSizing: "border-box",
  fontFamily: "'Inter', sans-serif",
  transition: "all 0.3s ease",
};

const header = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1.5rem",
};

const logoText = {
  color: "#0483E7",
  fontWeight: 800,
  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
};

const profileIcon = {
  width: "clamp(28px, 5vw, 36px)",
  height: "auto",
  cursor: "pointer",
};

const alertBanner = {
  width: "100%",
  background: "linear-gradient(90deg, #7CC9FF, #A8D8FF)", // ✅ 부드러운 블루톤
  borderRadius: "0px",
  padding: "1.2rem 1rem",
  marginBottom: "2rem",
  marginTop: "1.5rem",
  textAlign: "center",
  boxShadow: "0 3px 8px rgba(0, 0, 0, 0.05)",
};

const alertText = {
  color: "#fff",
  fontWeight: 600,
  fontSize: "clamp(0.9rem, 2vw, 1rem)",
  margin: 0,
};

const sectionTitle = {
  textAlign: "center",
  marginBottom: "1.5rem",
};

const mainTitle = {
  fontSize: "clamp(1.5rem, 3vw, 1rem)",
  fontWeight: 700,
  marginBottom: "0.4rem",
};

const subtitle = {
  color: "#555",
  fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
};

const caseList = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  maxWidth: "520px",
  flex: 1,
};

const caseCard = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
  padding: "1.2rem 1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  transition: "transform 0.2s ease",
  cursor: "default",
};

const caseTitle = {
  color: "#000",
  fontWeight: 700,
  fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
  margin: 0,
};

const caseSummary = {
  fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
  color: "#444",
  margin: 0,
  lineHeight: 1.5,
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
