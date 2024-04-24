'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MoveLoginModal from '../../../../components/MoveLoginModal';

export default function ClosetDefault() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 닫힌 상태

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.push('/login');
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      setIsModalOpen(true);
    }
  }, []);

  return (
    <>
      <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} />
    </>
  );
}
