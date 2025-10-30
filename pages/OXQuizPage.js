import React, { useState } from 'react';
import BackButton from '../components/BackButton';

const oxQuizData = [
  { question: '피싱 문자는 실제 기관 이름을 사칭할 수 있다.', answer: true },
  { question: '모든 문자 메시지는 안전하므로 링크를 클릭해도 된다.', answer: false },
  { question: '피싱 방지를 위해 출처가 불분명한 앱 설치를 자제해야 한다.', answer: true },
];

const OXQuizPage = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const question = oxQuizData[current];

  const handleSelect = (answer) => {
    if (showFeedback) return;
    setSelected(answer);
    setShowFeedback(true);
    if (answer === question.answer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelected(null);
    if (current < oxQuizData.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const progressPercent = ((current + 1) / oxQuizData.length) * 100;

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.headerColumn}>
          <BackButton />
          <h2 style={styles.title}>🅞🅧 퀴즈</h2>
        </div>

        <div style={styles.progressBarContainer}>
          <div style={{ ...styles.progressBarFill, width: `${progressPercent}%` }} />
        </div>

        <div style={styles.quizContent}>
          <p style={styles.question}><strong>Q.</strong> {question.question}</p>

          <div style={styles.buttons}>
            <button
              style={{
                ...styles.button,
                backgroundColor:
                  showFeedback && selected === true
                    ? question.answer === true
                      ? '#C8F7C5'
                      : '#FFCCCC'
                    : '#f5f5f5',
              }}
              onClick={() => handleSelect(true)}
            >
              O
            </button>
            <button
              style={{
                ...styles.button,
                backgroundColor:
                  showFeedback && selected === false
                    ? question.answer === false
                      ? '#C8F7C5'
                      : '#FFCCCC'
                    : '#f5f5f5',
              }}
              onClick={() => handleSelect(false)}
            >
              X
            </button>
          </div>

          {showFeedback && (
            <div style={styles.feedback}>
              {selected === question.answer ? (
                <p style={{ color: 'green' }}>✅ 정답입니다!</p>
              ) : (
                <p style={{ color: 'red' }}>❌ 오답입니다.</p>
              )}
              {current < oxQuizData.length - 1 ? (
                <button style={styles.nextButton} onClick={handleNext}>다음</button>
              ) : (
                <p style={styles.resultText}>
                  완료! 정답 개수: {correctCount} / {oxQuizData.length}
                </p>
              )}
            </div>
          )}
        </div>
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
  },
  wrapper: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBarContainer: {
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
    marginTop: '24px',
    marginBottom: '30px',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ff5c5c',
    transition: 'width 0.3s ease',
  },
  question: {
    fontSize: '18px',
    marginBottom: '100px',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '24px',
  },
  button: {
    padding: '20px 30px',
    fontSize: '28px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    cursor: 'pointer',
    width: '80px',
    transition: 'background-color 0.3s',
  },
  nextButton: {
    marginTop: '16px',
    padding: '10px 20px',
    backgroundColor: '#FF4848',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  feedback: {
    marginTop: '24px',
    textAlign: 'center',
  },
  resultText: {
    marginTop: '16px',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  '@media (max-width: 480px)': {
    title: { fontSize: '18px' },
    question: { fontSize: '16px', marginBottom: '60px' },
    button: { width: '60px', fontSize: '22px', padding: '16px 20px' },
    nextButton: { padding: '8px 16px', fontSize: '14px' },
  },
};

export default OXQuizPage;
