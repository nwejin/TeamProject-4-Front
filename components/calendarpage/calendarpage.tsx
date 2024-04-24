import React, { useState, useEffect } from 'react';
import styles from '../../styles/calendar/calendar.module.scss';
import Link from 'next/link';
import { getCodiInfo } from '../../service/getCodiInfoApi';

const Calendar = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hasCodi, setHasCodi] = useState<boolean>(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 오늘 날짜를 선택한 날짜로 설정합니다.
    setSelectedDate(getFormattedDate(new Date()));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      checkCodiExistence(selectedDate);
    }
  }, [selectedDate]);

  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleClick = (day: number) => {
    setSelectedDate(`${year} ${month} ${day}`);
  };

  const getFormattedDate = (date: Date): string => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    return `${yyyy} ${mm} ${dd}`;
  };

  const renderCalendar = () => {
    const totalDays = new Date(year, month, 0).getDate();
    const today = new Date();
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
    const calendar = [];
    let row = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      row.push(<td key={`empty-${i}`} className={styles['empty-cell']} />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isToday =
        today.getFullYear() === year &&
        today.getMonth() + 1 === month &&
        today.getDate() === day;
      const isSelected = selectedDate === `${year} ${month} ${day}`;
      row.push(
        <td
          key={day}
          className={`${
            isToday && !selectedDate ? styles['today'] : undefined
          } ${isSelected ? styles['selectedDate'] : undefined} ${
            styles['calendar-day']
          }`}
          onClick={() => handleClick(day)}
        >
          {day}
        </td>
      );
      if ((firstDayOfWeek + day) % 7 === 0) {
        calendar.push(<tr key={day}>{row}</tr>);
        row = [];
      }
    }

    if (row.length > 0) {
      calendar.push(<tr key="last">{row}</tr>);
    }

    return calendar;
  };

  const renderUploadButton = () => {
    if (selectedDate && !hasCodi) {
      const selectedDay = parseInt(selectedDate.split(' ')[2]);
      const today = new Date().getDate();

      // 선택한 날짜가 오늘 날짜 또는 내일 날짜인 경우에만 버튼을 보여줌
      if (selectedDay === today || Math.abs(selectedDay - today) <= 1) {
        const formattedDate = encodeURIComponent(selectedDate);
        const path = `/codipage?selectedDate=${formattedDate}`;
        return (
          <a href={path}>
            <button className={styles.upload}>등록하기</button>
          </a>
        );
      }
    }
    return null;
  };

  const checkCodiExistence = async (selectedDate: string) => {
    try {
      const codiInfo = await getCodiInfo({ selectedDate });

      // 선택한 날짜의 코디 정보가 있는지 확인
      const matchingCodi = codiInfo.find((codi) => {
        const codiDate = new Date(codi.codiDate).toLocaleDateString();
        const clickedDate = new Date(selectedDate).toLocaleDateString();
        return codiDate === clickedDate;
      });

      // 코디 정보가 있고, 선택한 날짜와 일치하는 경우에만 버튼 표시
      setHasCodi(!!matchingCodi);
    } catch (error) {}
  };

  return (
    <div>
      {' '}
      <div className={styles['calendar-container']}>
        <div className={styles['calendar-header']}>
          <div className={styles['calendar-buttons']}>
            <button onClick={prevMonth}>이전 달</button>
          </div>
          <div className={styles['calendar-title']}>
            {year}년 {month}월
          </div>
          <div className={styles['calendar-buttons']}>
            <button onClick={nextMonth}>다음 달</button>
          </div>
        </div>
        <div className={styles['calendar-body']}>
          <table>
            <thead>
              <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody>{renderCalendar()}</tbody>
          </table>
        </div>
        <div className={styles['selected-date-box']}>
          {renderUploadButton()}
          {hasCodi && (
            <a
              href={`/codipage?selectedDate=${encodeURIComponent(
                selectedDate
              )}`}
            >
              <button className={styles.check}>코디 확인하기</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
