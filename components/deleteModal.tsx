// WithdrawalModal.js

import React from 'react';
import styles from '../styles/formModal.module.scss';
import { useRouter } from 'next/navigation';

export const DeleteModal = ({ isOpen, onCancel, onConfirm }) => {
  const router = useRouter();
  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalHeading}>옷 정보 삭제</h2>
          <p className={styles.modalText}>삭제 후 복구가 불가능합니다.</p>
          <div className={styles.modalActions}>
            <button
              className={styles.withdrawalModalButtonNo}
              onClick={onCancel}
            >
              취소
            </button>
            <button
              className={styles.withdrawalModalButtonYes}
              onClick={onConfirm}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    )
  );
};
