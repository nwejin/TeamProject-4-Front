'use client';

import LocationWeather from './MapPage';
import Mainpage_button from '../../components/mainpage/Mainpage_button';
import styles from '../../styles/mainpage/mainpage.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hideBackButton } from '../../Store/mainSlice/mainPageSlice';
import { useDispatch } from 'react-redux';
import MoveLoginModal from '../../components/MoveLoginModal';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 닫힌 상태

  // useEffect(() => {
  //   const accessToken = sessionStorage.getItem('accessToken');
  //   if (!accessToken) {
  //     setIsModalOpen(true); // 모달 열기
  //   }
  //   dispatch(hideBackButton());
  // }, [dispatch]);

  // const handleModalConfirm = () => {
  //   setIsModalOpen(false);
  //   router.push('/login');
  // };

  return (
    <div className={styles.container}>
      <div className={styles.maincontainer}>
        <div className={styles.test}>{/* <LocationWeather /> */}</div>
        <div className={styles.borderline}>
          <div className={styles.mainbuttoncontainer}>
            <Mainpage_button />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
