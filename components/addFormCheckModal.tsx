// WithdrawalModal.js

import React from 'react';
import styles from '../styles/formModal.module.scss';
import { useRouter } from 'next/navigation';

export const AddFormCheckModal = ({ isOpen }) => {
  const router = useRouter();
  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalHeading}>등록 완료</h2>
          <p className={styles.modalText}>
            옷장 페이지에서 상제 정보를 확인해주세요!
          </p>
          <div className={styles.modalActions}>
            <button
              className={styles.withdrawalModalButtonNo}
              onClick={() => {
                router.back();
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
