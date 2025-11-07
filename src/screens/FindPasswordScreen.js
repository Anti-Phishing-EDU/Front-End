import React, { useState } from "react";
import "../styles/global.css";

const FindPasswordScreen = ({ goLogin }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!form.name) {
      setError("이름을 입력해주세요.");
      return;
    }

    setError("");
    alert("비밀번호 재설정 링크를 이메일로 전송했습니다.");
    goLogin(); 
  };

  return (
    <div style={outerContainer}>
      <div style={cardContainer}>
        <h1 style={title}>비밀번호찾기</h1>
        <p style={subtitle}>등록된 이름과 이메일을 입력해주세요.</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" style={buttonStyle}>
            비밀번호찾기
          </button>
        </form>
      </div>
    </div>
  );
};

const outerContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#EAF5FF",
  padding: "0 10vw",
  boxSizing: "border-box",
};

const cardContainer = {
  width: "100%",
  maxWidth: "420px",
  background: "#fff",
  borderRadius: "22px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
  padding: "5vh 5vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "2vh",
};

const title = {
  color: "#6EBEFF",
  fontSize: "clamp(1.8rem, 3vw, 2rem)",
  fontWeight: 700,
  marginBottom: "0.3rem",
};

const subtitle = {
  color: "#777",
  fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
  marginBottom: "1.5rem",
};

const formStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1vh",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "clamp(0.9rem, 2vw, 1rem)",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  backgroundColor: "#6EBEFF",
  color: "#fff",
  fontSize: "1rem",
  border: "none",
  alignSelf: "center",
  marginTop: "1.2rem",
  cursor: "pointer",
  transition: "background 0.3s",
};

const errorStyle = {
  color: "red",
  fontSize: "0.85rem",
  textAlign: "center",
  marginTop: "0.3rem",
};

export default FindPasswordScreen;
