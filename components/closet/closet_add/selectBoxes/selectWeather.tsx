'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../../styles/closet/addform.module.scss';
import { selectWeather } from '../../../../Store/closetSlice/addClothesSlice';

export default function SelectWeather({ check }) {
  const [isClicked, setIsClicked] = useState(null);
  const dispatch = useDispatch();

  const submit = (value) => {
    setIsClicked(value);
    dispatch(selectWeather({ value: value }));
  };

  return (
    <>
      <label htmlFor="weather">
        계절
        <span className={styles.essentialcheck}>*</span>
        {check == false && isClicked === null && (
          <span className={styles.checkText}>계절을 선택해주세요</span>
        )}
      </label>
      <div className={styles.weatherBox}>
        <input
          type="button"
          name=""
          id="weatherSpring"
          value={'봄'}
          onClick={() => submit('봄')}
          className={`${isClicked === '봄' && styles.weatherClicked}`}
        />
        <input
          type="button"
          name=""
          id="weatherSummer"
          value={'여름'}
          onClick={() => submit('여름')}
          className={`${isClicked === '여름' && styles.weatherClicked}`}
        />
        <input
          type="button"
          name=""
          id="weatherAuthum"
          value={'가을'}
          onClick={() => submit('가을')}
          className={`${isClicked === '가을' && styles.weatherClicked}`}
        />
        <input
          type="button"
          name=""
          id="weatherWinter"
          value={'겨울'}
          onClick={() => submit('겨울')}
          className={`${isClicked === '겨울' && styles.weatherClicked}`}
        />
      </div>
    </>
  );
}
