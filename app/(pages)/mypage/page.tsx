'use client';

import { useEffect, useState } from 'react';
import MypageHeader from '../../../components/MyPage/MypageHeader';
import styles from '../../../styles/MyPage/mypage.module.scss';
import PersonalInfo from '../../../components/MyPage/PersonalInfo';
import Dimension from '../../../components/MyPage/Dimension';
import Statistics from '../../../components/MyPage/Statistics';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MoveLoginModal from '../../../components/MoveLoginModal';

function MyPage() {
  const [selectedComponent, setSelectedComponent] = useState('기본정보');
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 닫힌 상태

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };
  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      setIsModalOpen(true); // 모달 열기
    }
  }, []);

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.push('/login');
  };
  return (
    <>
      <div className={styles.mypage_Container}>
        <MypageHeader />
        <div className={styles.mypage_underbar}></div>
        <div className={styles.mypage_components}>
          <div
            className={`${styles.mypage_components_info} ${
              selectedComponent === '기본정보' ? styles.changedComponent : ''
            }`}
            onClick={() => handleComponentChange('기본정보')}
          >
            Info
          </div>
          <div
            className={`${styles.mypage_components_info} ${
              selectedComponent === '치수' ? styles.changedComponent : ''
            }`}
            onClick={() => handleComponentChange('치수')}
          >
            <Image
              src="/ruler.png"
              alt="Ruler"
              width={32} // 이미지의 너비와 높이 조정
              height={32}
              onClick={() => handleComponentChange('치수')}
            />
          </div>
          <div
            className={`${styles.mypage_components_info} ${
              selectedComponent === '통계' ? styles.changedComponent : ''
            }`}
            onClick={() => handleComponentChange('통계')}
          >
            Report
          </div>
        </div>
        {selectedComponent === '기본정보' && <PersonalInfo />}
        {selectedComponent === '치수' && <Dimension />}
        {selectedComponent === '통계' && <Statistics />}
        <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} />
      </div>
    </>
  );
}

export default MyPage;
