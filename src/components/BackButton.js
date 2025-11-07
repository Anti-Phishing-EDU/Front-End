import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        marginBottom: '16px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#2196f3',
        fontSize: '16px',
        cursor: 'pointer',
        padding: '0',
      }}
    >
      ← 
    </button>
  );
};

export default BackButton;
