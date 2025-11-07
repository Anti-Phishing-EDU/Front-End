import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const QuizMenuPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <BackButton />
          <h1 style={styles.title}>퀴즈 유형 선택</h1>
        </div>

        <div style={styles.menuContainer}>
          <div style={styles.card} onClick={() => navigate('/quiz/mcq')}>
            <span style={styles.emoji}>📝</span>
            <div>
              <h2 style={styles.cardTitle}>객관식 퀴즈</h2>
              <p style={styles.cardSubtitle}>여러 선택지 중 정답을 골라보세요</p>
            </div>
          </div>

          <div style={styles.card} onClick={() => navigate('/quiz/ox')}>
            <span style={styles.emoji}>⭕❌</span>
            <div>
              <h2 style={styles.cardTitle}>OX 퀴즈</h2>
              <p style={styles.cardSubtitle}>O 또는 X로 판단해보세요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#f9f9f9',
    minHeight: '100dvh',
    padding: '24px 16px 72px 16px',
    fontFamily: "'Segoe UI', sans-serif",
  },
  wrapper: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '28px',
    textAlign: 'center',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    margin: '8px 0',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '22px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  emoji: {
    fontSize: '30px',
    marginRight: '16px',
  },
  cardTitle: {
    fontSize: '18px',
    margin: 0,
  },
  cardSubtitle: {
    fontSize: '13px',
    marginTop: '4px',
    color: '#666',
  },
  '@media (max-width: 480px)': {
    title: { fontSize: '18px' },
    card: { padding: '16px', borderRadius: '12px' },
    emoji: { fontSize: '26px', marginRight: '12px' },
    cardTitle: { fontSize: '16px' },
    cardSubtitle: { fontSize: '12px' },
  },
};

export default QuizMenuPage;
