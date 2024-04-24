'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/closet/addform.module.scss';
import SelectCat from './selectBoxes/selectCat';
import SelectSize from './selectBoxes/selectSize';
import SelectThickness from './selectBoxes/selectThickness';
import SelectWeather from './selectBoxes/selectWeather';
import SelectStyles from './selectBoxes/selectStyles';
import SelectImg from './selectBoxes/selectImg';
import SelectName from './selectBoxes/selectName';
import SelectBrand from './selectBoxes/selectBrand';
import SelectPrice from './selectBoxes/selectPrice';
import { AddFormCheckModal } from '../../../components/addFormCheckModal';

import { useRouter } from 'next/navigation';
import { postAddClothes } from '../../../service/closetApiService';

export default function AddForm() {
  interface TotalData {
    small_img: string;
    product_name: string;
    brand: string;
    major_category: string;
    middle_category: string;
    size: string;
    weather: string;
    thickness: string;
    style: string;
    price: string;
    score: string;
  }

  const totalData: TotalData = useSelector((state: any) => ({
    small_img: state.clothes.clothes.small_img,
    product_name: state.clothes.clothes.product_name,
    brand: state.clothes.clothes.brand,
    major_category: state.clothes.clothes.major_category,
    middle_category: state.clothes.clothes.middle_category,
    size: state.clothes.clothes.size,
    weather: state.clothes.clothes.weather,
    thickness: state.clothes.clothes.thickness,
    style: state.clothes.clothes.style_str,
    price: state.clothes.clothes.price,
    score: state.clothes.clothes.score,
  }));

  const convertToClosetDTO = (data: TotalData): any => {
    return {
      score: parseFloat(data.score),
      brand: data.brand,
      majorCategory: data.major_category,
      middleCategory: data.middle_category,
      price: parseInt(data.price),
      size: data.size,
      thickness: data.thickness,
      productName: data.product_name,
      imagePath: data.small_img,
      style: data.style,
      season: data.weather,
      createdAt: new Date().toISOString(),
    };
  };

  const router = useRouter();

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [checkValue, setCheckValue] = useState<boolean>(true);

  const addClothes = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const closetDTO = convertToClosetDTO(totalData);
      if (Object.values(closetDTO).some((value) => value === '')) {
        // console.log(Object.values(closetDTO));
        // console.log('...');
        setCheckValue(false);
        return;
      }
      // setCheckValue(true);
      // console.log(checkValue);
      await postAddClothes(closetDTO);
      // console.log('post 완료');
      // console.log(closetDTO);
      setShowSaveModal(true);
      // router.back();
    } catch (error) {
      console.error('실패: ', error);
    }
  };

  return (
    <>
      <form action="" className={styles.addFormContainer} onSubmit={addClothes}>
        <SelectImg />
        <div className={styles.infoBox}>
          <SelectName check={checkValue} />
          <SelectBrand check={checkValue} />
          <SelectCat check={checkValue} />
          <SelectSize check={checkValue} />
          <SelectWeather check={checkValue} />
          <SelectThickness check={checkValue} />
          <SelectStyles check={checkValue} />
          <SelectPrice check={checkValue} />
        </div>
        <div className={styles.btnBox}>
          <button className={styles.submit}>저장하기</button>
          {/* <button className={styles.temSubmit}>임시저장하기</button> */}
        </div>
      </form>
      <AddFormCheckModal isOpen={showSaveModal} />
    </>
  );
}
