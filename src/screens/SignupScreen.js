import React, { useState } from "react";
import "../styles/global.css";

const SignupScreen = ({ goLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError("");
    alert("회원가입 완료!");
    goLogin(); 
  };

  return (
    <div style={outerContainer}>
      <div style={cardContainer}>
        {/* ✅ 제목 영역 */}
        <h1 style={title}>Sign Up</h1>
        <p style={subtitle}>회원가입을 통해 피싱 예방 교육을 시작하세요.</p>

        {/* ✅ 입력 폼 */}
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
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" style={buttonStyle}>
            회원가입
          </button>
        </form>

        {/* ✅ 로그인으로 이동 */}
        <p style={loginText}>
          이미 계정이 있으신가요?{" "}
          <span style={loginLink} onClick={() => goLogin()}>
            로그인
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupScreen;

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
  fontStyle: "italic",
  marginBottom: "0.3rem",
};

const subtitle = {
  color: "#777",
  fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
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
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  backgroundColor: "#6EBEFF",
  color: "#fff",
  fontSize: "1rem",
  border: "none",
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

const loginText = {
  marginTop: "1rem",
  color: "#555",
  fontSize: "0.9rem",
};

const loginLink = {
  color: "#0483E7",
  cursor: "pointer",
  fontWeight: 500,
};
