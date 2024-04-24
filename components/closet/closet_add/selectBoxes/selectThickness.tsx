'use client';

import styles from '../../../../styles/closet/addform.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectThickness } from '../../../../Store/closetSlice/addClothesSlice';

export default function SelectThickness({ check }) {
  const [isClicked, setIsClicked] = useState(null);
  const dispatch = useDispatch();

  const submit = (value) => {
    setIsClicked(value);
    dispatch(selectThickness({ value: value }));
  };

  return (
    <>
      <label htmlFor="thickNess">
        두께
        <span className={styles.essentialcheck}>*</span>
        {check == false && isClicked === null && (
          <span className={styles.checkText}>두께를 선택해주세요</span>
        )}
      </label>
      <div className={styles.thicknessBox}>
        <input
          type="button"
          name=""
          id="thickNess1"
          value={'얇음'}
          onClick={() => submit('얇음')}
          className={`${isClicked === '얇음' && styles.thickClicked}`}
        />
        <input
          type="button"
          name=""
          id="thickNess2"
          value={'보통'}
          onClick={() => submit('보통')}
          className={`${isClicked === '보통' && styles.thickClicked}`}
        />
        <input
          type="button"
          name=""
          id="thickNess3"
          value={'두꺼움'}
          onClick={() => submit('두꺼움')}
          className={`${isClicked === '두꺼움' && styles.thickClicked}`}
        />
      </div>
    </>
  );
}
