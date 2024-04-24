'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/header.module.scss';
import '../styles/icons.scss';
import SideBar from './sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import { usePathname } from 'next/navigation';
import { getUser } from '../service/closetApiService';
import { useDispatch } from 'react-redux';
import {
  setUserNickName,
  setUserImg,
} from '../Store/userSlice/userNickNameSlice';

interface UserData {
  nickname: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const router = useRouter();

  const path = usePathname();

  // console.log(path);

  // 닫기 버튼
  const close = () => {
    setIsOpen(false);
  };

  // 뒤로가기 버튼
  const back = () => {
    router.back();
  };

  // const [userData, setUserData] = useState<UserData>({
  //   nickname: '',
  // });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const accessToken = sessionStorage.getItem('accessToken');

  //   const fetchUserData = async () => {
  //     if (accessToken) {
  //       try {
  //         const fetchUser = await getUser();
  //         // console.log('유저데이터', fetchUser);
  //         dispatch(setUserNickName({ value: fetchUser.nickname }));
  //         dispatch(setUserImg({ value: fetchUser.image_path }));
  //       } catch (error) {
  //         console.error('유저 데이터를 가져오는 도중 오류 발생', error);
  //       }
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <ul>
        {/* <li>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </li> */}
        <li>
          {isLogin ? (
            <Link href="/login">
              <span className="material-symbols-outlined">login</span>
            </Link>
          ) : (
            <Link href="">
              <span className="material-symbols-outlined">logout</span>
            </Link>
          )}
        </li>

        <li>
          <Link href="/">
            <Image src="/logo.png" alt="로고" width={75} height={48} priority />
            {/* <img src="logo.png" alt="로고" /> */}
          </Link>
        </li>

        <li>
          {path !== '/' ? (
            <button onClick={back}>
              <span className="material-symbols-outlined">
                keyboard_backspace
              </span>
            </button>
          ) : (
            <button>
              <span
                className="material-symbols-outlined"
                style={{ color: '#f6f6f6' }}
              >
                keyboard_backspace
              </span>
            </button>
          )}
        </li>
      </ul>
      {/* {isOpen && <SideBar open={isOpen} close={close} width={width} />} */}
      {/* <SideBar open={isOpen} close={close} /> */}
    </div>
  );
}
