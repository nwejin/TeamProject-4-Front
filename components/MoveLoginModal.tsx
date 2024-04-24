import React from 'react';
import styles from '../styles/MoveLoginModal.module.scss';
import Image from 'next/image';

const MoveLoginModal = ({ isOpen, onConfirm }) => {
  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalLogo}>
            <Image src="/logo.png" alt="" width={220} height={150} />
          </div>
          <p className={styles.modalText}>로그인 후 이용 가능합니다.</p>
          <div className={styles.modalActions}>
            <button
              className={styles.withdrawalModalButtonYes}
              onClick={onConfirm}
            >
              로그인으로
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default MoveLoginModal;
