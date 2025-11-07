// src/pages/SimulationPage.jsx
import React, { useState, useContext, useEffect, useMemo, useRef } from 'react';
import { SimulationContext } from '../context/SimulationContext';
import BackButton from '../components/BackButton';
import { Client } from '@gradio/client';

/** =========================
 * 기존 시나리오 (원본 유지 + 소소한 개선)
 * ========================= */
const scenarios = [
  "[OO은행] 고객님의 계좌가 정지되었습니다. 복구를 원하시면 링크를 클릭해 주세요: http://fakebank.com",
  "복구를 위해 인증번호를 입력해 주세요.",
  "인증이 확인되지 않으면 계좌가 폐쇄됩니다. 지금 바로 처리하세요.",
];

/** =========================
 * Gradio AI 어시스턴트 (내부 컴포넌트)
 * - HTML 인라인 스크립트를 React/JS로 변환
 * - 외부 script 태그 불필요
 * ========================= */
function AIAssistant({
  baseUrl = "/gradio", //https://2b3b80943a762565f3.gradio.live
  apiName = "/chat",
}) {
  // DOM refs
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const sendRef = useRef(null);
  const statusRef = useRef(null);
  const readyRef = useRef(null);
  const typingRef = useRef(null);

  // 상태
  const [history, setHistory] = useState([]);
  const [busy, setBusy] = useState(false);
  const [client, setClient] = useState(null);
  const [currentJob, setCurrentJob] = useState(null);

  // 진행 중 작업 ref(클린업용)
  const jobRef = useRef(null);

  // 세션 해시
  const sessionHash = useMemo(() => crypto.randomUUID(), []);

  // 시간 포맷
  const getTime = () =>
    new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

  // 상태/표시 유틸
  const showTyping = (show) => {
    if (typingRef.current) typingRef.current.style.display = show ? 'flex' : 'none';
  };
  const updateStatus = (text, generating = false) => {
    if (statusRef.current) {
      statusRef.current.textContent = text;
      statusRef.current.classList.toggle('generating', generating);
    }
  };
  const setDotOnline = (online) => {
    if (!readyRef.current) return;
    readyRef.current.classList.toggle('online', online);
    readyRef.current.classList.toggle('offline', !online);
  };
  const setBusyUI = (b) => {
    setBusy(b);
    showTyping(b);
    if (sendRef.current) {
      sendRef.current.disabled = b;
      sendRef.current.classList.toggle('disabled', b);
    }
    updateStatus(b ? '답변 생성 중' : '온라인', b);
  };
  const finishReset = () => {
    setBusyUI(false);
    if (inputRef.current) inputRef.current.focus();
    setCurrentJob(null);
    jobRef.current = null;
  };

  // 말풍선 렌더 (CSS 클래스와 일치)
  const appendBubble = (role, content) => {
    const logEl = logRef.current;
    if (!logEl) return;

    const wrap = document.createElement('div');
    wrap.className = role === 'user' ? 'ai-msg-wrap ai-user' : 'ai-msg-wrap ai-bot';

    const avatar = document.createElement('div');
    avatar.className = 'ai-avatar';

    const container = document.createElement('div');

    const bubble = document.createElement('div');
    bubble.className = 'ai-msg';
    bubble.textContent = content;

    const time = document.createElement('div');
    time.className = 'ai-time';
    time.textContent = getTime();

    container.appendChild(bubble);
    container.appendChild(time);

    if (role === 'user') {
      wrap.appendChild(container);
      wrap.appendChild(avatar);
    } else {
      wrap.appendChild(avatar);
      wrap.appendChild(container);
    }

    logEl.appendChild(wrap);
    requestAnimationFrame(() => wrap.classList.add('show'));
    logEl.scrollTop = logEl.scrollHeight;
  };

  const renderFromHistory = (arr) => {
    const logEl = logRef.current;
    if (!logEl) return;
    logEl.innerHTML = '';
    for (const m of arr) appendBubble(m.role, m.content);
  };

  // 초기 연결 (동적 import로 Client 로드)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!mounted) return;
        const c = await Client.connect(baseUrl, { events: ['data', 'status'] });
        setClient(c);

        setDotOnline(true);
        updateStatus('온라인');
        if (inputRef.current) inputRef.current.focus();

        setTimeout(() => {
          setHistory((prev) => {
            const next = [
              ...prev,
              {
                role: 'assistant',
                content: '안녕하세요! 피싱 방어 AI 어시스턴트입니다. 의심스러운 메시지나 링크가 있으시면 언제든 질문해주세요. 🛡️',
              },
            ];
            renderFromHistory(next);
            return next;
          });
        }, 300);
      } catch (err) {
        console.error(err);
        setDotOnline(false);
        updateStatus('오프라인');
      }
    })();

    return () => {
      mounted = false;
      try { jobRef.current?.cancel?.(); } catch {}
    };
  }, [baseUrl, apiName]); // ✅ 필요한 의존성만

  // 전송
  const send = async () => {
    if (busy) return;
    if (!inputRef.current) return;

    const text = inputRef.current.value.trim();
    if (!text) return;
    if (!client) {
      alert('서버 연결을 확인하세요.');
      return;
    }

    const preHistory = [...history];
    const nextHistory = [...history, { role: 'user', content: text }];
    setHistory(nextHistory);
    renderFromHistory(nextHistory);
    inputRef.current.value = '';
    inputRef.current.style.height = 'auto';

    try { jobRef.current?.cancel?.(); } catch {}

    setBusyUI(true);

    try {
      const job = client.submit(
        apiName,
        [
          text,
          preHistory,
          "You are a helpful assistant.",
          0.3,    // temperature
          0.9,    // top_p
          40,     // top_k
          512,    // max_new_tokens
          1.05    // repetition_penalty
        ],
        { session_hash: sessionHash }
      );
      setCurrentJob(job);
      jobRef.current = job;

      for await (const ev of job) {
        if (ev.type === 'status') {
          const stage = ev.stage ?? ev.status?.stage ?? ev.status?.status ?? '';
          if (stage === 'complete' || stage === 'error') {
            finishReset();
            break;
          }
          continue;
        }
        if (ev.type === 'data') {
          const [chatState] = ev.data;
          if (Array.isArray(chatState)) {
            setHistory(chatState);
            renderFromHistory(chatState);
          }
        }
      }
    } catch (e) {
      console.error('stream error:', e);
      updateStatus('오류 발생');
    } finally {
      finishReset();
    }
  };

  // 입력 자동 높이 & 단축키
  const onInput = () => {
    if (!inputRef.current) return;
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
  };
  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // 간단한 스타일(클래스용). 충돌 방지 위해 범위를 좁힌 클래스 사용
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .ai-root { background: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; }
      .ai-header { background: #1e293b; border-bottom: 1px solid #334155; padding: 12px 16px; }
      .ai-title { display:flex; align-items:center; gap:10px; font-weight:600; }
      .ai-status { font-size:12px; color:#94a3b8; margin-top:4px; }
      .ai-dot { width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:6px; }
      .ai-dot.online { background:#10b981; box-shadow:0 0 6px #10b981; }
      .ai-dot.offline { background:#f59e0b; }
      .ai-main { display:flex; flex-direction:column; height:38dvh; }
      .ai-log { flex:1; overflow:auto; padding:16px; background:#1a1f35; display:flex; flex-direction:column; gap:12px; }
      .ai-msg-wrap { display:flex; gap:10px; align-items:flex-end; opacity:0; transform:translateY(8px); transition:all .25s ease; }
      .ai-msg-wrap.show { opacity:1; transform:translateY(0); }
      .ai-user .ai-msg { background: linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:#fff; border-bottom-right-radius:4px; }
      .ai-bot .ai-msg { background:#2d3748; color:#f8fafc; border:1px solid #334155; border-bottom-left-radius:4px; }
      .ai-msg { padding:10px 14px; border-radius:16px; line-height:1.5; font-size:14px; max-width:65%; }
      .ai-time { font-size:11px; color:#94a3b8; margin-top:2px; padding:0 6px; }
      .ai-typing { display:none; gap:8px; align-items:center; padding:8px 16px; background:#1e293b; border-top:1px solid #334155; }
      .ai-input { display:flex; gap:8px; padding:12px; background:#1e293b; border-top:1px solid #334155; }
      .ai-input textarea { flex:1; background:#1a1f35; color:#f8fafc; border:2px solid #334155; border-radius:10px; padding:10px 12px; resize:none; min-height:40px; max-height:100px; }
      .ai-input textarea::placeholder { color:#94a3b8; }
      .ai-input button { min-width:72px; background: linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%); color:#fff; font-weight:600; border:none; border-radius:10px; padding:10px 14px; cursor:pointer; }
      .ai-input button.disabled { opacity:.6; cursor:not-allowed; }
      .ai-avatar { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%); }
      .ai-user .ai-avatar { background: linear-gradient(135deg,#f093fb 0%,#f5576c 100%); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section className="ai-root">
      <div className="ai-header">
        <div className="ai-title">
          <span className="ai-dot offline" ref={readyRef} />
          <span>피싱 방어 AI 어시스턴트</span>
        </div>
        <div className="ai-status">
          <span id="status" ref={statusRef}>대기 중</span>
        </div>
      </div>

      <div className="ai-main">
        <div id="log" className="ai-log" ref={logRef} />

        <div id="typing-indicator" className="ai-typing" ref={typingRef}>
          <div className="ai-avatar" />
          <div>입력 중...</div>
        </div>

        <div className="ai-input">
          <textarea
            id="msg"
            ref={inputRef}
            rows={1}
            placeholder="의심스러운 메시지나 링크를 입력하세요..."
            onInput={onInput}
            onKeyDown={onKeyDown}
          />
          <button id="send" ref={sendRef} onClick={send}>전송</button>
        </div>
      </div>
    </section>
  );
}

/** =========================
 * 메인 페이지 (기존 시뮬레이션 + AI 섹션)
 * ========================= */
function SimulationPage() {
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
      { text: feedback, isBot: true },
    ];

    setChatLog(prev => [...prev, ...newChat]);

    addToHistory({
      step,
      message: scenarios[step],
      userResponse,
      feedback,
    });

    setUserResponse('');

    if (step < scenarios.length - 1) {
      setTimeout(() => {
        const nextStep = step + 1; // 안전하게 nextStep 사용
        setStep(nextStep);
        setChatLog(prev => [...prev, { text: scenarios[nextStep], isBot: true }]);
      }, 800);
    } else {
      setFinished(true);
    }
  };

  const evaluateResponse = (input) => {
    const norm = input.replace(/\s+/g, '').trim();
    if (/(무시|삭제|신고|차단|의심|고객센터직접연락|확인전화)/.test(norm)) {
      return '✅ 올바른 대응입니다!';
    } else if (/(클릭|눌러|링크열|입력|전송|다운로드)/.test(norm)) {
      return '❌ 잘못된 대응입니다. 피싱에 주의하세요.';
    }
    return 'ℹ️ 피싱 메시지는 클릭하지 않고 무시하거나 신고하는 것이 좋아요.';
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        {/* 상단 헤더 */}
        <div style={styles.header}>
          <BackButton />
          <h2 style={styles.title}>시뮬레이션</h2>
        </div>

        {/* 시나리오 채팅 */}
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

        {/* 입력 영역 */}
        {!finished ? (
          <div style={styles.inputWrapper}>
            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="답변을 입력하세요..."
              rows={3}
              style={styles.textArea}
            />
            <button
              onClick={handleSubmit}
              style={styles.button}
              disabled={!userResponse.trim()}
            >
              답변하기
            </button>
          </div>
        ) : (
          <div style={styles.finishedMessage}>
            <p>🎉 시뮬레이션이 완료되었습니다.</p>
            <button
              style={{ ...styles.button, backgroundColor: '#4caf50' }}
              onClick={() => {
                setStep(0);
                setChatLog([{ text: scenarios[0], isBot: true }]);
                setFinished(false);
              }}
            >
              다시 시작
            </button>
          </div>
        )}

        {/* 구분선 */}
        <hr style={{ margin: '24px 0', border: 'none', height: 1, background: '#e5e7eb' }} />

        {/* AI 어시스턴트 (HTML 코드의 로직을 React로 변환해 적용) */}
        <AIAssistant
          baseUrl="https://2b3b80943a762565f3.gradio.live"
          apiName="/chat"
        />
      </div>
    </div>
  );
}

/** =========================
 * 스타일
 * ========================= */
const styles = {
  page: {
    backgroundColor: '#f9f9f9',
    minHeight: '100dvh',
    padding: '24px 16px 72px 16px',
    fontFamily: "'Segoe UI', sans-serif",
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    overscrollBehavior: 'none',
  },
  wrapper: {
    maxWidth: '760px', // AI 영역 포함을 고려해 약간 확대
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '0 auto',
  },
  chatWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flexGrow: 0,
    overflowY: 'auto',           // ✅ 스크롤 가능
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '16px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    minHeight: '24dvh',
    maxHeight: '40dvh',          // ✅ 내용 많을 때 잘림 방지
    width: '88%',
    maxWidth: '640px',
    alignSelf: 'center',
  },
  inputWrapper: {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '16px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    width: '88%',
    maxWidth: '640px',
    alignSelf: 'center',
    marginBottom: '12px',
  },
  textArea: {
    borderRadius: '10px',
    padding: '12px',
    border: '1px solid #ccc',
    fontSize: '14px',
    resize: 'none',
    width: '100%',               // ✅ '%' → '100%'
    minHeight: '80px',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#2196f3',
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
    backgroundColor: '#addaffff',
    color: '#333',
    padding: '10px 14px',
    borderRadius: '14px',
    maxWidth: '85%',
    wordBreak: 'keep-all',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196f3',
    color: 'white',
    padding: '10px 14px',
    borderRadius: '14px',
    maxWidth: '85%',
    wordBreak: 'keep-all',
  },
  finishedMessage: {
    marginTop: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#555',
  },
};

export default SimulationPage;
