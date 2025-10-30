import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const StartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); 
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <img src={logo} alt="PHISHIELD logo" style={styles.logo} />
      <h1 style={styles.title}>PHISHIELD</h1>
      <p style={styles.subtitle}>AI PHISHING RESPONSE SIMULATION</p>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
    color: '#2196f3',
    fontFamily: "'Segoe UI', sans-serif",
    textAlign: 'center',
  },
  logo: {
    width: '180px',
    height: '180px',
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '13px',
    letterSpacing: '1px',
    opacity: 0.9,
  },
};

export default StartPage;
