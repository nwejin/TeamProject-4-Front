'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/codi/codi.module.scss';
import styles2 from '../../styles/codi/codi2.module.scss';
import Cookies from 'js-cookie';
import axios from 'axios';
import { cookiesend } from '../../service/codiApiservice';
import ClosetPage from '../../components/uploadcloset/uploadcloset';
import { getCodiInfo } from '../../service/getCodiInfoApi';
import MyComponent from '../codipage/image';
import { RootState } from '../../Store/Store';
import {
  selectMajor,
  selectMiddle,
} from '../../Store/closetSlice/selectDataSlice'; // 추가된 import

// 선택된 날짜를 URL에서 추출하는 함수
function extractSelectedDateFromURL() {
  if (typeof window !== 'undefined') {
    const url = window.location.href;
    const queryString = url.split('?')[1];
    if (!queryString) return null;

    const queryParams = queryString.split('&');

    for (const param of queryParams) {
      if (param.startsWith('selectedDate=')) {
        const selectedDate = param.split('=')[1];
        return decodeURIComponent(selectedDate);
      }
    }
  }

  return null;
}

const CodiPage: React.FC<{}> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState<{
    [key: string]: number | null;
  }>({
    capIndex: null,
    topIndex: null,
    outerIndex: null,
    bottomIndex: null,
    shoesIndex: null,
    accessoryIndex: null,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<{
    [key: string]: string | null;
  }>({
    capIndex: null,
    topIndex: null,
    outerIndex: null,
    bottomIndex: null,
    shoesIndex: null,
    accessoryIndex: null,
  });
  const [targetCodi, setTargetCodi] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [codiName, setCodiName] = useState<string>('');
  const [codiInfo, setCodiInfo] = useState<any>(null); // 코디 정보 상태 추가
  const [isCodiRegistered, setIsCodiRegistered] = useState<boolean>(false); // 코디 등록 여부 상태
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    const extractedDate = extractSelectedDateFromURL();
    if (extractedDate) {
      const formattedDate = new Date(
        new Date(extractedDate).getTime() + 9 * 60 * 60 * 1000
      ).toISOString();

      setSelectedDate(formattedDate);
      console.log('페이지 selectedDate:', formattedDate);
      getCodiData(formattedDate); // formattedDate를 매개변수로 전달
    }
    console.log(extractedDate);
  }, []);

  useEffect(() => {
    // 로컬 스토리지에서 선택한 부위에 해당하는 카테고리 값을 불러옴
    const savedSelectedCategory = localStorage.getItem('selectedCategory');
    if (savedSelectedCategory) {
      setSelectedCategory(savedSelectedCategory);
    }
  }, []);

  const getCodiData = async (formattedDate) => {
    try {
      const codiInfo = await getCodiInfo({});
      console.log('초기 코디 정보:', codiInfo);
      // 받아온 코디 정보를 상태에 저장
      setCodiInfo(codiInfo);

      // 지정한 날짜에 해당하는 코디 정보를 찾습니다.
      const targetCodis = codiInfo.filter((item) => {
        // item.codiDate에서 시간 부분을 제거하여 날짜 부분만 추출합니다.
        const itemDate = item.codiDate.split('T')[0];

        // formattedDate에서도 시간 부분을 제거하여 날짜 부분만 추출합니다.
        const formattedDateWithoutTime = formattedDate.split('T')[0];

        // 두 날짜를 비교합니다.
        return itemDate === formattedDateWithoutTime;
      });

      // 날짜에 해당하는 코디 정보 중에서 가장 최근에 등록된 정보를 선택합니다.
      const foundTargetCodi =
        targetCodis.length > 0 ? targetCodis[targetCodis.length - 1] : null;

      console.log(formattedDate);
      console.log(foundTargetCodi);

      // 코디 정보가 있을 경우에만 상태 업데이트
      if (foundTargetCodi) {
        console.log(
          'Top:',
          foundTargetCodi.top ? foundTargetCodi.top.imagePath : null
        );
        console.log(
          'Bottom:',
          foundTargetCodi.bottom ? foundTargetCodi.bottom.imagePath : null
        );
        console.log(
          'Outer:',
          foundTargetCodi.outer ? foundTargetCodi.outer.imagePath : null
        );
        console.log(
          'Shoes:',
          foundTargetCodi.shoes ? foundTargetCodi.shoes.imagePath : null
        );
        console.log(
          'Cap:',
          foundTargetCodi.cap ? foundTargetCodi.cap.imagePath : null
        );
        console.log(
          'Accessory:',
          foundTargetCodi.accessory ? foundTargetCodi.accessory.imagePath : null
        );

        // 상태 업데이트
        setTargetCodi(foundTargetCodi);

        // 코디가 이미 등록되어 있는지 여부를 설정
        setIsCodiRegistered(true);
        setSelectedDate(formattedDate);
      }
    } catch (error) {
      console.error('초기 코디 정보 요청 실패: ', error);
    }
  };

  const openModal = (category: string) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageSelect = (imageSrc: string, id: number) => {
    const updatedSelectedIndexes = { ...selectedIndexes };
    updatedSelectedIndexes[selectedCategory!] = id; // 선택된 옷의 ID로 업데이트
    setSelectedIndexes(updatedSelectedIndexes);
    setSelectedImages({ ...selectedImages, [selectedCategory!]: imageSrc });
    closeModal(); // 모달을 닫음
  };

  const handleRegister = async () => {
    try {
      // 기존 코디 정보에서 사용자가 선택한 옷의 ID를 가져옵니다.
      const selectedCodiIndexes = {
        capIndex: targetCodi?.cap?.id || selectedIndexes.capIndex,
        topIndex: targetCodi?.top?.id || selectedIndexes.topIndex,
        outerIndex: targetCodi?.outer?.id || selectedIndexes.outerIndex,
        bottomIndex: targetCodi?.bottom?.id || selectedIndexes.bottomIndex,
        shoesIndex: targetCodi?.shoes?.id || selectedIndexes.shoesIndex,
        accessoryIndex:
          targetCodi?.accessory?.id || selectedIndexes.accessoryIndex,
      };

      // 선택한 옷의 ID와 기타 정보를 포함하여 서버로 데이터를 보냅니다.
      const codiDTO = {
        ...selectedCodiIndexes,
        codiName,
        selectedDate,
        userId,
      };
      let UTCdate = new Date(codiDTO['selectedDate']);
      let localOffset = UTCdate.getTimezoneOffset() * 60000;
      let localDate = new Date(UTCdate.getTime() - localOffset);
      codiDTO['codiDate'] = localDate.toISOString();
      await cookiesend(codiDTO);
      window.location.reload();
      alert('등록되었습니다.');
    } catch (error) {
      console.error('데이터 전송 실패: ', error);
      alert('등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 부위를 클릭할 때 해당하는 카테고리 값을 로컬 스토리지에 저장
  const handlePartClick = (category: string) => {
    dispatch(selectMajor({ value: category }));
    dispatch(selectMiddle({ value: '' }));
  };
  return (
    <div>
      <div className={styles2.container}>
        <div className={styles2.mainContainer}>
          <img
            src="https://weatherable.s3.ap-northeast-2.amazonaws.com/default_ai.png"
            alt=""
          />
          <div
            className={`${styles2.uploadButton} ${styles2.accessoryBox}`}
            onClick={() => {
              openModal('capIndex');
              handlePartClick('Accessory');
            }}
          >
            {selectedImages['capIndex'] ? (
              <MyComponent
                imageSrc={selectedImages['capIndex']}
                onClick={() => openModal('capIndex')}
              />
            ) : (
              (targetCodi && targetCodi.cap && targetCodi.cap.imagePath && (
                <MyComponent
                  imageSrc={targetCodi.cap.imagePath}
                  onClick={() => openModal('capIndex')}
                />
              )) || (
                <span className="material-symbols-outlined">add_circle</span>
              )
            )}
          </div>
          <div
            className={`${styles2.uploadButton} ${styles2.outerBox}`}
            onClick={() => {
              openModal('outerIndex');
              handlePartClick('Outer');
            }}
          >
            {selectedImages['outerIndex'] ? (
              <MyComponent
                imageSrc={selectedImages['outerIndex']}
                onClick={() => openModal('outerIndex')}
              />
            ) : (
              (targetCodi && targetCodi.outer && targetCodi.outer.imagePath && (
                <MyComponent
                  imageSrc={targetCodi.outer.imagePath}
                  onClick={() => openModal('outerIndex')}
                />
              )) || (
                <span className="material-symbols-outlined">add_circle</span>
              )
            )}
          </div>

          <div
            className={`${styles2.uploadButton} ${styles2.topBox}`}
            onClick={() => {
              openModal('topIndex');
              handlePartClick('Top');
            }}
          >
            {selectedImages['topIndex'] ? (
              <MyComponent
                imageSrc={selectedImages['topIndex']}
                onClick={() => openModal('topIndex')}
              />
            ) : (
              (targetCodi && targetCodi.top && targetCodi.top.imagePath && (
                <MyComponent
                  imageSrc={targetCodi.top.imagePath}
                  onClick={() => openModal('topIndex')}
                />
              )) || (
                <span className="material-symbols-outlined">add_circle</span>
              )
            )}
          </div>

          <div
            className={`${styles2.uploadButton} ${styles2.pantsBox}`}
            onClick={() => {
              openModal('pantsIndex');
              handlePartClick('Pants');
            }}
          >
            {selectedImages['bottomIndex'] ? (
              <MyComponent
                imageSrc={selectedImages['bottomIndex']}
                onClick={() => openModal('bottomIndex')}
              />
            ) : (
              (targetCodi &&
                targetCodi.bottom &&
                targetCodi.bottom.imagePath && (
                  <MyComponent
                    imageSrc={targetCodi.bottom.imagePath}
                    onClick={() => openModal('bottomIndex')}
                  />
                )) || (
                <span className="material-symbols-outlined">add_circle</span>
              )
            )}
          </div>

          <div
            className={`${styles2.uploadButton} ${styles2.shoesBox}`}
            onClick={() => {
              openModal('shoesIndex');
              handlePartClick('Shoes');
            }}
          >
            {selectedImages['shoesIndex'] ? (
              <MyComponent
                imageSrc={selectedImages['shoesIndex']}
                onClick={() => openModal('shoesIndex')}
              />
            ) : (
              (targetCodi && targetCodi.shoes && targetCodi.shoes.imagePath && (
                <MyComponent
                  imageSrc={targetCodi.shoes.imagePath}
                  onClick={() => openModal('shoesIndex')}
                />
              )) || (
                <span className="material-symbols-outlined">add_circle</span>
              )
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <button className={`${styles.modalButton}`} onClick={closeModal}>
            Close Modal
          </button>
          <div className={styles.modalContent}>
            <ClosetPage onImageSelect={handleImageSelect} />
          </div>
        </div>
      )}

      {!isCodiRegistered && (
        <div className={styles.last}>
          <input
            className={styles.inp}
            type="text"
            value={codiName}
            onChange={(e) => setCodiName(e.target.value)}
            placeholder="코디 이름을 입력하세요."
          />
          <div className={styles.but}>
            <button onClick={handleRegister} className={styles.add}>
              등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodiPage;
