'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/MyPage/PersonalInfo.module.scss';
import axios from 'axios';
import { Token } from '../../service/common';
import Image from 'next/image';

interface UserData {
  favoriteStyle: string;
}

function PersonalInfo() {
  const [userData, setUserData] = useState<UserData>();

  const styleMap: { [key: string]: string } = {
    Casual: '캐주얼',
    Sporty: '스포티',
    Retro: '레트로',
    Gorp_Core: '고프고어',
    Formal: '포멀',
  };

  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user`
      );

      const { height, weight, favoriteStyle } = response.data.data;
      setHeight(height);
      setWeight(weight);
      setUserData({ favoriteStyle: styleMap[favoriteStyle] });
    } catch (error) {
      console.error('유저 데이터 가져오는 도중 오류 발생', error);
    }
  };

  useEffect(() => {
    Token();
    fetchUserData();
  }, []);
  return (
    <>
      <div className={styles.gridContainer}>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.label}>키</div>
            <div className={styles.value}>{height} cm</div>
          </div>
          <div className={styles.imgDiv}>
            <Image
              src="/height.png"
              alt="Height"
              width={100}
              height={100}
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.label}>몸무게</div>
            <div className={styles.value}>{weight} kg</div>
          </div>
          <div className={styles.imgDiv}>
            <Image
              src="/weight.png"
              alt="Weight"
              width={100}
              height={100}
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.label}>Like Style</div>
            <div className={styles.value}>
              {userData && ( // userData가 존재할 때만 표시
                <div className={styles.mypage_favorite_contentlist}>
                  {userData.favoriteStyle}
                </div>
              )}
            </div>
          </div>
          <div className={styles.imgDiv}>
            <Image
              src="/fashionstyle.png"
              alt="style"
              width={100}
              height={100}
              className={styles.image}
            />
          </div>
        </div>
        {/* <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.label}>나이</div>
            <div className={styles.value}>25세</div>
          </div>
          <div className={styles.imgDiv}>
            <img src="/age.png" alt="Age" className={styles.image} />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default PersonalInfo;
