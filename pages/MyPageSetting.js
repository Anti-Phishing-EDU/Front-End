import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const MyPageSetting = () => {
  const navigate = useNavigate();

  const handleReport = () => {
    window.location.href = 'https://ecrm.police.go.kr/minwon/main';
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <BackButton />
        <h2 style={styles.title}>설정</h2>

        <div style={styles.profile}>
          <div style={styles.avatar}>👩🏻‍💻</div>
          <p style={styles.name}>소연수</p>
        </div>

        <button style={styles.button} onClick={() => navigate('/change-password')}>
          비밀번호 변경
        </button>

        <p style={styles.reportText} onClick={handleReport}> 신고하기</p>
        <p style={styles.logoutText} onClick={() => navigate('/')}> 로그아웃</p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    padding: '24px 16px 60px 16px',
    fontFamily: "'Segoe UI', sans-serif",
    boxSizing: 'border-box',
  },
  wrapper: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '24px',
    textAlign: 'center',
  },
  profile: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  avatar: {
    fontSize: '48px',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    margin: '0 auto 8px',
    lineHeight: '80px',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  button: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#ffcdd2',
    border: '1px solid #ef9a9a',
    borderRadius: '12px',
    marginBottom: '16px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  reportText: {
    color: '#e53935',
    fontSize: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '24px',
  },
  logoutText: {
    color: '#333',
    fontSize: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '8px',
  },
  '@media (max-width: 480px)': {
    title: {
      fontSize: '20px',
    },
    avatar: {
      fontSize: '40px',
      width: '70px',
      height: '70px',
    },
    name: {
      fontSize: '16px',
    },
    button: {
      fontSize: '14px',
      padding: '14px',
    },
    reportText: {
      fontSize: '14px',
    },
    logoutText: {
      fontSize: '14px',
    },
  },
};

export default MyPageSetting;