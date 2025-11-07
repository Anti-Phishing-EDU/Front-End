import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import { auth } from "../firebase";  
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { toast } from "react-toastify";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    setError("모든 항목을 입력해주세요.");
    return;
  }

  try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      toast.success(" 로그인 성공!");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } catch (err) {
      console.error("로그인 실패:", err);
      if (err.code === "auth/user-not-found") {
        toast.error("등록되지 않은 이메일입니다.");
      } else if (err.code === "auth/wrong-password") {
        toast.error("비밀번호가 일치하지 않습니다.");
      } else {
        toast.error("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={outerContainer}>
      <div style={cardContainer}>
        <h1 style={title}>Welcome</h1>
        <p style={subtitle}>피싱 예방 교육 플랫폼에 오신 것을 환영합니다.</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
          />

          {error && <p style={errorStyle}>{error}</p>}
          <button type="submit" style={buttonStyle}>
            로그인
          </button>
        </form>

        <div style={linkBox}>
          <span
            style={{ ...linkText, color: "#0483e7" }}
            onClick={() => navigate("/signup")}
          >
            회원가입
          </span>
          <span
            style={{ ...linkText, color: "#0483e7" }}
            onClick={() => navigate("/find-password")}
          >
            비밀번호 찾기
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;


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
  marginBottom: "0rem",
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

const linkBox = {
  display: "flex",
  justifyContent: "space-between",
  width: "90%",
  marginTop: "1rem",
  padding: "0 10px",
};

const linkText = {
  fontSize: "0.8rem",
  color: "#0483e7",
  cursor: "pointer",
  userSelect: "none",
};

const errorStyle = {
  color: "red",
  fontSize: "0.85rem",
  textAlign: "center",
  marginTop: "0.3rem",
};
