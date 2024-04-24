import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectPrice as selectPriceAction } from '../../../../Store/closetSlice/addClothesSlice';
import styles from '../../../../styles/closet/addform.module.scss';

export default function SelectPrice({ check }) {
  const dispatch = useDispatch();
  const [price, setPrice] = useState('');

  return (
    <>
      <label htmlFor="price">
        구매 가격
        <span className={styles.essentialcheck}>*</span>
        {check == false && price === '' && (
          <span className={styles.checkText}>구매 가격을 입력해주세요</span>
        )}
      </label>
      <input
        type="text"
        name="price"
        id="price"
        value={price}
        className={styles.inputBox}
        onChange={(e) => {
          setPrice(e.target.value);
          dispatch(selectPriceAction({ value: e.target.value }));
        }}
      />
    </>
  );
}
