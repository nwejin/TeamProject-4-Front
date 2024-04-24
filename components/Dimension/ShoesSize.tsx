import styles from '../../styles/Dimension/ShoesSize.module.scss';
import ShoesSizeNum from './ShoesSizeNum';

function ShoesSize() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img_Div}>
          <img src="/shoessize.png" alt="" />
        </div>
        <ShoesSizeNum />
      </div>
    </>
  );
}

export default ShoesSize;
