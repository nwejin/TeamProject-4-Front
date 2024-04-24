'use client';

import styles from '../styles/navBox.module.scss';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';

export default function NavBox() {
  const userId = useSelector((state: RootState) => state.user.userId);

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link href="/community">
            <span className="material-symbols-outlined">forum</span>
          </Link>
        </li>
        <li>
          <Link href="/AIrecommend">
            <span className="material-symbols-outlined">checkroom</span>
          </Link>
        </li>
        <li>
          <Link href={`/closet/${userId}`}>
            <span className="material-symbols-outlined">add_circle</span>
          </Link>
        </li>
        <li>
          <Link href="/codipage">
            <span className="material-symbols-outlined">apparel</span>
          </Link>
        </li>
        <li>
          <Link href="/mypage">
            <span className="material-symbols-outlined">person</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
