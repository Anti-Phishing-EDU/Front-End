import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !newPassword || !confirmPassword) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    alert('비밀번호가 성공적으로 변경되었습니다.');
    navigate('/');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>비밀번호 변경</h2>
        <p style={styles.subtitle}>이름과 새 비밀번호를 입력하세요.</p>

        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.button}>➜</button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    flexDirection: 'column',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '380px', 
    padding: '32px 24px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '24px',
    color: '#f44336',
    fontWeight: '700',
    marginBottom: '8px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '24px',
    textAlign: 'center',
  },
  input: {
    padding: '14px 16px',
    marginBottom: '14px',
    fontSize: '14px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    width: '100%',
  },
  button: {
    alignSelf: 'center',
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#f44336',
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
  },

  '@media (max-width: 480px)': {
    card: {
      padding: '24px 18px',
      borderRadius: '20px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    },
    title: {
      fontSize: '20px',
    },
    button: {
      width: '46px',
      height: '46px',
      fontSize: '18px',
    },
  },
};

export default ChangePasswordPage;