'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '../../../styles/User/signup.module.scss';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface UserData {
  userid: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    userid: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });

  // 아이디 중복 에러 문자
  const [useridError, setUseridError] = useState<string | null>(null);

  // 비밀번호 불일치 에러 문자
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'userid') {
      if (value.length > 9) {
        return; //  9 초과일 때는 상태 업데이트를 막습니다.
      }
    }

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = async (e: ChangeEvent<HTMLInputElement>) => {
    // name : userid
    // value : banana

    const { name, value } = e.target;

    if (name === 'userid' && value.trim() !== '') {
      if (value.length < 4 || value.length > 9) {
        setUseridError('아이디는 최소 4글자 이상, 최대 9글자 이하여야 합니다.');
      } else {
        setUseridError(null);
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_DB_HOST}/validation`,
            userData
          );
          setUseridError(null);
        } catch (error) {
          console.error('오류 발생', error);
          setUseridError('이미 사용 중인 아이디 입니다.');
        }
      }
    }
    if (name === 'password') {
      if (value.length < 6) {
        setPasswordError('비밀번호는 6자리 이상이어야 합니다.');
      } else if (value !== userData.passwordConfirm) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError(null);
      }
    }

    if (name === 'passwordConfirm') {
      if (value !== userData.password) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError(null);
      }
    }
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_DB_HOST}/signup`, userData)
      .then((res) => {
        router.push('/login');
      })
      .catch((error) => {
        console.error('오류 발생', error);
      });
  };

  return (
    <>
      <div className={styles.signup_Container}>
        <div className={styles.title}>회원가입</div>

        <form onSubmit={handleSignUp}>
          <div className={styles.content}>
            {/* id */}
            <div className={styles.signup_Content_Container}>
              <div className={styles.signup_title}>아이디</div>
              <input
                className={styles.signup_input}
                type="text"
                name="userid"
                onChange={handleChange}
                onBlur={handleBlur}
                value={userData.userid}
                placeholder="아이디 (4~9 글자)"
                maxLength={9}
              />
              {useridError && <p className={styles.errorMsg}>{useridError}</p>}
            </div>
            {/* password */}
            <div className={styles.signup_Content_Container}>
              <div className={styles.signup_title}>비밀번호</div>
              <input
                className={styles.signup_input}
                type="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={userData.password}
                placeholder="비밀번호 (6자리 이상)"
              />
            </div>
            {/* password check*/}
            <div className={styles.signup_Content_Container}>
              <div className={styles.signup_title}>비밀번호 재확인</div>
              <input
                className={styles.signup_input}
                type="password"
                name="passwordConfirm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={userData.passwordConfirm}
                placeholder="비밀번호 재확인"
              />
              {passwordError && (
                <p className={styles.errorMsg}>{passwordError}</p>
              )}
            </div>
            {/* nickname */}
            <div className={styles.signup_Content_Container}>
              <div className={styles.signup_title}>닉네임</div>
              <input
                className={styles.signup_input}
                type="text"
                name="nickname"
                onChange={handleChange}
                value={userData.nickname}
                placeholder="닉네임"
              />
            </div>
          </div>
          <button type="submit" className={styles.signup_Btn}>
            회원가입
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
