// WithdrawalModal.js

import React from 'react';
import styles from '../styles/WithdrawalModal.module.scss';

const WithdrawalModal = ({ isOpen, onCancel, onConfirm }) => {
  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalHeading}>회원탈퇴</h2>
          <p className={styles.modalText}>정말로 계정을 삭제 하시겠습니까?</p>
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

export default WithdrawalModal;
