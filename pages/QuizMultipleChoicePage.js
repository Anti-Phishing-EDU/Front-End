import React, { useState } from 'react';
import BackButton from '../components/BackButton';

const quizData = [
  {
    question: "다음 중 피싱 문자에 해당하는 것은?",
    options: [
      "은행 앱 업데이트 안내 문자",
      "[국세청] 환급금이 있으니 링크 클릭",
      "회사 워크숍 일정 안내",
      "학교 시간표 공지"
    ],
    answer: 1
  },
  {
    question: "피싱 피해를 예방하는 가장 좋은 방법은?",
    options: [
      "문자에 포함된 링크를 바로 클릭한다",
      "모르는 번호여도 무조건 응답한다",
      "의심되는 경우 해당 기관에 직접 연락한다",
      "첨부파일은 먼저 열어본다"
    ],
    answer: 2
  },
];

const QuizMultipleChoicePage = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const question = quizData[current];

  const handleOptionClick = (index) => {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);
    if (index === question.answer) setCorrectCount(prev => prev + 1);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelected(null);
    if (current < quizData.length - 1) setCurrent(prev => prev + 1);
  };

  const progressPercent = ((current + 1) / quizData.length) * 100;

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <BackButton />
          <h1 style={styles.title}>📝 객관식 퀴즈</h1>
        </div>

        <div style={styles.progressBarContainer}>
          <div style={{ ...styles.progressBarFill, width: `${progressPercent}%` }} />
        </div>

        <div style={styles.quizContainer}>
          <p style={styles.question}><strong>Q.</strong> {question.question}</p>

          <ul style={styles.optionList}>
            {question.options.map((opt, idx) => (
              <li
                key={idx}
                onClick={() => handleOptionClick(idx)}
                style={{
                  ...styles.option,
                  backgroundColor: showFeedback
                    ? idx === question.answer
                      ? '#ffe5e5'
                      : idx === selected
                      ? '#f5f5f5'
                      : '#fff'
                    : '#fff',
                  borderColor: showFeedback && idx === question.answer ? '#ff5c5c' : '#ccc',
                }}
              >
                {opt}
              </li>
            ))}
          </ul>

          {showFeedback && (
            <div style={styles.feedback}>
              {selected === question.answer ? (
                <p style={{ color: 'green' }}>✅ 정답입니다!</p>
              ) : (
                <p style={{ color: 'red' }}>
                  ❌ 오답입니다. 정답은 "<strong>{question.options[question.answer]}</strong>"
                </p>
              )}
              {current < quizData.length - 1 ? (
                <button style={styles.nextButton} onClick={handleNext}>다음 문제</button>
              ) : (
                <p style={styles.resultText}>
                  퀴즈 완료! 정답 개수: {correctCount} / {quizData.length}
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
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    marginTop: '10px',
  },
  progressBarContainer: {
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '30px',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ff5c5c',
    transition: 'width 0.3s ease',
  },
  quizContainer: {
    textAlign: 'center',
  },
  question: {
    fontSize: '18px',
    marginBottom: '40px',
  },
  optionList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  option: {
    padding: '14px',
    marginBottom: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '15px',
    transition: 'all 0.2s ease',
  },
  feedback: {
    marginTop: '24px',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: '16px',
    padding: '10px 22px',
    backgroundColor: '#ff5c5c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  resultText: {
    fontWeight: 'bold',
    marginTop: '12px',
  },

  '@media (max-width: 480px)': {
    title: { fontSize: '18px' },
    question: { fontSize: '16px', marginBottom: '30px' },
    option: { fontSize: '13px', padding: '12px' },
    nextButton: { fontSize: '13px', padding: '8px 16px' },
  },
};

export default QuizMultipleChoicePage;