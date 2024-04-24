import Link from 'next/link';
import styles from '../../../styles/closet/closet.module.scss';
import { RootState } from '../../../Store/Store';
import { useSelector } from 'react-redux';
interface props {
  open: Boolean;
}

export default function AddToggle(open: props) {
  const getUserId = useSelector((state: RootState) => state.user.userId);

  // console.log(open);
  // const toggleHeight = open ? '15vh' : '0';
  // const toggleOpacity = open ? '1' : '0';
  return (
    <div
      className={styles.addToggle}
      // style={{ height: toggleHeight, opacity: toggleOpacity }}
    >
      <ul>
        <li>
          <Link href="/closet/clothesInfo">제품 선택하기</Link>
        </li>
        <li>
          <Link href={`/closet/${getUserId}/addclothes`}>직접 올리기</Link>
        </li>
      </ul>
    </div>
  );
}
