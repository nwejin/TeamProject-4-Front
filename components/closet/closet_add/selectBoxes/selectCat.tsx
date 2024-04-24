'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/closet/addform.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMajorCategory,
  selectMiddleCategory,
  selectStyle_num,
  selectScore,
} from '../../../../Store/closetSlice/addClothesSlice';
import { postAddStyles } from '../../../../service/closetApiService';

export default function SelectCat({ check }) {
  //  const categoryArr = {
  //   Top: [
  //     { Shirt: '티셔츠' },
  //     { Short_T_shirt: '반팔 티셔츠' },
  //     { Long_T_shirt: '긴팔 티셔츠' },
  //     { Hoodies: '후드 티셔츠' },
  //     { Sweat_shirt: '맨투맨' },
  //     { Sweater: '니트' },
  //   ],
  //   Pants: [
  //     { Denim: '청바지' },
  //     { Slacks: '슬랙스' },
  //     { Sport_pants: '트레이닝복' },
  //     { Short_pants: '반바지' },
  //   ],
  //   Outer: [
  //     { Jacket: '자켓' },
  //     { Coat: '코트' },
  //     { Padded_jacket: '패딩' },
  //     { Blazer: '블레이저' },
  //     { Mustang: '무스탕' },
  //     { Sport_shirt: '스포츠 자켓' },
  //   ],
  //   Shoes: [
  //     { Running_shoes: '러닝 슈즈' },
  //     { Dress_Shoes: '구두' },
  //     { Sneakers: '스니커즈' },
  //     { Boots: '부츠' },
  //   ],
  //   Skirt: [{ Short_Skirt: '숏 스커트' }, { Long_Skirt: '롱 스커트' }],
  //   Onepiece: [{ Short_Onepiece: '숏 원피스' }, { Long_Onepiece: '롱 원피스' }],
  //   Accessory: [
  //     { Watch: '시계' },
  //     { Jewelry: '주얼리' },
  //     { Eyewear: '안경' },
  //     { Headwear: '모자' },
  //     { Bag: '가방' },
  //   ],
  // };

  const categoryArr = require('../../../../data/categoryData');

  interface aiData {
    img: string;
  }

  const dispatch = useDispatch();

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSubCategoryDropdownOpen, setIsSubCategoryDropdownOpen] =
    useState(false);
  const [categoryInfo, setCategoryInfo] = useState([]);

  const selectCategory = (category) => {
    setCategory(category);
    setIsCategoryDropdownOpen(false);
    setIsSubCategoryDropdownOpen(true);
    setSubCategory('');
    setCategoryInfo(categoryArr[category]);
    dispatch(selectMajorCategory({ value: category }));
  };

  const selectSubCategory = (subcategory) => {
    setSubCategory(subcategory);
    setIsSubCategoryDropdownOpen(false);
    dispatch(selectMiddleCategory({ value: subcategory }));
  };

  // ai용 데이터 (파이썬)
  const aiData: aiData = useSelector((state: any) => ({
    img: state.clothes.clothes.small_img,
  }));

  // console.log(category);
  // console.log(aiData.img);
  // console.log(aiData);

  const [pythonCategory, setPythonCategoty] = useState('');

  useEffect(() => {
    switch (category) {
      case 'Top':
        setPythonCategoty('Top');
        break;
      case 'Pants':
        setPythonCategoty('Bottom');
        break;
      case 'Outer':
        setPythonCategoty('Outer');
        break;
      case 'Shoes':
        setPythonCategoty('Shoes');
        break;
      case 'Skirt':
        setPythonCategoty('Bottom');
        break;
      case 'Onepiece':
        setPythonCategoty('Bottom');
        break;
    }
  }, [category]);

  let formData = {
    [pythonCategory]: aiData.img,
  };

  useEffect(() => {
    const postStyles = async () => {
      try {
        // console.log('파이썬 전송 카테고리', pythonCategory);

        const aiStyle = await postAddStyles(formData);
        // console.log('실제 전송 데이터', formData);

        dispatch(selectStyle_num({ value: Object.keys(aiStyle)[0] as string }));
        dispatch(selectScore({ value: Object.values(aiStyle)[0] as string }));
      } catch (error) {
        console.error('실패: ', error);
      }
    };

    if (aiData.img && category) {
      postStyles();
    }
  }, [pythonCategory]);

  // console.log(Object.keys(subCategory).join());
  // console.log(subCategory);

  return (
    <>
      <label htmlFor="">
        카테고리
        <span className={styles.essentialcheck}>*</span>
        {check == false && category === '' && (
          <span className={styles.checkText}>카테고리를 선택해주세요</span>
        )}
      </label>
      <div className={styles.catContainer}>
        <section className={styles.catBox}>
          <button
            className={styles.sizeBtn}
            onClick={(e) => {
              setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
              e.preventDefault();
            }}
          >
            <span>
              {category === 'Top'
                ? '상의'
                : category === 'Pants'
                ? '하의'
                : category === 'Outer'
                ? '아우터'
                : category === 'Shoes'
                ? '신발'
                : category === 'Skirt'
                ? '치마'
                : category === 'Onepiece'
                ? '원피스'
                : category === 'Accessory'
                ? '악세사리'
                : category}
            </span>
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>
          {isCategoryDropdownOpen && (
            <section className={styles.sizeSelectBox2}>
              <ul>
                {Object.keys(categoryArr).map((cat, index) => (
                  <li key={index}>
                    <input
                      type="button"
                      value={
                        cat === 'Top'
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
                      onClick={() => {
                        selectCategory(cat);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>

        <section className={styles.catBox}>
          <button
            className={styles.sizeBtn}
            onClick={(e) => {
              setIsSubCategoryDropdownOpen(!isSubCategoryDropdownOpen);
              e.preventDefault();
            }}
            disabled={!subCategory}
          >
            <span>
              {subCategory &&
                categoryArr[category].find((obj) =>
                  obj.hasOwnProperty(subCategory)
                )[subCategory]}
            </span>
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>
          {isSubCategoryDropdownOpen && (
            <section className={styles.sizeSelectBox2}>
              <ul>
                {categoryInfo.map((item, index) => (
                  <li key={index}>
                    <input
                      type="button"
                      value={`${item[Object.keys(item)[0]]}`}
                      onClick={() => {
                        console.log();
                        selectSubCategory(Object.keys(item)[0]);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
      </div>
    </>
  );
}
