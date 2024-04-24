'use client';
import React, { useEffect } from 'react';
import Styles from '../../styles/calendar/calendar.module.scss';
import Codicomponent from '../../components/codipage/codicomponent';
import SelectedDateDisplay from '../../components/codipage/date';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
export interface PageProps {
  selectedDate?: string;
  params?: any;
  searchParams?: any;
}

const CodiPage: React.FC<{ selectedDate?: string; userId?: string }> = () => {
  const selectedDate = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );

  useEffect(() => {
    // 여기에서 필요한 작업 수행
  }, []);

  return (
    <div className={Styles.all}>
      <SelectedDateDisplay selectedDate={selectedDate} />

      <Codicomponent />
    </div>
  );
};

export default CodiPage;
