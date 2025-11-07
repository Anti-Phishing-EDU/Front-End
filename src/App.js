import React, { useState, useEffect } from "react";
import "./styles/global.css";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import FindPasswordScreen from "./screens/FindPasswordScreen";
import HomePageScreen from "./screens/HomePageScreen";
import QuizSelectScreen from "./screens/QuizSelectScreen";
import QuizChoiceScreen from "./screens/QuizChoiceScreen";
import QuizOXScreen from "./screens/QuizOXScreen";
import SimulationScreen from "./screens/SimulationScreen";
import MyPageScreen from "./screens/MypageScreen";
function App() {
  const [currentScreen, setCurrentScreen] = useState("splash");

  
  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => setCurrentScreen("signup"), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  switch (currentScreen) {
    case "splash":
      return <SplashScreen />;

    case "login":
      return (
        <LoginScreen
          goFindPassword={() => setCurrentScreen("findPassword")}
          onLoginSuccess={() => setCurrentScreen("home")}
        />
      );

    case "signup":
      return <SignupScreen goLogin={() => setCurrentScreen("login")} />;

    case "findPassword":
      return <FindPasswordScreen goLogin={() => setCurrentScreen("login")} />;

    case "home":
      return (
        <HomePageScreen navigateTo={(target) => setCurrentScreen(target)} />
      );

    case "quiz":
      return (
        <QuizSelectScreen navigateTo={(target) => setCurrentScreen(target)} />
      );

    case "quiz_choice":
      return (
        <QuizChoiceScreen navigateTo={(target) => setCurrentScreen(target)} />
      );

    case "quiz_ox":
      return (
        <QuizOXScreen navigateTo={(target) => setCurrentScreen(target)} />
      );

    case "simulation":
      return (
        <SimulationScreen navigateTo={(target) => setCurrentScreen(target)} />
      );

    case "mypage": 
      return <MyPageScreen navigateTo={(target) => setCurrentScreen(target)} />;
  

    default:
 
      return <SplashScreen />;
  }
}

export default App;
