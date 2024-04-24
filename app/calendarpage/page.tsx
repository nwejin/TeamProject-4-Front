'use client'; // nextjs에서 useState사용시 작성필
import React from 'react';
import Calendar from '../../components/calendarpage/calendarpage';
import WetherLocation from '../../components/mainpage/Tmfprlxhd';
import Styles from '../../styles/calendar/calendar.module.scss';

const CalendarPage: React.FC = () => {
  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.h1}>
        <h2>당신의 코디를 등록해봐요!</h2>
      </div>

      <div className={Styles.ggg}>
        {' '}
        <WetherLocation />
      </div>

      <Calendar />
    </div>
  );
};

export default CalendarPage;
