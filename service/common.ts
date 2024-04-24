import axios from 'axios';

// 토큰 관리 함수
export const Token = async () => {
  try {
    const accessToken = sessionStorage.getItem('accessToken');

    // 헤더에 액세스 토큰 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } catch (error) {
    console.error('토큰 설정 중 오류 발생', error);
    // 에러 핸들링: 적절한 처리를 추가하여 사용자 경험을 개선할 수 있습니다.
  }
};
// 토큰 새로고침 함수 (보류)
export const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const refreshResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_DB_HOST}/refresh`,
      {
        headers: {
          Refresh: `Bearer ${refreshToken}`,
        },
        withCredentials: true,
      }
    );

    // 새로운 액세스 토큰으로 업데이트
    const accessToken = refreshResponse.data.accessToken;
    sessionStorage.setItem('accessToken', accessToken);

    return accessToken; // 새로운 액세스 토큰 반환
  } catch (refreshError) {
    console.error('토큰 새로고침 중 오류 발생', refreshError);
    alert('토큰 새로고침에 실패했습니다. 다시 시도해주세요.');
    throw refreshError;
  }
};
