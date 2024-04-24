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
          'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fbackground%2F20230525%2Foriginal%2Fpngtree-golden-retriever-laying-in-the-fall-picture-image_2735273.jpg&type=l340_165'
        )
      }
    >
      <div>
        <span>제품명</span>
      </div>
      <img
        src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fpng.pngtree.com%2Fbackground%2F20230525%2Foriginal%2Fpngtree-golden-retriever-laying-in-the-fall-picture-image_2735273.jpg&type=l340_165"
        alt=""
      />
    </div>
  );
};

export default ClothesInfoBox;
