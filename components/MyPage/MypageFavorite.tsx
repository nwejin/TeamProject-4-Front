'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/MyPage/mypageFavorite.module.scss';
import { Token } from '../../service/common';
import axios from 'axios';

interface UserData {
  favoriteStyle: string;
}
function MypageFavorite() {
  const [userData, setUserData] = useState<UserData>();

  const styleMap: { [key: string]: string } = {
    Casual: '캐주얼',
    Sporty: '스포티',
    Retro: '레트로',
    Gorp_Core: '고프고어',
    Formal: '포멀',
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user`
      );
      const { favoriteStyle } = response.data.data;
      setUserData({ favoriteStyle: styleMap[favoriteStyle] });
    } catch (error) {
      console.error('유저 정보 가져오는 중 오류 발생', error);
    }
  };

  useEffect(() => {
    Token();
    fetchUserData();
  }, []);
  return (
    <>
      <div className={styles.mypage_favorite}>
        <div className={`${styles.mypage_favorite_title} ${styles.margin}`}>
          가장 선호하는 플룻
        </div>
        <div className={`${styles.mypage_favorite_content} ${styles.margin}`}>
          {userData && ( // userData가 존재할 때만 표시
            <div className={styles.mypage_favorite_contentlist}>
              {userData.favoriteStyle}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MypageFavorite;
