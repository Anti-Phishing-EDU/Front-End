import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import quizIcon from '../assets/quiz.png';
import homeIcon from '../assets/home.png';
import simulationIcon from '../assets/simulation.png';

const styles = {
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '8px 0',
    boxShadow: '0 -2px 6px rgba(0,0,0,0.05)',
    zIndex: 1000,
  },
  navButton: {
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#333',
  },
  navIcon: {
    width: '26px',
    height: '26px',
    marginBottom: '4px',
    objectFit: 'contain',
    filter: 'grayscale(100%)',
  },
  navLabel: {
    fontSize: '12px',
  },
  active: {
    color: '#D32F2F',
  },
  activeIcon: {
    filter: 'none',
  },
};

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.bottomNav}>
      <button
        onClick={() => navigate('/quiz/ox')}
        style={{
          ...styles.navButton,
          ...(isActive('/quiz/ox') ? styles.active : {}),
        }}
      >
        <img
          src={quizIcon}
          alt="quiz"
          style={{
            ...styles.navIcon,
            ...(isActive('/quiz/ox') ? styles.activeIcon : {}),
          }}
        />
        <div style={styles.navLabel}>퀴즈</div>
      </button>

      <button
        onClick={() => navigate('/home')}
        style={{
          ...styles.navButton,
          ...(isActive('/home') ? styles.active : {}),
        }}
      >
        <img
          src={homeIcon}
          alt="home"
          style={{
            ...styles.navIcon,
            ...(isActive('/home') ? styles.activeIcon : {}),
          }}
        />
        <div style={styles.navLabel}>홈</div>
      </button>

      <button
        onClick={() => navigate('/simulation')}
        style={{
          ...styles.navButton,
          ...(isActive('/simulation') ? styles.active : {}),
        }}
      >
        <img
          src={simulationIcon}
          alt="simulation"
          style={{
            ...styles.navIcon,
            ...(isActive('/simulation') ? styles.activeIcon : {}),
          }}
        />
        <div style={styles.navLabel}>시뮬레이션</div>
      </button>
    </div>
  );
};

export default BottomNavBar;

