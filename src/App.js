import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.css";

import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import SignupScreen from "./pages/SignupScreen";
import FindPasswordScreen from "./pages/FindPasswordScreen";
import HomePageScreen from "./pages/HomePageScreen";
import QuizSelectScreen from "./pages/QuizSelectScreen";
import QuizChoiceScreen from "./pages/QuizChoiceScreen";
import QuizOXScreen from "./pages/QuizOXScreen";
import SimulationScreen from "./pages/SimulationScreen";
import MyPageScreen from "./pages/MypageScreen";

function SplashRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return <SplashScreen />;
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SplashRedirect />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/find-password" element={<FindPasswordScreen />} />
          <Route path="/home" element={<HomePageScreen />} />
          <Route path="/quiz" element={<QuizSelectScreen />} />
          <Route path="/quiz_choice" element={<QuizChoiceScreen />} />
          <Route path="/quiz_ox" element={<QuizOXScreen />} />
          <Route path="/simulation" element={<SimulationScreen />} />
          <Route path="/mypage" element={<MyPageScreen />} />
        </Routes>
      </Router>

      {}
      <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar />
    </>
  );
}

export default App;
