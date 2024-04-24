'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/MyPage/mypageEditContent.module.scss';
import axios from 'axios';
import WithdrawalModal from '../WithdrawalModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import { setUserId } from '../../Store/userSlice/userSlice';
import { useRouter } from 'next/navigation';
import EditPasswordModal from '../EditPasswordModal';
import { Token } from '../../service/common';
import Image from 'next/image';

// 스타일 enum 정의
const Style = {
  캐주얼: 'Casual',
  스포티: 'Sporty',
  레트로: 'Retro',
  고프고어: 'Gorp_Core',
  포멀: 'Formal',
};
interface UserData {
  userid: string;
  height: number;
  weight: number;
  favoriteStyle: string[];
}

function MypageEditContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.user.userId);
  // 각 스타일 요소의 상태를 관리하는 배열
  const [selectedDivs, setSelectedDivs] = useState(Array(8).fill(false));
  const [clickedStyles, setClickedStyles] = useState<String[]>([]);
  const [editableHeight, setEditableHeight] = useState<boolean>(false); // 키 수정 가능 여부 상태
  const [editableWeight, setEditableWeight] = useState<boolean>(false); // 몸무게 수정 가능 여부 상태
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false); // 계정 삭제 모달
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false); // 비번 변경 모달
  const [userData, setUserData] = useState<UserData>({
    userid: '',
    height: null,
    weight: null,
    favoriteStyle: [],
  });
  // 스타일 요소의 상태를 토글하는 함수
  const handleDivChange = async (index) => {
    try {
      const selectedStyle = Object.values(Style)[index]; // 열거형 저장

      // 선택된 스타일을 확인합니다.
      if (!selectedDivs[index]) {
        // 선택되지 않은 스타일만 처리합니다.

        // 다른 모든 스타일의 선택 상태를 해제합니다.
        const newSelectedDivs = Array(8).fill(false);
        newSelectedDivs[index] = true; // 선택한 스타일만 선택 상태로 변경합니다.
        setSelectedDivs(newSelectedDivs);

        // 선택한 스타일을 클릭한 스타일 목록에 업데이트합니다.
        setClickedStyles([selectedStyle]);

        const data = {
          favoriteStyle: selectedStyle,
        };

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_DB_HOST}/user/style`,
          data
        );
      }
    } catch (error) {
      console.error('스타일 업데이트 중 오류 발생', error);
    }
  };

  // 선호 스타일 배열
  const likeStyles = ['캐주얼', '스포티', '레트로', '고프고어', '포멀'];

  // 키 수정
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거 (숫자만 칠수 있게)
    setUserData({ ...userData, height: value ? parseInt(value) : null });
  };

  const handleHeightEditClick = () => {
    setEditableHeight(true);
  };

  // 몸무게 수정
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setUserData({ ...userData, weight: value ? parseInt(value) : null });
  };

  const handleWeightEditClick = () => {
    setEditableWeight(true);
  };

  // 수정 데이터 저장
  const saveUserData = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user/physical`,
        userData
      );
      setEditableHeight(false); // 저장 시 다시 readonly 상태로
      setEditableWeight(false);
    } catch (error) {
      console.error('오류 발생', error);
    }
  };

  // 유저 정보 받아오기
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user`
      );
      const { height, weight, userid, favoriteStyle } = response.data.data;

      setUserData({ height, weight, userid, favoriteStyle });

      // favoriteStyle이 배열이 아닌 경우에만 처리합니다.
      if (typeof favoriteStyle === 'string') {
        // favoriteStyle에 있는 스타일에 대해 선택 상태를 업데이트합니다.
        const index = Object.values(Style).indexOf(favoriteStyle);
        if (index !== -1) {
          const updatedSelectedDivs = Array(8).fill(false);
          updatedSelectedDivs[index] = true;
          setSelectedDivs(updatedSelectedDivs);
        }
      } else {
        console.error('유저의 favoriteStyle이 배열이 아닙니다.');
      }
    } catch (error) {
      console.error('유저 데이터를 가져오는 도중 오류 발생', error);
    }
  };

  useEffect(() => {
    Token();
    fetchUserData();
  }, []);

  // 비밀번호 변경 클릭시
  const handleEditPasswordButtonClick = () => {
    setShowEditPasswordModal(true);
  };

  // 비밀번호 변경 모달 취소 클릭 시
  const handleEditPasswordModalCancel = () => {
    setShowEditPasswordModal(false);
  };

  // 비밀번호 변경 모달 확인 클릭 시
  const handleEditPasswordModalConfirm = () => {
    setShowEditPasswordModal(false);
  };
  // 계정 삭제
  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user`
      );
      dispatch(setUserId(''));
      sessionStorage.clear();
      router.push('/login');
    } catch (error) {
      console.error('계정 삭제 중 오류 발생', error);
    }
  };

  // 회원탈퇴 버튼 클릭 시 모달 보이기
  const handleWithdrawalButtonClick = () => {
    setShowWithdrawalModal(true);
  };

  // 모달에서 취소 버튼 클릭 시
  const handleWithdrawalModalCancel = () => {
    setShowWithdrawalModal(false);
  };

  // 모달에서 확인 버튼 클릭 시
  const handleWithdrawalModalConfirm = () => {
    setShowWithdrawalModal(false);
    deleteUser();
  };
  return (
    <>
      <div className={styles.Container}>
        {/* 선호스타일 변경 */}
        <div className={styles.title_div}>
          <img src="/bar.png" alt="" />
          <div className={styles.title}>선호스타일 (1개 선택)</div>
        </div>
        <div className={styles.like_Style_div}>
          {/* 각 선호 스타일 요소에 대해 매핑 */}
          {likeStyles.map((style, index) => (
            <div
              key={index}
              className={`${styles.like_Style} ${
                selectedDivs[index] ? styles.clicked : ''
              }`}
              onClick={() => handleDivChange(index)}
            >
              {style}
            </div>
          ))}
        </div>
        {/* 체형 정보 변경 */}
        <div className={styles.title_div}>
          <img src="/bar.png" alt="" />
          <div className={styles.title}>체형 정보</div>
        </div>
        <div className={styles.physical_Info_div}>
          {/* 키 */}
          <div className={styles.height}>
            <div className={styles.height_title}>키 (cm)</div>
            <div className={styles.height_input_div}>
              <input
                className={`${styles.height_input} ${
                  !editableHeight ? styles.none_border : ''
                } `}
                value={userData.height !== null ? userData.height : ''}
                type="text"
                placeholder="수치를 입력해주세요."
                readOnly={!editableHeight}
                onChange={handleHeightChange}
              />
            </div>
            {!editableHeight && (
              <div
                className={styles.physicalicon}
                onClick={handleHeightEditClick}
              >
                <Image src="/edit2.png" alt="" width={20} height={20} />
              </div>
            )}
            {editableHeight && (
              <div className={styles.physicalicon} onClick={saveUserData}>
                <Image src="/correct.png" alt="" width={20} height={20} />
              </div>
            )}
          </div>
          <br />
          {/* 몸무게 */}
          <div className={styles.weight}>
            <div className={styles.weight_title}>몸무게 (kg)</div>
            <div className={styles.weight_input_div}>
              <input
                className={`${styles.weight_input} ${
                  !editableWeight ? styles.none_border : ''
                } `}
                type="text"
                value={userData.weight !== null ? userData.weight : ''}
                placeholder="수치를 입력해주세요."
                readOnly={!editableWeight}
                onChange={handleWeightChange}
              />
            </div>
            {!editableWeight && (
              <div
                className={styles.physicalicon}
                onClick={handleWeightEditClick}
              >
                <Image src="/edit2.png" alt="" width={20} height={20} />
              </div>
            )}
            {editableWeight && (
              <div className={styles.physicalicon} onClick={saveUserData}>
                <Image src="/correct.png" alt="" width={20} height={20} />
              </div>
            )}
          </div>
        </div>
        {/* 아이디 */}
        <div className={styles.title_div}>
          <img src="/bar.png" alt="" />
          <div className={styles.title}>아이디</div>
        </div>
        <div className={`${styles.input} ${styles.id_Div}`}>
          {userData.userid}
        </div>
        {/* 비밀번호 변경 */}
        <div className={styles.title_div}>
          <img src="/bar.png" alt="" />
          <div className={styles.title}>비밀번호 변경</div>
          <div
            className={`${styles.nick_Icon} ${styles.margin_left}`}
            onClick={handleEditPasswordButtonClick}
          >
            <Image src="/edit2.png" alt="" width={20} height={20} />
          </div>
        </div>
        <EditPasswordModal
          isOpen={showEditPasswordModal}
          onCancel={handleEditPasswordModalCancel}
          onConfirm={handleEditPasswordModalConfirm}
        />

        {/* 회원탈퇴 버튼 */}
        <button className={styles.Btn} onClick={handleWithdrawalButtonClick}>
          회원탈퇴
        </button>
        <WithdrawalModal
          isOpen={showWithdrawalModal}
          onCancel={handleWithdrawalModalCancel}
          onConfirm={handleWithdrawalModalConfirm}
        />
      </div>
    </>
  );
}

export default MypageEditContent;
