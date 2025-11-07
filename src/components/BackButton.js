import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to || -1)}
      style={{
        position: "absolute",
        top: "1.2rem",
        left: "1.2rem",
        background: "none",
        border: "none",
        color: "#0483E7",
        fontSize: "1.2rem",
        fontWeight: "600",
        cursor: "pointer",
        padding: "6px 10px",
      }}
    >
      ← 
    </button>
  );
};

export default BackButton;