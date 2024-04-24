import styles from '../../styles/Dimension/OuterSize.module.scss';
import OuterSizeNum from './OuterSizeNum';

function OuterSize() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img_Div}>
          <img src="/outersize.png" alt="" />
        </div>
        <OuterSizeNum />
      </div>
    </>
  );
}

export default OuterSize;
