// Dimension 컴포넌트
import Link from 'next/link';
import styles from '../../styles/MyPage/Dimension.module.scss';
import Image from 'next/image';

function Dimension() {
  return (
    <>
      <div className={styles.gridContainer}>
        <Link href="/dimension/top">
          <div className={styles.gridItem}>
            <Image
              src="/topicon.png"
              alt="상의 아이콘"
              width={50}
              height={50}
            />
            <span>상의 Size</span>
            <span>보러 가기</span>
          </div>
        </Link>
        <Link href="/dimension/bottom">
          <div className={styles.gridItem}>
            <Image
              src="/bottomicon.png"
              alt="하의 아이콘"
              width={50}
              height={50}
            />
            <span>하의 Size</span>
            <span>보러 가기</span>
          </div>
        </Link>
        <Link href="/dimension/outer">
          <div className={styles.gridItem}>
            <Image
              src="/outericon.png"
              alt="아우터 아이콘"
              width={50}
              height={50}
            />

            <span>아우터 Size</span>
            <span>보러 가기</span>
          </div>
        </Link>
        <Link href="/dimension/shoes">
          <div className={styles.gridItem}>
            <Image
              src="/shoesicon.png"
              alt="신발 아이콘"
              width={50}
              height={50}
            />
            <span>신발 Size</span>
            <span>보러 가기</span>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Dimension;
