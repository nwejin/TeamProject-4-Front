'use client';

import styles from '../../../../../../styles/closet/closet.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getUserClothes,
  getUserClothesByCatMajor,
  getUserClothesByCatMiddle,
} from '../../../../../../service/closetApiService';
import { RootState } from '../../../../../../Store/Store';
import ClothesInfoBox from '../../../../../../components/closet/closet_main/clothesInfoBox';

interface clothes {
  brand: string;
  color: string | null;
  createdAt: string;
  id: number;
  imagePath: string;
  liked: boolean;
  majorCategory: string;
  middleCategory: string;
  nickname: string;
  price: number;
  productName: string;
  score: number;
  season: string;
  size: string;
  style: string;
  thickness: string;
  user_id: number;
  userid: string;
}

export default function LikedCloth({ params: { userId } }) {
  const getUserId = useSelector((state: RootState) => state.user.userId);
  const nickName = useSelector((state: any) => state.userData.userNickName);

  const [likedCloth, setLikedCloth] = useState<clothes[]>([]);

  useEffect(() => {
    const fetchUserClothesData = async () => {
      try {
        const clothesData = await getUserClothes();

        const filteredMiddleClothes = clothesData.filter((clothes) => {
          return clothes.liked == true;
        });
        setLikedCloth(filteredMiddleClothes);
      } catch (error) {
        console.log(error, '유저 옷장 데이터 가져오기 오류');
      }
    };
    fetchUserClothesData();
  }, []);

  //   console.log(likedCloth);

  return (
    <div className={styles.container}>
      <div className={styles.innerHeader}>
        <p>
          <span>{nickName.value}</span>님이 선호하는 옷
        </p>
      </div>
      <div className={styles.mainInfoBoxDefault}>
        {likedCloth.map((clothes) => (
          <ClothesInfoBox key={clothes.id} clothes={clothes} />
        ))}
      </div>
    </div>
  );
}
