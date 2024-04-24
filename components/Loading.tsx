import React from 'react';
import Lottie from 'react-lottie-player';
import LoadingAnimation from '../public/Loading.json';
import styles from '../styles/Loading.module.scss';

function Loading() {
  return (
    <>
      <div className={styles.container}>
        <Lottie animationData={LoadingAnimation} loop play />
        <h3>Loading...</h3>
      </div>
    </>
  );
}

export default Loading;
