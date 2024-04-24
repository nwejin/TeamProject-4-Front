'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/Dimension/ShoesSizeNum.module.scss';
import axios from 'axios';
import { Token } from '../../service/common';

interface Dimension {
  number: string;
  name: string;
  key: string;
}

interface InputValues {
  s1: number;
  s2: number;
}

const ShoesSizeNum: React.FC = () => {
  const dimensions: Dimension[] = [
    { number: '1', name: '발길이', key: 's1' },
    { number: '2', name: '발볼', key: 's2' },
  ];

  const [inputValues, setInputValues] = useState<InputValues>({
    s1: null,
    s2: null,
  });

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user`
      );
      const userSizeDTO: InputValues = response.data.data.userSizeDTO;
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
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user/size`,
        inputValues
      );
    } catch (error) {
      console.error('데이터를 저장하는 도중 오류 발생', error);
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
            <div className={styles.unit}>mm</div>
          </div>
        ))}
        <button className={styles.btn} type="submit">
          저장하기
        </button>
      </form>
    </div>
  );
};

export default ShoesSizeNum;
