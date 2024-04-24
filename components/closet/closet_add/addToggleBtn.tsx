'use client';

import { useState } from 'react';
import AddToggle from './addToggle';
import styles from '../../../styles/closet/closet.module.scss';

export default function AddToggleBtn() {
  const [isToggleOpen, setIsToggleOpen] = useState<Boolean>(false);
  // console.log(isToggleOpen);

  return (
    <div className={styles.addToggleBtn}>
      <button
        onClick={() => {
          setIsToggleOpen(!isToggleOpen);
        }}
      >
        {isToggleOpen ? (
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        ) : (
          '옷 추가하기'
        )}
      </button>
      {isToggleOpen && <AddToggle open={isToggleOpen} />}
    </div>
  );
}
