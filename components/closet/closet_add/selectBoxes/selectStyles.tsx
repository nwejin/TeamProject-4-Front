'use client';

import styles from '../../../../styles/closet/addform.module.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStyle_str } from '../../../../Store/closetSlice/addClothesSlice';

interface aiStyles {
  style_num: string;
  score: string;
}
export default function SelectStyles({ check }) {
  const dispatch = useDispatch();

  const aiStyles: aiStyles = useSelector((state: any) => ({
    style_num: state.clothes.clothes.style_num,
    score: state.clothes.clothes.score,
  }));

  // console.log('스코어', aiStyles.score);
  const [styleState, setStyleState] = useState('');

  useEffect(() => {
    setStyleState('');
  }, []);

  useEffect(() => {
    // 초기 렌더링 시에는 아무것도 하지 않음
    if (aiStyles.style_num === undefined) {
      setStyleState('');
      dispatch(selectStyle_str({ value: '' }));
      return;
    }

    switch (aiStyles.style_num) {
      case '0':
        setStyleState('캐주얼');
        dispatch(selectStyle_str({ value: 'Casual' }));
        break;
      case '1':
        setStyleState('스포티');
        dispatch(selectStyle_str({ value: 'Sporty' }));
        break;
      case '2':
        setStyleState('레트로');
        dispatch(selectStyle_str({ value: 'Retro' }));
        break;
      case '3':
        setStyleState('고프 코어');
        dispatch(selectStyle_str({ value: 'Gorp_Core' }));
        break;
      case '4':
        setStyleState('포멀');
        dispatch(selectStyle_str({ value: 'Formal' }));
        break;
    }
    // console.log('스타일', aiStyles.style_num);
  }, [aiStyles.style_num]);

  return (
    <>
      <label htmlFor="style">
        스타일
        <span className={styles.essentialcheck}>*</span>
        {check == false && styleState === '' && (
          <span className={styles.checkText}>
            사진 및 카테고리를 선택해주세요
          </span>
        )}
      </label>
      <div>
        <input
          className={styles.inputBox}
          type="text"
          name="style"
          id="style"
          value={styleState}
          readOnly
        />
      </div>
    </>
  );
}
