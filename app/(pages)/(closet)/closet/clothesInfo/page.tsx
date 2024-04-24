'use client';

import styles from '../../../../../styles/closet/addclothes.module.scss';
import SelectBoxCrawling from '../../../../../components/closet/all_clothes/selectBoxCrawling';
import ClothesInfoBoxCrawling from '../../../../../components/closet/all_clothes/clothesInfoBoxCrawling';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCrawlingClothes,
  searchClothesGet,
  getCrawlingClothesByCat,
} from '../../../../../service/closetApiService';
import React, { Suspense } from 'react';

import {
  selectMajorCraw,
  selectMiddleCraw,
} from '../../../../../Store/closetSlice/selectDataCrawlingSlice';
import Loading from '../../../../../components/Loading';

export default function AllClothes() {
  const [searchData, setSearchData] = useState('');

  // 크롤링 데이터 가져오기 초기 20개
  const [crawClothes, setCrawClothes] = useState([]);
  // 크롤링 데이터 가져오기 전체
  const [allCrawClothes, setAllCrawClothes] = useState([]);

  // console.log(crawClothes);
  const selectMajorDataCraw = useSelector(
    (state: any) => state.searchCrawling.selectMajorCraw
  );
  const selectMiddleDataCraw = useSelector(
    (state: any) => state.searchCrawling.selectMiddleCraw
  );

  // console.log('검색분류 중 >>', selectMajorDataCraw);
  // console.log('검색분류 소 >>', selectMiddleDataCraw);

  const dispatch = useDispatch();

  useEffect(() => {
    // localStorage.removeItem('persist:searchCrawling');
    dispatch(selectMajorCraw({ value: '' }));
    dispatch(selectMiddleCraw({ value: '' }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (selectMajorDataCraw !== '') {
          if (selectMiddleDataCraw !== '') {
            const filteredMiddleClothes = allCrawClothes.filter((clothes) => {
              return clothes.middleCategory === selectMiddleDataCraw;
            });
            data = filteredMiddleClothes;
            setCrawClothes(data.slice(0, 20));
          } else {
            const filteredMajorClothes = allCrawClothes.filter((clothes) => {
              return clothes.majorCategory === selectMajorDataCraw;
            });
            data = filteredMajorClothes;
            // console.log(filteredMajorClothes);
            setCrawClothes(data.slice(0, 20));
          }
        } else {
          data = await getCrawlingClothes();
          setCrawClothes(data.slice(0, 20));
          setAllCrawClothes(data);
        }
        // console.log(data);
      } catch (error) {
        console.log(error, '크롤링 데이터 가져오기 오류');
      }
    };
    fetchData();
  }, [selectMajorDataCraw, selectMiddleDataCraw]);

  const searchClothes = async (e: any) => {
    e.preventDefault();
    // console.log(searchData);

    if (searchData === '') {
      const crawlingClothes = await getCrawlingClothes();
      // console.log(crawlingClothes);
      setCrawClothes(crawlingClothes.slice(0, 20));
    } else {
      const searchResult = await searchClothesGet(searchData);
      setCrawClothes(searchResult);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchInputBox}>
          <form onSubmit={searchClothes}>
            <label htmlFor="search">
              <span className="material-symbols-outlined">search</span>
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="검색어를 입력해주세요"
              onChange={(e) => {
                setSearchData(e.target.value);
              }}
            />
          </form>
        </div>
        <div className={styles.selectBox}>
          <SelectBoxCrawling />
        </div>

        <div className={styles.mainInfoBoxDefault}>
          {crawClothes.map((clothes, index) => (
            <Suspense fallback={<Loading />} key={index}>
              <ClothesInfoBoxCrawling data={clothes} key={clothes.id} />
            </Suspense>
          ))}
        </div>
      </div>
    </>
  );
}
