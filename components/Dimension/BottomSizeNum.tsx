'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/Dimension/BottomSizeNum.module.scss';
import axios from 'axios';
import { Token } from '../../service/common';

interface Dimension {
  number: string;
  name: string;
  key: string;
}

interface InputValues {
  b1: number;
  b2: number;
  b3: number;
  b4: number;
  b5: number;
  b6: number;
}

const BottomSizeNum: React.FC = () => {
  // 치수 정보 배열
  const dimensions: Dimension[] = [
    { number: '1', name: '총장', key: 'b1' },
    { number: '2', name: '밑위', key: 'b2' },
    { number: '3', name: '허리단면', key: 'b3' },
    { number: '4', name: '엉덩이 단면', key: 'b4' },
    { number: '5', name: '허벅지 단면', key: 'b5' },
    { number: '6', name: '밑단 단면', key: 'b6' },
  ];

  const [inputValues, setInputValues] = useState<InputValues>({
    b1: null,
    b2: null,
    b3: null,
    b4: null,
    b5: null,
    b6: null,
  });

  // 유저 정보 받아오기
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user`
      );
      const userSizeDTO: InputValues = response.data.data.userSizeDTO;
      // 가져온 데이터를 state에 설정
      setInputValues(userSizeDTO);
    } catch (error) {
      console.error('유저 데이터를 가져오는 도중 오류 발생', error);
    }
  };

  useEffect(() => {
    Token();
    fetchUserData();
  }, []);

  const handleChange = (key: string, value: string) => {
    // 입력값이 숫자인지 확인하는 정규식
    const regex = /^[0-9\b]+$/;

    // 입력값이 숫자이거나 빈 문자열일 경우에만 setState
    if (value === '' || regex.test(value)) {
      setInputValues({ ...inputValues, [key]: parseFloat(value) });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 서버에 데이터 저장
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user/size`,
        inputValues
      );
    } catch (error) {
      console.error('데이터를 저장하는 도중 오류 발생', error);
      // 오류 처리 로직 추가
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        {dimensions.map((dimension, index) => (
          <div key={index} className={styles.dimension}>
            <div className={styles.number}>{dimension.number}</div>
            <div>{dimension.name}</div>
            <div className={styles.input_Div}>
              <input
                className={styles.input}
                type="text"
                value={inputValues[dimension.key]}
                onChange={(e) => handleChange(dimension.key, e.target.value)}
              />
            </div>
            <div className={styles.unit}>cm</div>
          </div>
        ))}
        <button className={styles.btn} type="submit">
          저장하기
        </button>
      </form>
    </div>
  );
};

export default BottomSizeNum;
