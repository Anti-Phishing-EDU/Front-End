import React, { useState, useContext } from 'react';
import { SimulationContext } from '../context/SimulationContext';
import BackButton from '../components/BackButton';

const scenarios = [
  "[OO은행] 고객님의 계좌가 정지되었습니다. 복구를 원하시면 링크를 클릭해 주세요: http://fakebank.com",
  "복구를 위해 인증번호를 입력해 주세요.",
  "인증이 확인되지 않으면 계좌가 폐쇄됩니다. 지금 바로 처리하세요.",
];

const SimulationPage = () => {
  const { addToHistory } = useContext(SimulationContext);
  const [step, setStep] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [chatLog, setChatLog] = useState([{ text: scenarios[0], isBot: true }]);
  const [finished, setFinished] = useState(false);

  const handleSubmit = () => {
    if (!userResponse.trim()) return;

    const feedback = evaluateResponse(userResponse);
    const newChat = [
      { text: userResponse, isBot: false },
      { text: feedback, isBot: true }
    ];

    setChatLog(prev => [...prev, ...newChat]);

    addToHistory({
      step,
      message: scenarios[step],
      userResponse,
      feedback
    });

    setUserResponse('');

    if (step < scenarios.length - 1) {
      setTimeout(() => {
        setStep(prev => prev + 1);
        setChatLog(prev => [...prev, { text: scenarios[step + 1], isBot: true }]);
      }, 800);
    } else {
      setFinished(true);
    }
  };

  const evaluateResponse = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("무시") || lower.includes("삭제") || lower.includes("신고")) {
      return "✅ 올바른 대응입니다!";
    } else if (lower.includes("클릭") || lower.includes("입력")) {
      return "❌ 잘못된 대응입니다. 피싱에 주의하세요.";
    }
    return "ℹ️ 피싱 메시지는 클릭하지 않고 무시하거나 신고하는 것이 좋아요.";
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
      
        <div style={styles.header}>
          <BackButton />
          <h2 style={styles.title}>시뮬레이션</h2>
        </div>

       
        <div style={styles.chatWrapper}>
          {chatLog.map((msg, idx) => (
            <div
              key={idx}
              style={msg.isBot ? styles.botBubble : styles.userBubble}
            >
              {msg.text}
            </div>
          ))}
        </div>

        
        {!finished ? (
          <div style={styles.inputWrapper}>
            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="답변을 입력하세요..."
              rows={3}
              style={styles.textArea}
            />
            <button onClick={handleSubmit} style={styles.button}>
              답변하기
            </button>
          </div>
        ) : (
          <div style={styles.finishedMessage}>
            <p>🎉 시뮬레이션이 완료되었습니다.</p>
          </div>
        )}
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
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    maxWidth: '700px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    marginLeft: '8px',
  },
  chatWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flexGrow: 1,
    overflowY: 'auto',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '16px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    minHeight: '400px',
  },
  inputWrapper: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  textArea: {
    borderRadius: '10px',
    padding: '12px',
    border: '1px solid #ccc',
    fontSize: '14px',
    resize: 'none',
    width: '100%',
    minHeight: '80px',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#ff5b5b',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffe4e4',
    color: '#333',
    padding: '10px 14px',
    borderRadius: '14px',
    maxWidth: '85%',
    wordBreak: 'keep-all',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff5c5c',
    color: 'white',
    padding: '10px 14px',
    borderRadius: '14px',
    maxWidth: '85%',
    wordBreak: 'keep-all',
  },
  finishedMessage: {
    marginTop: '24px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#555',
  },

  
  '@media (max-width: 480px)': {
    title: { fontSize: '18px' },
    chatWrapper: { minHeight: '300px', padding: '12px' },
    textArea: { fontSize: '13px', minHeight: '60px' },
    button: { fontSize: '13px', padding: '10px' },
    botBubble: { fontSize: '13px', padding: '8px 12px' },
    userBubble: { fontSize: '13px', padding: '8px 12px' },
  },
};

export default SimulationPage;
