import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import QuizMenuPage from './pages/QuizMenuPage';
import QuizMultipleChoicePage from './pages/QuizMultipleChoicePage';
import OXQuizPage from './pages/OXQuizPage';
import CasePage from './pages/CasePage';
import SimulationPage from './pages/SimulationPage';
import MyPage from './pages/MyPage';
import MyPageSetting from './pages/MyPageSetting';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import { SimulationProvider } from './context/SimulationContext';

import quizIcon from './assets/quiz.png';
import homeIcon from './assets/home.png';
import simulationIcon from './assets/simulation.png';

function App() {
  const location = useLocation();
  const noBottomNavPaths = [
    '/start',
    '/login',
    '/signup',
    '/forgot-password',
    '/change-password',
  ];
  const hideBottomNav = noBottomNavPaths.includes(location.pathname);

  return (
    <SimulationProvider>
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          {/* ✅ 첫 진입 화면 */}
          <Route path="/start" element={<StartPage />} />

          {/* ✅ 로그인 페이지 */}
          <Route path="/login" element={<LoginPage />} />

          {/* ✅ 회원가입 / 비밀번호 */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />

          {/* ✅ 메인 콘텐츠 */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/quiz" element={<QuizMenuPage />} />
          <Route path="/quiz/mcq" element={<QuizMultipleChoicePage />} />
          <Route path="/quiz/ox" element={<OXQuizPage />} />
          <Route path="/case" element={<CasePage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/MyPageSetting" element={<MyPageSetting />} />

          {/* ✅ 첫 실행 시 /start로 이동 */}
          <Route path="/" element={<Navigate to="/start" replace />} />

          {/* ✅ 존재하지 않는 경로는 로그인으로 이동 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>

      {!hideBottomNav && <BottomNavBar />}
    </SimulationProvider>
  );
}

function BottomNavBar() {
  const navigate = useNavigate();

  return (
    <div style={styles.bottomNav}>
      <button onClick={() => navigate('/quiz/ox')} style={styles.navButton}>
        <img src={quizIcon} alt="quiz" style={styles.navIcon} />
        <div style={styles.navLabel}>퀴즈</div>
      </button>

      <button onClick={() => navigate('/home')} style={styles.navButton}>
        <img src={homeIcon} alt="home" style={styles.navIcon} />
        <div style={styles.navLabel}>홈</div>
      </button>

      <button onClick={() => navigate('/simulation')} style={styles.navButton}>
        <img src={simulationIcon} alt="simulation" style={styles.navIcon} />
        <div style={styles.navLabel}>시뮬레이션</div>
      </button>
    </div>
  );
}

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
  },
  navLabel: {
    fontSize: '12px',
    color: '#333',
  },
};

export default App;
