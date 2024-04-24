import styles from '../../styles/Dimension/BottomSize.module.scss';
import BottomSizeNum from './BottomSizeNum';

function BottomSize() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img_Div}>
          <img src="/bottomsize.png" alt="" />
        </div>
        <BottomSizeNum />
      </div>
    </>
  );
}

export default BottomSize;
