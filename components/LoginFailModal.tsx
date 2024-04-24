import React from 'react';
import styles from '../styles/MoveLoginModal.module.scss';
import Image from 'next/image';

const LoginFailModal = ({ isOpen, onConfirm }) => {
  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalLogo}>
            <Image src="/logo.png" alt="" width={220} height={150} />
          </div>
          <p className={styles.modalText}>
            아이디 또는 비밀번호를 잘못 입력하셨습니다.
          </p>
          <p className={styles.modalText}>
            입력하신 내용을 다시 확인 해주세요.
          </p>
          <div className={styles.modalActions}>
            <button
              className={styles.withdrawalModalButtonYes}
              onClick={onConfirm}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginFailModal;
