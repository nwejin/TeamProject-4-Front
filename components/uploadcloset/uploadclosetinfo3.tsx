'use client';
import React from 'react';
import styles from '../../styles/closet/closet.module.scss';

interface ClothesInfoBoxProps {
  onImageClick: (imageUrl: string) => void;
}

const ClothesInfoBox: React.FC<ClothesInfoBoxProps> = ({ onImageClick }) => {
  return (
    <div
      className={styles.infoSmallBox}
      onClick={() =>
        onImageClick(
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MTNfMjkx%2FMDAxNjk0NTY5MTYzOTM4.P2wPWdY_PXFURV9XLAwXdrHJb8n0n457cemWOVfTVhcg.GpQI0hRp4JImR2yHCQYzM-AVQJaUv6G8PLi82uk5az8g.JPEG.photostudiohee%2FKJH04886.jpg&type=a340'
        )
      }
    >
      <div>
        <span>제품명</span>
      </div>
      <img
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MTNfMjkx%2FMDAxNjk0NTY5MTYzOTM4.P2wPWdY_PXFURV9XLAwXdrHJb8n0n457cemWOVfTVhcg.GpQI0hRp4JImR2yHCQYzM-AVQJaUv6G8PLi82uk5az8g.JPEG.photostudiohee%2FKJH04886.jpg&type=a340"
        alt=""
      />
    </div>
  );
};

export default ClothesInfoBox;
