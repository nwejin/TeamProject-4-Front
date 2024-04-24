'use client';

import { useRouter } from 'next/navigation';
import MypageEditContent from '../../../../components/MyPage/MypageEditContent';
import MypageEditHeader from '../../../../components/MyPage/MypageEditHeader';
import styles from '../../../../styles/MyPage/mypageEdit.module.scss';
import { useEffect, useState } from 'react';
import MoveLoginModal from '../../../../components/MoveLoginModal';

function MypageEditPage() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 닫힌 상태
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
      <div className={styles.mypageEdit_Container}>
        <MypageEditHeader />
        <div className={styles.mypageEdit_underbar}></div>
        <MypageEditContent />{' '}
        <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} />
      </div>
    </>
  );
}

export default MypageEditPage;
