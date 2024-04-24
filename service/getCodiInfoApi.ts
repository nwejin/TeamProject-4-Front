import axios from 'axios';

// getCodiInfoApi.ts

export const getCodiInfo = async (codiDTO) => {
  const accessToken = sessionStorage.getItem('accessToken');

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_HOST}/codi/mycodi`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    console.log('ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('예상치 못한 오류가 발생했습니다! (유저 옷 정보 불러오기)');
  }
};
