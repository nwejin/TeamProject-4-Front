// codiApiservice.js 파일

import axios from 'axios';

// 쿠키에 저장된 데이터를 백엔드로 전송하는 함수
export const cookiesend = async (codiDTO) => {
  const accessToken = sessionStorage.getItem('accessToken');
  // 프론트(코드 페이지)에서 코디명 입력받아야함 (DB 필수값) 변경 부탁드립니다
  console.log(codiDTO);

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_DB_HOST + '/codi',
      codiDTO,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('데이터 전송 실패: ', error);
    throw new Error('데이터 전송에 실패했습니다.');
  }
};
