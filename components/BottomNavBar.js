import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const styles = {
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '700px',
    height: '60px',
    backgroundColor: '#f0f0f0',
    borderTop: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1000,
  },
  navButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  navLabel: {
    fontSize: '12px',
    marginTop: '2px',
  },
};

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getColor = (path) =>
    location.pathname === path ? '#D32F2F' : '#999999'; // 선택된 탭만 빨간색
  
  return (
    <div style={styles.bottomNav}>
      <button
        onClick={() => navigate('/community')}
        style={{ ...styles.navButton, color: getColor('/community') }}
      >
        🗣
        <div style={styles.navLabel}>커뮤니티</div>
      </button>
      <button
        onClick={() => navigate('/home')}
        style={{ ...styles.navButton, color: getColor('/home') }}
      >
        🏠
        <div style={styles.navLabel}>홈</div>
      </button>
      <button
        onClick={() => navigate('/mypage')}
        style={{ ...styles.navButton, color: getColor('/mypage') }}
      >
        👤
        <div style={styles.navLabel}>마이페이지</div>
      </button>
    </div>
  );
};

export default BottomNavBar;

