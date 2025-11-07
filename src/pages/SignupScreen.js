import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const SignupScreen = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.confirmPassword) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      toast.success("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      console.error("회원가입 실패:", err);

      if (err.code === "auth/email-already-in-use") {
        toast.error("이미 등록된 이메일입니다.");
      } else if (err.code === "auth/weak-password") {
        toast.error("비밀번호는 6자 이상이어야 합니다.");
      } else {
        toast.error("회원가입 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={outerContainer}>
      <div style={cardContainer}>
        <button style={backButton} onClick={() => navigate(-1)}>
          ←
        </button>

        <h1 style={title}>Sign Up</h1>
        <p style={subtitle}>회원가입을 통해 피싱 예방 교육을 시작하세요.</p>

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

        <p style={loginText}>
          이미 계정이 있으신가요?{" "}
          <span style={loginLink} onClick={() => navigate("/login")}>
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
  backgroundColor: "#F5F5F5",
  padding: "0 10vw",
  boxSizing: "border-box",
};

const cardContainer = {
  position: "relative",
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

const backButton = {
  position: "absolute",
  top: "18px",
  left: "20px",
  background: "none",
  border: "none",
  fontSize: "20px",
  color: "#6EBEFF",
  cursor: "pointer",
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
