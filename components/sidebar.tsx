import styles from '../styles/header.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../Store/userSlice/userSlice';
import { RootState } from '../Store/Store';
import { getUser } from '../service/closetApiService';
import {
  setUserNickName,
  setUserImg,
} from '../Store/userSlice/userNickNameSlice';

interface props {
  open: Boolean;
  close: () => void;
}

export default function SideBar({ open, close }: props) {
  const dispatch = useDispatch();
  const path = usePathname();

  // Redux에서 userid 상태 가져오기. (RootState 타입 지정)
  const userId = useSelector((state: RootState) => state.user.userId);
  // console.log('userId > ', userId); // userId 값 가져오는 확인.

  // 로그인 상태 state
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!userId); // 사용자 ID가 있으면 로그인 상태로 설정해주기.
    // accessToken이 없으면 로그아웃 시키기.
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      dispatch(setUserId(''));
      setLoggedIn(false);
      close(); // 사이드바 닫기
    }
  }, [userId]); // userId가 변경 될 때마다 useEffect 실행.

  const logOut = () => {
    // 로그아웃 시 userId 상태 초기화
    dispatch(setUserId(''));
    sessionStorage.clear(); // 세션 스토리지의 모든 값 제거. (2개 토큰 - R.T , A.T) 제거.
    // 로그아웃 시 UI 갱신
    setLoggedIn(false);
    close();
  };
  const [isNickName, setIsNickName] = useState('');
  const [isImg, setIsIMG] = useState('');

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');

    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const fetchUser = await getUser();
          // console.log('유저데이터', fetchUser);
          setIsNickName(fetchUser.nickname);
          setIsIMG(fetchUser.image_path);
          dispatch(setUserNickName({ value: fetchUser.nickname }));
          dispatch(setUserImg({ value: fetchUser.image_path }));
        } catch (error) {
          console.error('유저 데이터를 가져오는 도중 오류 발생', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const nickName = useSelector((state: any) => state.userData.userNickName);
  const userImg = useSelector((state: any) => state.userData.userImg);

  // console.log(nickName.value);
  // console.log(userImg.value);

  // console.log(path);

  const sidebarLeft = open ? '0%' : '-100%';

  return (
    <div
      className={styles.sideBarContainer}
      style={{
        opacity: open ? '1' : '0',
        left: sidebarLeft,
      }}
      onClick={close}
    >
      <div className={styles.sideBarInnerBox} style={{ left: sidebarLeft }}>
        <nav className={styles.sideBarContentBox}>
          <ul className={styles.userBox}>
            {/* 삼항 연산자로 로그인 / 회원가입 / 로그아웃 변경 */}
            {loggedin ? (
              <ul className={styles.myPageBox}>
                <li>
                  <Link href={'/mypage'}>
                    <div>
                      <img src={userImg.value} alt="" />
                    </div>
                    <span style={{ fontWeight: '900' }}>{nickName.value}</span>
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#ff5656' }}
                    >
                      chevron_right
                    </span>
                  </Link>
                </li>
              </ul>
            ) : (
              <>
                <li className={styles.loginBtn}>
                  <Link href="/login" onClick={close}>
                    로그인
                  </Link>
                </li>
                <li className={styles.registerBtn}>
                  <Link href="/signup" onClick={close}>
                    회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className={styles.navBox}>
            <li>
              <Link href="/AIrecommend" onClick={close}>
                {path == `/AIrecommend` && <div className={styles.path}>-</div>}
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#cecece' }}
                >
                  psychology
                </span>
                <p>AI 옷 추천</p>
              </Link>
            </li>
            <li className={styles.cat}>
              <span>옷장</span>
            </li>

            <li>
              <Link href={`/closet/${userId}`} onClick={close}>
                {path == `/closet/${userId}` && (
                  <div className={styles.path}>-</div>
                )}
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#cecece' }}
                >
                  apparel
                </span>
                <p>옷장 보기</p>
              </Link>
            </li>
            <li>
              <Link href={`/closet/${userId}/likedcloth`} onClick={close}>
                {path == `/closet/${userId}/likedcloth` && (
                  <div className={styles.path}>-</div>
                )}
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#cecece' }}
                >
                  favorite
                </span>
                <p> 좋아요한 옷</p>
              </Link>
            </li>
            <li className={styles.cat}>
              <span>코디</span>
            </li>
            <li>
              <Link href={'/codipage'} onClick={close}>
                {path == '/codipage' && <div className={styles.path}>-</div>}
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#cecece' }}
                >
                  deployed_code_account
                </span>
                <p>내 코디</p>
              </Link>
            </li>
          </ul>
          {loggedin && (
            <ul className={styles.logoutBox}>
              <li>
                <Link href={'/login'} onClick={logOut}>
                  <span>로그아웃 </span>
                  <span className="material-symbols-outlined">logout</span>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
      {
        <button
          onClick={close}
          className={styles.closeBtn}
          style={{
            opacity: open ? '1' : '0',
          }}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      }
    </div>
  );
}
