import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import BottomNavBar from './components/BottomNavBar';

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
      <div style={{ minHeight: '100dvh' }}>
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

export default App;
