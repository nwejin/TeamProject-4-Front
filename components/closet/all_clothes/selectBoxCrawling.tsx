'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  selectMajorCraw,
  selectMiddleCraw,
} from '../../../Store/closetSlice/selectDataCrawlingSlice';
import { useSelector } from 'react-redux';

import styles from '../../../styles/closet/addclothes.module.scss';

export default function SelectBoxCrawling() {
  const selectMajorDataCraw = useSelector(
    (state: any) => state.searchCrawling.selectMajorCraw
  );
  const selectMiddleDataCraw = useSelector(
    (state: any) => state.searchCrawling.selectMiddleCraw
  );

  const [isMajorCat, setIsMajorCat] = useState(selectMajorDataCraw);
  const [isMiddleCat, setIsMiddleCat] = useState('All');

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const category = queryParams.get('category');
  //   if (category && category in categoryArr) {
  //     setIsMajorCat(category);
  //   }
  // }, []);

  const dispatch = useDispatch();

  const majorSelected = (value) => {
    // console.log('대분류', value);
    setIsMajorCat(value);
    if (value == 'All') {
      dispatch(selectMajorCraw({ value: '' }));
    } else {
      dispatch(selectMajorCraw({ value: value }));
      dispatch(selectMiddleCraw({ value: '' }));
    }
  };

  const midSelected = (value) => {
    // console.log('중분류', value);
    setIsMiddleCat(value);
    if (value == 'All') {
      dispatch(selectMiddleCraw({ value: '' }));
    } else {
      dispatch(selectMiddleCraw({ value: value }));
    }
  };

  const categoryArr = {
    All: [{ All: '전체' }],
    Top: [
      { Shirt: '티셔츠' },
      { Short_T_shirt: '반팔 티셔츠' },
      { Long_T_shirt: '긴팔 티셔츠' },
      { Hoodies: '후드 티셔츠' },
      { Sweat_shirt: '맨투맨' },
      { Sweater: '니트' },
    ],
    Pants: [
      { Denim: '청바지' },
      { Slacks: '슬랙스' },
      { Sport_pants: '트레이닝복' },
      { Short_pants: '반바지' },
    ],
    Outer: [
      { Jacket: '자켓' },
      { Coat: '코트' },
      { Padded_jacket: '패딩' },
      { Blazer: '블레이저' },
      { Mustang: '무스탕' },
      { Sport_Jacket: '스포츠 자켓' },
    ],
    Shoes: [
      { Running_shoes: '러닝 슈즈' },
      { Dress_Shoes: '구두' },
      { Sneakers: '스니커즈' },
      { Boots: '부츠' },
    ],
    Skirt: [{ Short_Skirt: '숏 스커트' }, { Long_Skirt: '롱 스커트' }],
    Onepiece: [{ Short_Onepiece: '숏 원피스' }, { Long_Onepiece: '롱 원피스' }],
    Accessory: [
      { Watch: '시계' },
      { Jewelry: '주얼리' },
      { Eyewear: '안경' },
      { Headwear: '모자' },
      { Bag: '가방' },
    ],
  };

  return (
    <>
      <ul className={styles.selectUl}>
        {Object.keys(categoryArr).map((cat, index) => (
          <li key={index}>
            <input
              type="button"
              value={
                cat === 'All'
                  ? '전체'
                  : cat === 'Top'
                  ? '상의'
                  : cat === 'Pants'
                  ? '하의'
                  : cat === 'Outer'
                  ? '아우터'
                  : cat === 'Shoes'
                  ? '신발'
                  : cat === 'Skirt'
                  ? '치마'
                  : cat === 'Onepiece'
                  ? '원피스'
                  : cat === 'Accessory'
                  ? '악세사리'
                  : cat
              }
              className={
                selectMajorDataCraw === '' || cat !== selectMajorDataCraw
                  ? styles.bigCat
                  : styles.bigCatChecked
              }
              onClick={() => {
                majorSelected(cat);
              }}
            />
          </li>
        ))}
      </ul>
      {selectMajorDataCraw !== '' && (
        <ul className={styles.selectUl}>
          {categoryArr[selectMajorDataCraw].map((category, index) => (
            <li key={index}>
              <input
                type="button"
                className={
                  Object.keys(category)[0] === selectMiddleDataCraw
                    ? styles.smallCatChecked
                    : styles.smallCat
                }
                value={String(Object.values(category)[0])}
                onClick={() => {
                  midSelected(Object.keys(category)[0]);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
