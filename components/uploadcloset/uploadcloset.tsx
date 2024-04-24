'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/closet/closet.module.scss';
import SelectBox from '../../components/closet/closet_main/selectBox';
import SortBox from '../../components/closet/closet_main/sortBox';
import ClothesInfoBox from '../../components/uploadcloset/uploadClosetInfoBox';
import { useSelector } from 'react-redux';
import { getUserClothes } from '../../service/closetApiService';

interface ClosetPageProps {
  onImageSelect: (imageSrc: string, index: number) => void;

  clothes?: {
    imagePath: string;
    id: number;
    productName: string;
  };
}

const ClothesInfoBoxComponent: React.FC<ClosetPageProps> = ({
  onImageSelect,
}) => {
  const [userClothesData, setUserClothesData] = useState<any[]>([]);
  const sortStatus = useSelector((state: any) => state.status.status);
  const selectMajorData = useSelector((state: any) => state.search.selectMajor);
  const selectMiddleData = useSelector(
    (state: any) => state.search.selectMiddle
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserClothes();
        setUserClothesData(data);
      } catch (error) {
        console.error('사용자 옷 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);
  const [filteredClothesData, setFilteredClothesData] = useState<any[]>([]);

  useEffect(() => {
    const filteredData = userClothesData.filter((item) => {
      if (selectMajorData && selectMiddleData) {
        return (
          item.majorCategory === selectMajorData &&
          item.middleCategory === selectMiddleData
        );
      } else if (selectMajorData && !selectMiddleData) {
        return item.majorCategory === selectMajorData;
      } else {
        return true;
      }
    });

    setFilteredClothesData(filteredData);
  }, [selectMajorData, selectMiddleData, userClothesData]);

  return (
    <div className={styles.container}>
      <div className={styles.selectBox}>
        <SelectBox />
      </div>
      <div className={styles.sortBox}></div>
      <div
        className={
          sortStatus ? styles.mainInfoBoxDefault : styles.mainInfoBoxSmall
        }
      >
        {filteredClothesData.map((clothesItem, index) => (
          <ClothesInfoBox
            key={clothesItem.id}
            clothes={clothesItem}
            onImageSelect={(imageSrc: string, index: number) =>
              onImageSelect(imageSrc, index)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesInfoBoxComponent;
