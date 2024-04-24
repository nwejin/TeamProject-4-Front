'use client';

import React, { useState } from 'react';
import styles from '../../styles/calendar/calendar.module.scss';
import Link from 'next/link';

interface CoordiCalendarProps {
  coordis: {
    [date: string]: string[]; // 날짜 문자열을 키로 하고 해당 날짜에 등록된 코디 ID 배열을 값으로 가지는 객체
  };
}

const CoordiCalendar: React.FC<CoordiCalendarProps> = ({ coordis }) => {
  const [selectedCoordi, setSelectedCoordi] = useState<string | null>(null);

  // 코디 선택 시 실행되는 핸들러 함수
  const handleCoordiSelect = (coordiId: string) => {
    setSelectedCoordi(coordiId);
  };

  // 코디 버튼 렌더링 함수
  const renderCoordiButtons = () => {
    const buttons = [];
    for (const date in coordis) {
      const coordiIds = coordis[date];
      const formattedDate = new Date(date).toLocaleDateString(); // 날짜 포맷팅
      buttons.push(
        <div key={date}>
          <p>{formattedDate}</p>
          {/* 해당 날짜에 등록된 모든 코디 버튼 렌더링 */}
          {coordiIds.map((coordiId) => (
            <button key={coordiId} onClick={() => handleCoordiSelect(coordiId)}>
              View Coordi {coordiId} {/* 코디 ID 표시 */}
            </button>
          ))}
        </div>
      );
    }
    return buttons;
  };

  return (
    <div className={styles['coordi-calendar-container']}>
      <div className={styles['coordi-calendar-body']}>
        {/* 코디 버튼들 렌더링 */}
        {renderCoordiButtons()}
      </div>
      {/* 선택된 코디 정보 박스 */}
      {selectedCoordi && (
        <div className={styles['selected-coordi-box']}>
          <p>Selected Coordi: {selectedCoordi}</p>
          {/* 선택된 코디에 대한 상세 정보 표시 */}
          {/* 이 부분은 선택된 코디에 대한 상세 정보를 표시하는 로직을 추가하세요. */}
        </div>
      )}
    </div>
  );
};

export default CoordiCalendar;
