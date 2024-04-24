'user client';
import React from 'react';
import styles from '../../styles/closet/closet.module.scss';
// ClothesInfoBox 컴포넌트에서 선택된 이미지 정보를 전달받을 props 추가// ClothesInfoBox 컴포넌트에서 이미지를 클릭했을 때 호출될 함수 추가

interface ClothesInfoBoxProps {
  clothes: {
    id: number;
    imagePath: string;
    productName: string;
  };
  onImageSelect: (imageSrc: string, id: number) => void;
}
const ClothesInfoBox: React.FC<ClothesInfoBoxProps> = ({
  clothes,
  onImageSelect,
}) => {
  const liked = () => {
    console.log('좋아요!');
  };

  const { id, imagePath, productName } = clothes; // 옷의 ID를 비구조화 할당

  const onClick = () => {
    console.log('이미지 URL:', imagePath);
    console.log('ID:', id); // 옷의 ID 출력
    onImageSelect(imagePath, id); // 이미지 클릭 시 선택된 이미지 정보와 ID를 상위 컴포넌트로 전달
  };

  return (
    <div className={styles.infoSmallBox} onClick={onClick}>
      <div>
        <span className={styles.title}>{productName}</span>
        <button onClick={liked}>
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
      <div className={styles.a}>
        <img src={imagePath} alt="" />
      </div>
    </div>
  );
};
export default ClothesInfoBox;
