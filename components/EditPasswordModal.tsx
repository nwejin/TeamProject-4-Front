'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from '../styles/EditPasswordModal.module.scss';
import axios from 'axios';
import { Value } from 'sass';

interface UserData {
  existingPassword: string;
  password: string;
  passwordConfirm: string;
}

const EditPasswordModal = ({ isOpen, onCancel, onConfirm }) => {
  const [userData, setUserData] = useState<UserData>({
    existingPassword: '',
    password: '',
    passwordConfirm: '',
  });

  // 비밀번호 불일치 에러 문자
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // 현재 사용중인 비밀번호 에러 문자
  const [existingPasswordError, setExistingPasswordError] = useState<
    string | null
  >(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // existingPassword
  const handlePasswordBlur = () => {
    // 현재 비밀번호와 변경할 비밀번호가 일치할 때 에러 설정
    if (userData.existingPassword === userData.password) {
      setExistingPasswordError('현재 비밀번호와 일치합니다.');
    } else if (userData.password.length < 6) {
      setExistingPasswordError('비밀번호는 6자리 이상 이어야 합니다.');
    } else {
      setExistingPasswordError(null);
    }
  };

  const handleConfirmPasswordBlur = () => {
    // 비밀번호와 비밀번호 확인이 일치하지 않을 때 에러 설정
    if (userData.password !== userData.passwordConfirm) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError(null);
    }
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 입력된 값 초기화
    setUserData({
      existingPassword: '',
      password: '',
      passwordConfirm: '',
    });
    setPasswordError(null);
    setExistingPasswordError(null);
    // onCancel 콜백 호출하여 모달 닫기
    onCancel();
  };

  const handleConfirm = async () => {
    //비밀번호 에러 있으면 x
    if (passwordError) {
      return;
    }

    const { password } = userData;

    // 비밀번호가 비어 있으면 x
    if (!password) {
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user/password`,
        userData
      );
      console.log('비밀번호 변경 완료', response);
      onConfirm();
      setUserData({
        existingPassword: '',
        password: '',
        passwordConfirm: '',
      });
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생', error);
      setPasswordError(error.response.data.responseMessage);
    }
  };

  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalHeading}>비밀번호 변경</h2>
          <p className={styles.modalText}>현재 비밀번호</p>
          <input
            className={styles.input}
            type="password"
            name="existingPassword"
            onChange={handleChange}
            value={userData.existingPassword}
            placeholder="현재 비밀번호"
          />
          <p className={styles.modalText}>변경할 비밀번호</p>
          <input
            className={styles.input}
            type="password"
            name="password"
            onBlur={handlePasswordBlur}
            onChange={handleChange}
            value={userData.password}
            placeholder="비밀번호 (6자리 이상)"
          />
          {existingPasswordError && (
            <p className={styles.errorMsg}>{existingPasswordError}</p>
          )}
          <p className={styles.modalText}>변경할 비밀번호 재확인</p>
          <input
            className={styles.input}
            type="password"
            name="passwordConfirm"
            onBlur={handleConfirmPasswordBlur}
            onChange={handleChange}
            value={userData.passwordConfirm}
            placeholder="비밀번호 재확인"
          />
          {passwordError && <p className={styles.errorMsg}>{passwordError}</p>}
          <div className={styles.modalActions}>
            <button
              className={styles.withdrawalModalButtonNo}
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              className={styles.withdrawalModalButtonYes}
              onClick={handleConfirm}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditPasswordModal;
