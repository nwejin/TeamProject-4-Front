'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showList } from '../../../Store/closetSlice/showListSlice';
import styles from '../../../styles/closet/closet.module.scss';

export default function SortBox() {
  const dispatch = useDispatch();

  const bigImg = () => {
    dispatch(showList(true));
  };

  const smallImg = () => {
    dispatch(showList(false));
  };

  const sortStatus = useSelector((state: any) => state.status.status);
  // console.log('sort 상태', sortStatus);

  return (
    <>
      <button onClick={smallImg} className={sortStatus ? '' : styles.smallBtn}>
        <span className="material-symbols-outlined">splitscreen</span>
      </button>
      <button onClick={bigImg} className={sortStatus ? styles.bigBtn : ''}>
        <span className="material-symbols-outlined">grid_view</span>
      </button>
    </>
  );
}
