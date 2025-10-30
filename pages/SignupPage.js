import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignup = () => {
    if (!name || !email || !password || !confirm) {
      alert('모든 항목을 입력해주세요!');
      return;
    }
    if (password !== confirm) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
    }
    alert('회원가입이 완료되었습니다!');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Sign Up</h1>
        <p style={styles.subtitle}>회원가입을 통해 피싱 방지 교육을 시작하세요.</p>

        <input
          type="text"
          style={styles.input}
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          style={styles.input}
          placeholder="비밀번호 확인"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <div style={styles.actions}>
          <button style={styles.SignUpButton} onClick={handleSignup}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '400px',
    padding: '36px 28px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '28px',
    color: '#2196f3',
    fontWeight: '700',
    marginBottom: '8px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#999',
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
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '12px',
  },
  SignUpButton: {
    backgroundColor: '#2196f3',
    border: 'none',
    borderRadius: '50%',
    color: '#fff',
    fontSize: '20px',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
  },


  '@media (max-width: 480px)': {
    card: { padding: '28px 18px' },
    title: { fontSize: '22px' },
    subtitle: { fontSize: '12px' },
    input: { fontSize: '13px', padding: '12px 14px' },
    SignUpButton: { width: '42px', height: '42px', fontSize: '18px' },
  },
};

export default SignupPage;
