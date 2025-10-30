import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CasePage from './CasePage';
import userIcon from '../assets/user.png';

const HomePage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  // ✅ 부드러운 자동 스크롤
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.3;

    const animateScroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      animationRef.current = requestAnimationFrame(animateScroll);
    };

    animationRef.current = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div style={styles.page}>
      {/* 상단 프로필 영역 */}
      <div style={styles.header}>
        <button
          style={styles.profileButton}
          onClick={() => navigate('/mypage')}
          aria-label="마이페이지로 이동"
        >
          <img src={userIcon} alt="profile" style={styles.profileIcon} />
        </button>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={styles.wrapper}>
        <div style={styles.todaySection}>
          <h2 style={styles.mainTitle}>
            💡 오늘의 <span style={styles.highlight}>피싱</span> 사례
          </h2>

          <div style={styles.noticeContainer} ref={scrollRef}>
            {[
              '“OO은행 사칭 문자, 클릭 주의!”',
              '“택배 사칭 피싱, 20대 피해 급증”',
              '“계좌 인증 유도 피싱 SMS 유행”',
              '“국세청 환급 사칭 메일 유포 중”',
            ].map((text, index) => (
              <div key={index} style={styles.noticeCard}>
                ⚠️ {text}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.caseWrapper}>
          <CasePage />
        </div>
      </div>
    </div>
  );
};

// ✅ 스타일 정의
const styles = {
  page: {
    position: 'relative',
    minHeight: '80vh',
    backgroundColor: '#f9f9f9',
    fontFamily: "'Segoe UI', sans-serif",
    boxSizing: 'border-box',
  },

  header: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: '16px 20px 24px 20px',
  },

  profileButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },

  profileIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },

  wrapper: {
    padding: '0 20px 40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
  },

  todaySection: {
    marginTop: '10px',
    marginBottom: '10px',
  },

  mainTitle: {
    fontSize: '22px',
    fontWeight: '500',
    marginBottom: '10px',
    lineHeight: '1.5',
    textAlign: 'center',
  },

  highlight: {
    color: '#f44336',
    fontWeight: 'bold',
  },

  // ✅ 스크롤바 완전 제거 + 부드러운 자동 이동
  noticeContainer: {
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    marginBottom: '8px',
    display: 'flex',
    gap: '10px',
    paddingBottom: '4px',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE/Edge
  },

  noticeCard: {
    display: 'inline-block',
    backgroundColor: '#ffcdd2',
    border: '1px solid #f44336',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '14px',
    flexShrink: 0,
  },

  caseWrapper: {
    marginTop: '10px',
  },
};

// ✅ Chrome / Safari 전용 스크롤바 숨김
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerHTML = `
    ::-webkit-scrollbar {
      display: none !important;
      width: 0;
      height: 0;
    }
  `;
  document.head.appendChild(styleSheet);
}

export default HomePage;
