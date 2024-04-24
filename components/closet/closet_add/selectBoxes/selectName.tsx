import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectProductName } from '../../../../Store/closetSlice/addClothesSlice';
import styles from '../../../../styles/closet/addform.module.scss';

export default function SelectName({ check }) {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');

  return (
    <>
      <label htmlFor="productName">
        제품명
        <span className={styles.essentialcheck}>*</span>
        {check == false && productName === '' && (
          <span className={styles.checkText}>제품명을 입력해주세요</span>
        )}
      </label>
      <input
        className={styles.inputBox}
        type="text"
        name="productName"
        id="productName"
        value={productName}
        onChange={(e) => {
          setProductName(e.target.value);
          dispatch(selectProductName({ value: e.target.value }));
        }}
      />
    </>
  );
}
