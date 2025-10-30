import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (!name || !email) {
      alert('이름과 이메일을 모두 입력해주세요!');
      return;
    }
    alert('비밀번호 재설정 링크가 전송되었습니다.');
    navigate('/');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>비밀번호 찾기</h2>
        <p style={styles.subtitle}>
          가입 시 입력한 이름과 이메일을 입력하면 비밀번호 재설정 링크가 전송됩니다.
        </p>

        <input
          style={styles.input}
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button style={styles.Button} onClick={handleReset}>
          →
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '380px',
    padding: '32px 24px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '24px',
    color: '#2196f3',
    fontWeight: '700',
    marginBottom: '8px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '28px',
    textAlign: 'center',
    lineHeight: '1.5',
  },
  input: {
    padding: '14px 16px',
    marginBottom: '14px',
    fontSize: '14px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    outline: 'none',
    width: '100%',
  },
  Button: {
    alignSelf: 'center',
    backgroundColor: '#2196f3',
    border: 'none',
    borderRadius: '50%',
    color: '#fff',
    fontSize: '18px',
    width: '48px',
    height: '48px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
  },


  '@media (max-width: 480px)': {
    card: {
      padding: '24px 18px',
      borderRadius: '20px',
    },
    title: {
      fontSize: '20px',
    },
    subtitle: {
      fontSize: '12px',
    },
    Button: {
      width: '42px',
      height: '42px',
      fontSize: '16px',
    },
  },
};

export default ForgotPasswordPage;
