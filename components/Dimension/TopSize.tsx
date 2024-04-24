import styles from '../../styles/Dimension/TopSize.module.scss';
import TopSizeNum from './TopSizeNum';

function TopSize() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img_Div}>
          <img src="/topsize.png" alt="" />
        </div>
        <TopSizeNum />
      </div>
    </>
  );
}

export default TopSize;
