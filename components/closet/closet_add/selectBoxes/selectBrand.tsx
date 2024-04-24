import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectBrandName } from '../../../../Store/closetSlice/addClothesSlice';
import styles from '../../../../styles/closet/addform.module.scss';

export default function SelectBrand({ check }) {
  const dispatch = useDispatch();
  const [brandName, setBrandName] = useState('');

  return (
    <>
      <label htmlFor="brand">
        브랜드
        <span className={styles.essentialcheck}>*</span>
        {check == false && brandName === '' && (
          <span className={styles.checkText}>브랜드명을 입력해주세요</span>
        )}
      </label>
      <input
        type="text"
        name="brand"
        id="brand"
        value={brandName}
        className={styles.inputBox}
        onChange={(e) => {
          setBrandName(e.target.value);
          dispatch(selectBrandName({ value: e.target.value }));
        }}
      />
    </>
  );
}
