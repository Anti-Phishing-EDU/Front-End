import React from 'react';

const caseList = [
  { title: 'OO은행 사칭 문자', detail: '링크 클릭 시 개인정보 탈취 위험' },
  { title: '택배 사칭 스미싱', detail: '운송장 조회 링크로 악성 앱 설치 유도' },
  { title: '계좌 인증 유도 피싱', detail: '공공기관 사칭 문자로 보안카드 번호 요구' },
];

const CasePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>💡 최신 피싱 사례</h2>
        <p style={styles.headerSubtitle}>최근 발견된 주요 피싱 유형을 확인하세요.</p>
      </div>

      {/* 🔹 피싱 사례 목록 */}
      <div style={styles.caseList}>
        {caseList.map((item, idx) => (
          <div key={idx} style={styles.caseCard}>
            {/* ✅ 제목을 카드 상단에 올림 */}
            <div style={styles.cardHeader}>
              <h4 style={styles.caseTitle}>⚠️ {item.title}</h4>
            </div>
            <p style={styles.caseDetail}>{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 24px 40px 24px',
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
  },

  header: {
    textAlign: 'center',
    marginBottom: '0px',
  },

  headerTitle: {
    marginTop: '0px',
    fontSize: '24px',
    fontWeight: '700',
    color: '#000000ff',
  },

  headerSubtitle: {
    fontSize: '12px',
    color: '#777',
  },

  caseList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '12px',
  },

caseCard: {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',                  // ✅ 모서리 둥근 정도 더 줄임
  padding: '8px 10px',                  // ✅ 내부 여백 축소
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)', // ✅ 그림자 최소화
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minHeight: '30px',                    // ✅ 카드 높이 전체적으로 축소
},



  /* ✅ 제목 위치를 카드 상단으로 당김 */
  cardHeader: {
    marginBottom: '6px',
  },

  caseTitle: {
    margin: '0',
    fontSize: '17px',
    fontWeight: '700',
    color: '#000000ff',
  },

  caseDetail: {
    marginTop: '4px', // ✅ 간격 축소
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.4',
  },

  '@media (max-width: 768px)': {
    container: {
      padding: '20px 16px 40px 16px',
    },
    headerTitle: {
      fontSize: '20px',
    },
    caseCard: {
      padding: '16px',
    },
    caseTitle: {
      fontSize: '15px',
    },
    caseDetail: {
      fontSize: '13px',
    },
  },

  '@media (max-width: 480px)': {
    container: {
      padding: '16px 12px 50px 12px',
    },
    headerTitle: {
      fontSize: '18px',
    },
    headerSubtitle: {
      fontSize: '12px',
    },
    caseCard: {
      padding: '14px 12px',
      borderRadius: '10px',
    },
    caseTitle: {
      fontSize: '14px',
    },
    caseDetail: {
      fontSize: '12px',
    },
  },
};

export default CasePage;
