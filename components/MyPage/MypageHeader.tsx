'use client';

import Link from 'next/link';
import styles from '../../styles/MyPage/mypageHeader.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Token } from '../../service/common';

interface UserData {
  nickname: string;
  image_path: string;
}

const MypageHeader: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    nickname: '',
    image_path: null,
  });

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user`
      );
      const { nickname, image_path } = response.data.data;
      setUserData({ nickname, image_path });
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
      <div className={styles.mypage_Header}>
        <Link
          href={'/mypage/edit'}
          className={`${styles.mypage_Profile_edit} ${styles.margin}`}
        >
          <div>
            <img src="/option.png" alt="" />
          </div>
        </Link>
        <div className={`${styles.mypage_Profile_image} ${styles.margin}`}>
          <img src={userData.image_path} alt="" />
        </div>
        <div className={`${styles.mypage_Profile_nickname} ${styles.margin}`}>
          {userData.nickname}
        </div>
      </div>
    </>
  );
};

export default MypageHeader;
