'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../../styles/closet/addform.module.scss';
import { selectSize as selectSizeAction } from '../../../../Store/closetSlice/addClothesSlice';

export default function SelectSize({ check }) {
  const dispatch = useDispatch();
  const [isSizeDisabled, setIsSizeDisabled] = useState(false);
  const categoryData = useSelector((state: any) => ({
    major_category: state.clothes.clothes.major_category,
  }));

  const [size, setSize] = useState('');

  const selectSize = (e) => {
    const selectedSize = e.target.value;
    setSize(selectedSize);
    setIsSizeDisabled(!isSizeDisabled);
    dispatch(selectSizeAction({ value: selectedSize }));
  };

  return (
    <>
      <label htmlFor="Size">
        사이즈
        <span className={styles.essentialcheck}>*</span>
        {check == false && size === '' && (
          <span className={styles.checkText}>사이즈를 선택해주세요</span>
        )}
      </label>
      <section className={styles.sizeBox}>
        <button
          className={styles.sizeBtn}
          onClick={(e) => {
            e.preventDefault();
            setIsSizeDisabled(!isSizeDisabled);
          }}
        >
          <span>{size}</span>
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        </button>
        {isSizeDisabled && (
          <section className={styles.sizeSelectBox}>
            {categoryData.major_category !== 'Shoes' ? (
              <ul>
                <li>
                  <input
                    type="button"
                    name=""
                    id="sizeS"
                    className="sizeInput"
                    value="S"
                    onClick={selectSize}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    name=""
                    id="sizeM"
                    className="sizeInput"
                    value="M"
                    onClick={selectSize}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    name=""
                    id="sizeL"
                    className="sizeInput"
                    value="L"
                    onClick={selectSize}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    name=""
                    id="sizeXL"
                    className="sizeInput"
                    value="XL"
                    onClick={selectSize}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    name=""
                    id="sizeXXL"
                    className="sizeInput"
                    value="XXL"
                    onClick={selectSize}
                  />
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <input
                    type="button"
                    name=""
                    id="size30"
                    className="sizeInput"
                    value="230"
                    onClick={selectSize}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    name=""
                    id="size40"
                    className="sizeInput"
                    value="240"
                    onClick={selectSize}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    name=""
                    id="size50"
                    className="sizeInput"
                    value="250"
                    onClick={selectSize}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    name=""
                    id="size60"
                    className="sizeInput"
                    value="260"
                    onClick={selectSize}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    name=""
                    id="size70"
                    className="sizeInput"
                    value="270"
                    onClick={selectSize}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    name=""
                    id="size80"
                    className="sizeInput"
                    value="280"
                    onClick={selectSize}
                  />
                </li>
                <li>
                  <input
                    type="button"
                    name=""
                    id="size90"
                    className="sizeInput"
                    value="290"
                    onClick={selectSize}
                  />
                </li>
              </ul>
            )}
          </section>
        )}
      </section>
    </>
  );
}
