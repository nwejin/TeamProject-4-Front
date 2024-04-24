'use client';

import { useState, useEffect } from 'react';
import styles from '../../../../../../styles/closet/closet.module.scss';
import clothStyles from '../../../../../../styles/closet/clothes.module.scss';
import Image from 'next/image';
import {
  getCrawlingClothesById,
  postAddClothes,
} from '../../../../../../service/closetApiService';
import { useRouter } from 'next/navigation';
import { AddFormCheckModal } from '../../../../../../components/addFormCheckModal';

interface clothes {
  image_path: string;
  productName: string;
  brand: string;
  majorCategory: string;
  middleCategory: string;
  size: string;
  season: string;
  thickness: string;
  style: string;
  price: string;
}

interface TotalData {
  imagePath: string;
  productName: string;
  brand: string;
  majorCategory: string;
  middleCategory: string;
  size: string;
  season: string;
  thickness: string;
  style: string;
  price: number;
  createdAt: string;
}

export default function ClothesInfo({ params: { id } }) {
  const [clothes, setClothes] = useState<clothes>({
    image_path: '',
    productName: '',
    brand: '',
    majorCategory: '',
    middleCategory: '',
    size: '',
    season: '',
    thickness: '',
    style: '',
    price: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const crawlingClothes = await getCrawlingClothesById(id);
        setClothes(crawlingClothes);
      } catch (error) {
        console.log('크롤링 옷 상세 정보 가져오기 실패: ', error);
      }
    };
    fetchData();
  }, []);

  const {
    image_path,
    productName,
    brand,
    majorCategory,
    middleCategory,
    size,
    season,
    thickness,
    style,
    price,
  } = clothes;

  const [isSizeDisabled, setIsSizeDisabled] = useState(false);
  const [isStyleDisabled, setIsStyleDisabled] = useState(false);
  const [isSize, setIsSize] = useState('');
  const [isSeason, setIsSeason] = useState('');
  const [isThickness, setIsThickness] = useState('');
  const [isStyle, setIsStyle] = useState('');
  const [isStyleValue, setIsStyleValue] = useState('');

  // 옷 정보 수정
  const changeValue = (e) => {
    const { value, name } = e.target;
    // console.log(value);
    // console.log(name);
    setClothes((prevClothes) => ({
      ...prevClothes,
      [name]: value,
    }));
  };

  const selectSize = (e) => {
    const selectedSize = e.target.value;
    setIsSize(selectedSize);
    setIsSizeDisabled(!isSizeDisabled);
  };

  const selectStyles = (e) => {
    // console.log(e.target.id);
    setIsStyleDisabled(!isStyleDisabled);
    setIsStyle(e.target.id);
    setIsStyleValue(e.target.value);
  };

  const closetDTO: TotalData = {
    brand: brand,
    majorCategory: majorCategory,
    middleCategory: middleCategory,
    price: parseInt(price),
    size: isSize,
    thickness: isThickness,
    productName: productName,
    imagePath: image_path,
    style: isStyle,
    season: isSeason,
    createdAt: new Date().toISOString(),
  };

  const [showSaveModal, setShowSaveModal] = useState(false);

  const router = useRouter();
  const addClothes = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(closetDTO);
    try {
      await postAddClothes(closetDTO);
      // console.log('post 완료');
      // console.log(closetDTO);
      setShowSaveModal(true);
    } catch (error) {
      console.error('실패: ', error);
    }
  };

  return (
    <>
      <form className={styles.container} onSubmit={addClothes}>
        <div className={clothStyles.pNameContainer}>
          <input
            type="text"
            name="productName"
            id=""
            className={clothStyles.desc}
            value={productName}
            onChange={changeValue}
          />
        </div>
        <div className={clothStyles.imgContainer}>
          <img src={image_path} alt="" />
        </div>
        <div className={clothStyles.infoContainer}>
          <div>
            <span className={clothStyles.title}>브랜드</span>
            <span>{brand}</span>
          </div>
          <div>
            <span className={clothStyles.title}>카테고리</span>
            <span className={clothStyles.desc}>
              {majorCategory} <span>-</span>
              <span> {middleCategory}</span>
            </span>
          </div>
          <div>
            <span className={clothStyles.title}>사이즈</span>
            <section className={clothStyles.sizeBox}>
              <button
                className={clothStyles.sizeBtn}
                onClick={(e) => {
                  e.preventDefault();
                  setIsSizeDisabled(!isSizeDisabled);
                }}
              >
                <span>{isSize}</span>
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </button>
              {isSizeDisabled && (
                <section className={clothStyles.sizeSelectBox}>
                  {majorCategory !== 'Shoes' ? (
                    <ul>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="sizeS"
                          className="sizeInput"
                          value="S"
                          onClick={selectSize}
                        />
                      </li>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="sizeM"
                          className="sizeInput"
                          value="M"
                          onClick={selectSize}
                        />
                      </li>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="sizeL"
                          className="sizeInput"
                          value="L"
                          onClick={selectSize}
                        />
                      </li>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="sizeXL"
                          className="sizeInput"
                          value="XL"
                          onClick={selectSize}
                        />
                      </li>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="sizeXXL"
                          className="sizeInput"
                          value="XXL"
                          onClick={selectSize}
                        />
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="size30"
                          className="sizeInput"
                          value="230"
                          onClick={selectSize}
                        />
                      </li>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="size40"
                          className="sizeInput"
                          value="240"
                          onClick={selectSize}
                        />
                      </li>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="size50"
                          className="sizeInput"
                          value="250"
                          onClick={selectSize}
                        />
                      </li>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="size60"
                          className="sizeInput"
                          value="260"
                          onClick={selectSize}
                        />
                      </li>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="size70"
                          className="sizeInput"
                          value="270"
                          onClick={selectSize}
                        />
                      </li>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="size80"
                          className="sizeInput"
                          value="280"
                          onClick={selectSize}
                        />
                      </li>
                      <li>
                        <input
                          type="button"
                          name=""
                          id="size90"
                          className="sizeInput"
                          value="290"
                          onClick={selectSize}
                        />
                      </li>
                    </ul>
                  )}
                </section>
              )}
            </section>
          </div>
          <div>
            <span className={clothStyles.title}>계절</span>
            <div className={clothStyles.weatherBox}>
              <input
                type="button"
                name=""
                id="weatherSpring"
                value={'봄'}
                onClick={() => setIsSeason('봄')}
                className={`${isSeason === '봄' && clothStyles.weatherClicked}`}
              />
              <input
                type="button"
                name=""
                id="weatherSummer"
                value={'여름'}
                onClick={() => setIsSeason('여름')}
                className={`${
                  isSeason === '여름' && clothStyles.weatherClicked
                }`}
              />
              <input
                type="button"
                name=""
                id="weatherAuthum"
                value={'가을'}
                onClick={() => setIsSeason('가을')}
                className={`${
                  isSeason === '가을' && clothStyles.weatherClicked
                }`}
              />
              <input
                type="button"
                name=""
                id="weatherWinter"
                value={'겨울'}
                onClick={() => setIsSeason('겨울')}
                className={`${
                  isSeason === '겨울' && clothStyles.weatherClicked
                }`}
              />
            </div>
          </div>
          <div>
            <span className={clothStyles.title}>두께</span>
            <div className={clothStyles.thicknessBox}>
              <input
                type="button"
                name=""
                id="thickNess1"
                value={'얇음'}
                onClick={() => setIsThickness('얇음')}
                className={`${
                  isThickness === '얇음' && clothStyles.thickClicked
                }`}
              />
              <input
                type="button"
                name=""
                id="thickNess2"
                value={'보통'}
                onClick={() => setIsThickness('보통')}
                className={`${
                  isThickness === '보통' && clothStyles.thickClicked
                }`}
              />
              <input
                type="button"
                name=""
                id="thickNess3"
                value={'두꺼움'}
                onClick={() => setIsThickness('두꺼움')}
                className={`${
                  isThickness === '두꺼움' && clothStyles.thickClicked
                }`}
              />
            </div>
          </div>
          <div>
            <span className={clothStyles.title}>스타일</span>

            <section className={clothStyles.sizeBox}>
              <button
                className={clothStyles.sizeBtn}
                onClick={(e) => {
                  e.preventDefault();
                  setIsStyleDisabled(!isStyleDisabled);
                }}
              >
                <span>{isStyleValue}</span>
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </button>
              {isStyleDisabled && (
                <section className={clothStyles.sizeSelectBox}>
                  <ul>
                    <li>
                      <input
                        type="button"
                        name=""
                        id="Casual"
                        className="sizeInput"
                        value="캐주얼"
                        onClick={selectStyles}
                      />
                    </li>
                    <li>
                      <input
                        type="button"
                        name=""
                        id="Sporty"
                        className="sizeInput"
                        value="스포티"
                        onClick={selectStyles}
                      />
                    </li>
                    <li>
                      <input
                        type="button"
                        name=""
                        id="Retro"
                        className="sizeInput"
                        value="레트로"
                        onClick={selectStyles}
                      />
                    </li>
                    <li>
                      <input
                        type="button"
                        name=""
                        id="Gorp_Core"
                        className="sizeInput"
                        value="고프 코어"
                        onClick={selectStyles}
                      />
                    </li>
                    <li>
                      <input
                        type="button"
                        name=""
                        id="Formal"
                        className="sizeInput"
                        value="포멀"
                        onClick={selectStyles}
                      />
                    </li>
                  </ul>
                </section>
              )}
            </section>
          </div>
          <div>
            <span className={clothStyles.title}>구매가격</span>
            <input
              type="text"
              name="price"
              id=""
              className={clothStyles.priceInput}
              value={price}
              onChange={changeValue}
            />
          </div>
        </div>
        <div
          className={clothStyles.btnContainer}
          style={{ justifyContent: 'center' }}
        >
          <button>저장하기</button>
        </div>
      </form>
      <AddFormCheckModal isOpen={showSaveModal} />
    </>
  );
}
