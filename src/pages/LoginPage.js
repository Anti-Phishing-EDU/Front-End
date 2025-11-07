import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    navigate('/home');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome</h1>
        <p style={styles.subtitle}>
          피싱 예방 교육 플랫폼에 오신 것을 환영합니다.
        </p>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <div style={styles.actions}>
          <button style={styles.loginButton} onClick={handleLogin}>→</button>
        </div>

        <div style={styles.footer}>
          <span style={styles.link} onClick={() => navigate('/signup')}>회원가입</span>
          <span style={styles.link} onClick={() => navigate('/forgot-password')}>비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
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
    padding: '36px 26px',
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
    marginBottom: '30px',
    textAlign: 'center',
    lineHeight: '1.4',
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
    marginBottom: '28px',
  },
  loginButton: {
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
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#2196f3',
  },
  link: {
    cursor: 'pointer',
    transition: 'color 0.2s',
  },


  '@media (max-width: 480px)': {
    card: {
      padding: '28px 18px',
    },
    title: {
      fontSize: '22px',
    },
    input: {
      fontSize: '13px',
      padding: '12px 14px',
    },
    loginButton: {
      width: '44px',
      height: '44px',
      fontSize: '18px',
    },
    footer: {
      fontSize: '12px',
    },
  },
};

export default LoginPage;
