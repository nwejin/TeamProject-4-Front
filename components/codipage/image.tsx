import React from 'react';
import styles2 from '../../styles/codi/codi2.module.scss';

interface MyComponentProps {
  imageSrc: string;
  onClick: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ imageSrc, onClick }) => {
  return (
    <div>
      <img
        className={styles2.img} // 이미지에 스타일 클래스 적용
        src={imageSrc}
        alt="Image"
        onClick={onClick}
      />
    </div>
  );
};

export default MyComponent;
