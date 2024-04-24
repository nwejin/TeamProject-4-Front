'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/MyPage/mypageEditHeader.module.scss';
import axios from 'axios';
import { Token } from '../../service/common';
import Image from 'next/image';

interface UserData {
  nickname: string;
  image_path: string;
}

const MypageEditHeader: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    nickname: '',
    image_path: null,
  });
  const [editable, setEditable] = useState<boolean>(false); // 수정 가능한지 여부를 나타내는 상태
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      // 유저 정보 받아오기
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user`
      );
      const { nickname, image_path } = response.data.data; // 서버에서 받은 닉네임

      setUserData({ nickname, image_path });
    } catch (error) {
      console.error('유저 데이터를 가져오는 도중 오류 발생', error);
    }
  };

  useEffect(() => {
    Token();
    fetchUserData();
  }, []);

  // 이미지를 선택했을 때 호출되는 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(false);
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // 선택된 이미지를 업로드하는 함수
  const uploadImage = async () => {
    try {
      setUploading(false);
      const formData = new FormData();
      formData.append('imageFile', selectedImage!);

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      // 이미지 업로드 후 유저 데이터 갱신
      fetchUserData();
      setUploading(true); // 업로딩 완료 후 상태 변경
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생', error);
    }
  };

  // 서버에 닉네임 저장 요청 함수
  const saveNickname = async () => {
    try {
      // 닉네임이 빈 값인지 확인
      if (userData.nickname.trim() === '') {
        console.error('닉네임은 빈 값일 수 없습니다.');
        return; // 빈 값이면 함수 종료
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_DB_HOST}/user/nickname`,
        userData
      );
      setEditable(false); // 저장 후 수정 불가능하게 상태 변경
    } catch (error) {
      console.error('오류 발생', error);
    }
  };

  // 닉네임 입력 변경 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, nickname: e.target.value });
  };

  // 수정 버튼 클릭 핸들러
  const handleEditClick = () => {
    setEditable(true); // 수정 가능하도록 상태 변경
  };
  // 이미지 변경을 위해 파일 입력 실행
  const handleImageDivClick = () => {
    document.getElementById('file').click();
  };

  return (
    <>
      <div className={styles.mypageEdit_Header}>
        <div className={styles.uploadButtonContainer}>
          {!uploading && selectedImage && (
            <button className={styles.uploadButton} onClick={uploadImage}>
              완료
            </button>
          )}
        </div>
        <div className={styles.edit_image}>
          <div
            className={`${styles.mypage_Profile_image} ${styles.margin}`}
            onClick={handleImageDivClick}
          >
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : userData.image_path
              }
              alt=""
            />
          </div>
          <div className={styles.camera} onClick={handleImageDivClick}>
            <Image src="/cameraicon.png" alt="" width={20} height={20} />
          </div>
        </div>
        <input
          className={styles.input}
          type="file"
          id="file"
          onChange={handleImageChange}
          accept="image/*"
        />

        <div className={styles.nick_Div}>
          {/* 수정 가능한 상태에 따라 input의 readonly 속성 적용 */}
          <input
            className={`${styles.mypage_Profile_nickname} ${
              !editable ? styles.centerText : styles.centerText2
            }`}
            type="text"
            value={userData.nickname}
            onChange={handleNicknameChange}
            readOnly={!editable}
          />
          {/* 수정 가능한 상태에 따라 아이콘 클릭 가능 여부 결정 */}
          {!editable && (
            <div className={styles.nick_Icon} onClick={handleEditClick}>
              <Image src="/edit2.png" alt="" width={20} height={20} />
            </div>
          )}
          {/* 수정 가능한 상태에 따라 저장 버튼 렌더링 */}
          {editable && (
            <div className={styles.nick_Icon} onClick={saveNickname}>
              <Image src="/correct.png" alt="" width={20} height={20} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MypageEditHeader;
