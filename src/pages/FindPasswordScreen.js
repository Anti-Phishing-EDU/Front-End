import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const FindPasswordScreen = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, form.email);
      toast.success("비밀번호 재설정 메일이 발송되었습니다!");
      navigate("/login");
    } catch (err) {
      console.error("비밀번호 재설정 실패:", err);

      if (err.code === "auth/user-not-found") {
        toast.error("등록되지 않은 이메일입니다.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("유효하지 않은 이메일 형식입니다.");
      } else {
        toast.error("이메일 전송 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={outerContainer}>
      <div style={cardContainer}>
        {}
        <button style={backButton} onClick={() => navigate(-1)}>
          ←
        </button>

        <h1 style={title}>비밀번호 찾기</h1>
        <p style={subtitle}>등록된 이메일로 비밀번호 재설정 메일을 보냅니다.</p>

        {}
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {error && <p style={errorStyle}>{error}</p>}

          {}
          {loading ? (
            <p style={{ color: "#0483E7", marginTop: "1rem" }}>📨 이메일 전송 중...</p>
          ) : (
            <button type="submit" style={buttonStyle}>
              비밀번호 재설정
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default FindPasswordScreen;


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
