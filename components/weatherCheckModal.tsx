// WithdrawalModal.js

import React from 'react';
import styles from '../styles/formModal.module.scss';
import { useRouter } from 'next/navigation';

export const WeatherCheckModal = ({ isOpen }) => {
  const router = useRouter();
  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalHeading}>날씨 정보가 없습니다!</h2>
          <p className={styles.modalText}>
            메인 페이지에서 날씨 정보를 불러와주세요!
          </p>
          <div className={styles.modalActions}>
            <button
              className={styles.withdrawalModalButtonNo}
              onClick={() => {
                router.push('/');
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    )
  );
};
