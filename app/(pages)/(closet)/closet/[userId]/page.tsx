'use client';

import ClothesInfoBox from '../../../../../components/closet/closet_main/clothesInfoBox';
import AddToggleBtn from '../../../../../components/closet/closet_add/addToggleBtn';
import SelectBox from '../../../../../components/closet/closet_main/selectBox';
import styles from '../../../../../styles/closet/closet.module.scss';
import SortBox from '../../../../../components/closet/closet_main/sortBox';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getUserClothes,
  getUserClothesByCatMajor,
  getUserClothesByCatMiddle,
} from '../../../../../service/closetApiService';
import { RootState } from '../../../../../Store/Store';
import { useRouter } from 'next/navigation';
import MoveLoginModal from '../../../../../components/MoveLoginModal';

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
export default function Closet({ params: { userId } }) {
  const sortStatus = useSelector((state: any) => state.status.status);
  // console.log('sort 상태', sortStatus);
  const getUserId = useSelector((state: RootState) => state.user.userId);
  // console.log('userId > ', userId);
  const selectMajorData = useSelector((state: any) => state.search.selectMajor);
  const selectMiddleData = useSelector(
    (state: any) => state.search.selectMiddle
  );

  const nickName = useSelector((state: any) => state.userData.userNickName);

  // console.log('검색분류 (중) >>', selectMajorData);
  // console.log('검색분류 (소) >>', selectMiddleData);

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 닫힌 상태

  const router = useRouter();
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.push('/login');
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      setIsModalOpen(true); // 모달 열기
    }
  }, []);

  const [userClothesData, setUserClothesData] = useState<clothes[]>([]);

  function findCategory() {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      const queryString = url.split('?')[1];
      if (!queryString) return null;

      const queryParams = queryString.split('&');

      for (const param of queryParams) {
        if (param.startsWith('category=')) {
          const category = param.split('=')[1];
          return decodeURIComponent(category);
        }
      }
    }

    return null;
  }

  const selectedCategory = findCategory();
  useEffect(() => {
    const fetchUserClothesData = async () => {
      try {
        let clothesData;
        if (selectMajorData !== '') {
          clothesData = await getUserClothesByCatMajor(selectMajorData);
        } else {
          clothesData = await getUserClothes();
        }
        // 카테고리 필터링
        if (selectedCategory) {
          clothesData = clothesData.filter(
            (item) => item.middleCategory === selectedCategory
          );
        }
        setUserClothesData(clothesData);
      } catch (error) {
        console.log(error, '유저 옷장 데이터 가져오기 오류');
      }
    };
    fetchUserClothesData();
  }, [selectMajorData, selectedCategory]);

  // 하나로 합침
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (selectMajorData !== '') {
          if (selectMiddleData !== '') {
            data = await getUserClothesByCatMiddle(selectMiddleData);
          } else {
            data = await getUserClothesByCatMajor(selectMajorData);
          }
        } else {
          data = await getUserClothes();
        }
        setUserClothesData(data);
      } catch (error) {
        console.log(error, '유저 옷장 데이터 가져오기 오류');
      }
    };
    fetchData();
  }, [selectMajorData, selectMiddleData]);

  // console.log(userClothesData);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerHeader}>
          <p>
            <span>{nickName.value}</span>님의 옷장
          </p>
          <div>
            {/* <button>
            <span className="material-symbols-outlined">bookmark</span>
          </button>
          <span>50</span> */}
          </div>
        </div>
        <div className={styles.selectBox}>
          <SelectBox />
        </div>
        <div className={styles.sortBox}>
          <SortBox />
        </div>
        <div
          className={
            sortStatus ? styles.mainInfoBoxDefault : styles.mainInfoBoxSmall
          }
        >
          {userClothesData.length == 0 && (
            <div className={styles.noResultBox}>
              <span>옷 정보가 없습니다.</span>
              <span>새로운 옷을 등록해주세요!</span>
            </div>
          )}
          {userClothesData.map((clothes) => (
            <ClothesInfoBox key={clothes.id} clothes={clothes} />
          ))}
        </div>
        <AddToggleBtn />
      </div>
      <MoveLoginModal isOpen={isModalOpen} onConfirm={handleModalConfirm} />
    </>
  );
}
