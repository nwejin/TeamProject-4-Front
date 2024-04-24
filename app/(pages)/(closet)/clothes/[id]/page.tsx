'use client';

import { useState, useEffect } from 'react';
import styles from '../../../../../styles/closet/closet.module.scss';
import clothStyles from '../../../../../styles/closet/clothes.module.scss';
import Image from 'next/image';
import {
  deleteCloth,
  getMyClosetById,
  modifyCloth,
  likedCloth,
} from '../../../../../service/closetApiService';
import { useRouter } from 'next/navigation';
import { ModifyModal } from '../../../../../components/modifyModal';
import { DeleteModal } from '../../../../../components/deleteModal';

interface clothes {
  imagePath: string;
  productName: string;
  brand: string;
  majorCategory: string;
  middleCategory: string;
  size: string;
  season: string;
  thickness: string;
  style: string;
  price: string;
  liked: boolean;
}

export default function Clothes({ params: { id } }) {
  const [clothes, setClothes] = useState<clothes>({
    imagePath: '',
    productName: '',
    brand: '',
    majorCategory: '',
    middleCategory: '',
    size: '',
    season: '',
    thickness: '',
    style: '',
    price: '',
    liked: true,
  });

  const [isSize, setIsSize] = useState('');
  const [isName, setIsName] = useState('');
  const [isPrice, setIsPrice] = useState('');
  const [isStyle, setIsStyle] = useState('');
  const [isclothId, setIsClothId] = useState('');
  const [isLike, setIsLike] = useState<boolean>();
  const categoryArr = require('../../../../../data/categoryData');

  const priceChange = isPrice.toLocaleString();
  // id 기반 옷 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const crawlingClothes = await getMyClosetById(id);
        // console.log(crawlingClothes);
        setClothes(crawlingClothes);
        setIsSize(crawlingClothes.size);
        setIsName(crawlingClothes.productName);
        setIsPrice(crawlingClothes.price);
        setIsClothId(crawlingClothes.id);
        setIsLike(crawlingClothes.liked);
        switch (crawlingClothes.style) {
          case 'Casual':
            setIsStyle('캐주얼');
            break;
          case 'Sporty':
            setIsStyle('스포티');
            break;
          case 'Retro':
            setIsStyle('레트로');
            break;
          case 'Gorp_Core':
            setIsStyle('고프 코어');
            break;
          case 'Formal':
            setIsStyle('포멀');
            break;
        }
      } catch (error) {
        console.log('내 옷장 상세 정보가져오기 실패: ', error);
      }
    };
    fetchData();
  }, []);

  const {
    imagePath,
    productName,
    brand,
    majorCategory,
    middleCategory,
    size,
    season,
    thickness,
    style,
    price,
    liked,
  } = clothes;

  const router = useRouter();

  const [isSizeDisabled, setIsSizeDisabled] = useState(false);

  // console.log(isSize);

  const selectSize = (e) => {
    const selectedSize = e.target.value;
    setIsSize(selectedSize);
    setIsSizeDisabled(!isSizeDisabled);
  };

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);

  // 모달에서 취소 버튼 클릭 시
  const handleWithdrawalModalCancel = () => {
    setShowDelModal(false);
  };

  // 모달에서 확인 버튼 클릭 시
  const handleWithdrawalModalConfirm = () => {
    setShowDelModal(false);
    router.back();
  };
  // 수정
  const modifyClothes = async () => {
    const modifyData = {
      id: isclothId,
      productName: isName,
      size: isSize,
      price: isPrice,
    };
    const response = await modifyCloth(modifyData);
    // console.log(modifyData);
    // console.log(response);
    setShowSaveModal(true);
  };

  const deleteClothes = async () => {
    try {
      const result = await deleteCloth(id);
      setShowDelModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const likeBtn = async () => {
    const likedData = { id: id, liked: liked };
    // console.log(likedData);
    const likeRes = await likedCloth(likedData);
    setIsLike(!isLike);
  };

  useEffect(() => {
    // console.log(isLike);
    // console.log('좋아요 여부', liked);
  }, [isLike]);

  return (
    <>
      <div className={styles.container}>
        <form className={clothStyles.pNameContainer}>
          <input
            type="text"
            name="productName"
            id=""
            className={clothStyles.desc}
            value={isName}
            onChange={(e) => {
              setIsName(e.target.value);
            }}
          />
          <span className={clothStyles.editcheck}>*</span>
        </form>
        <div className={clothStyles.imgContainer}>
          <img src={imagePath} alt="" />
          <button className={clothStyles.likedBtn} onClick={likeBtn}>
            <span
              className="material-symbols-outlined"
              style={isLike ? { color: '#ff5656' } : { color: '#d3d3d3' }}
            >
              favorite
            </span>
          </button>
        </div>
        <div className={clothStyles.infoContainer}>
          <div>
            <span className={clothStyles.title}>브랜드</span>
            <span>{brand}</span>
          </div>
          <div>
            <span className={clothStyles.title}>카테고리</span>
            <span className={clothStyles.desc}>
              {majorCategory === 'Top'
                ? '상의'
                : majorCategory === 'Pants'
                ? '하의'
                : majorCategory === 'Outer'
                ? '아우터'
                : majorCategory === 'Shoes'
                ? '신발'
                : majorCategory === 'Skirt'
                ? '치마'
                : majorCategory === 'Onepiece'
                ? '원피스'
                : majorCategory === 'Accessory'
                ? '악세사리'
                : majorCategory}
              <span> / </span>
              <span>
                {middleCategory &&
                  categoryArr[majorCategory].find((obj) =>
                    obj.hasOwnProperty(middleCategory)
                  )[middleCategory]}
              </span>
            </span>
          </div>
          <div>
            <span className={clothStyles.title}>
              사이즈 <span className={clothStyles.editcheck}>*</span>
            </span>

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
            <span className={clothStyles.desc}>{season}</span>
          </div>
          <div>
            <span className={clothStyles.title}>두께</span>
            <span className={clothStyles.desc}>{thickness}</span>
          </div>
          <div>
            <span className={clothStyles.title}>스타일</span>
            <span className={clothStyles.desc}>{isStyle}</span>
          </div>
          <div>
            <span className={clothStyles.title}>
              구매가격 <span className={clothStyles.editcheck}>*</span>
            </span>
            <input
              type="text"
              name="price"
              id=""
              className={clothStyles.descPrice}
              value={isPrice}
              onChange={(e) => {
                setIsPrice(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={clothStyles.btnContainer}>
          <button onClick={modifyClothes} className={clothStyles.modifyBtn}>
            수정하기
          </button>
          <button onClick={deleteClothes} className={clothStyles.deleteBtn}>
            삭제하기
          </button>
        </div>
      </div>
      <DeleteModal
        isOpen={showDelModal}
        onCancel={handleWithdrawalModalCancel}
        onConfirm={handleWithdrawalModalConfirm}
      />
      <ModifyModal isOpen={showSaveModal} />
    </>
  );
}
