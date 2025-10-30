import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SimulationContext } from '../context/SimulationContext';
import BackButton from '../components/BackButton';
import userIcon from '../assets/user.png'; // ✅ 이미지 불러오기

const MyPage = () => {
  const navigate = useNavigate();
  const { history } = useContext(SimulationContext);

  const simulationProgress = Math.min((history.length / 3) * 100, 100);
  const quizProgress = 30;

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <BackButton />
        <h2 style={styles.title}>마이페이지</h2>

        <div style={styles.profile}>
          <img src={userIcon} alt="profile" style={styles.avatar} />
          <div style={styles.username}>소연수 님</div>
        </div>

        <div style={styles.card}>
          <h4 style={styles.cardTitle}>시뮬레이션 진행 상황</h4>
          <ProgressBar percent={simulationProgress} color="#f44336" />
          <p style={styles.progressText}>{Math.round(simulationProgress)}% 완료</p>
        </div>

        <div style={styles.card}>
          <h4 style={styles.cardTitle}>퀴즈 진행 상황</h4>
          <ProgressBar percent={quizProgress} color="#f44336" />
          <p style={styles.progressText}>{quizProgress}% 완료</p>
        </div>

        <button style={styles.settingsButton} onClick={() => navigate('/MyPageSetting')}>
          ⚙️ 설정
        </button>
      </div>
    </div>
  );
};

const ProgressBar = ({ percent, color }) => (
  <div style={styles.progressBarBackground}>
    <div style={{ ...styles.progressBarFill, width: `${percent}%`, backgroundColor: color }} />
  </div>
);

const styles = {
  page: {
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    padding: '24px 16px 60px 16px',
    fontFamily: "'Segoe UI', sans-serif",
    boxSizing: 'border-box',
  },
  wrapper: {
  padding: '0 20px',
  maxWidth: '900px',
  margin: '0 auto',
  height: 'calc(100vh - 100px)', // 헤더/하단 여백 제외
  overflowY: 'auto',             // ✅ 내부만 스크롤
},

  title: {
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: '600',
    textAlign: 'center',
  },
  profile: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  avatar: {
    width: '50px', 
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '12px',
  },
  username: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  cardTitle: {
    fontSize: '17px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  progressBarBackground: {
    width: '100%',
    backgroundColor: '#eee',
    height: '12px',
    borderRadius: '6px',
    marginBottom: '6px',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '6px',
  },
  progressText: {
    fontSize: '14px',
    color: '#555',
    margin: 0,
  },
  settingsButton: {
    display: 'block',
    margin: '40px auto 0',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#333',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default MyPage;
