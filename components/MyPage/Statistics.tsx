import React from 'react';
import Lottie from 'react-lottie-player';
import lottieJson from '../../public/working.json';
import styles from '../../styles/MyPage/Statistics.module.scss';

function Statistics() {
  return (
    <>
      <div className={styles.container}>
        <Lottie
          loop
          animationData={lottieJson}
          play
          className={styles.lottie}
        />
        <div className={styles.text}>준비중 입니다...</div>
      </div>
    </>
  );
}

export default Statistics;
