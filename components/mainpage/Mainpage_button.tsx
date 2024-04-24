import Link from 'next/link';
import styles from '../../styles/mainpage/mainpage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMajor,
  selectMiddle,
} from '../../Store/closetSlice/selectDataSlice';

export default function Mainpagebutton() {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: any) => ({
    temp: state.aiRecommend.weather.temp,
    weather: state.aiRecommend.weather.weather,
  }));

  // 온도에 따라 추천할 카테고리를 결정하는 함수
  const recommendCategory = (temp: number) => {
    if (temp >= 20) return 'Short_T_shirt';
    else if (temp >= 15) return 'Shirt';
    else if (temp >= 10) return 'Long_T_shirt';
    else if (temp >= 5) return 'Hoodies';
    else if (temp >= 0) return 'Sweat_shirt';
    else return 'Sweater';
  };

  const topCategory = recommendCategory(weatherData.temp);
  const bottomCategory = recommendBottomCategory(weatherData.temp);
  const outerCategory = recommendOuterCategory(weatherData.temp);

  function recommendBottomCategory(temp: number) {
    if (temp >= 20) return 'Short_pants';
    else if (temp >= 15) return 'Sport_pants';
    else if (temp >= 10) return 'Slacks';
    else return 'Denim';
  }

  function recommendOuterCategory(temp: number) {
    if (temp >= 18) return '';
    else if (temp >= 15) return 'Sport_Jacket';
    else if (temp >= 10) return 'Blazer';
    else if (temp >= 5) return 'Jacket';
    else if (temp >= 3) return 'Mustang';
    else if (temp >= 0) return 'Coat';
    else return 'Padded_jacket';
  }

  const setMajorCategoryAll = () => {
    dispatch(selectMajor({ value: '' }));
    dispatch(selectMiddle({ value: '' }));
  };

  const handleTopCategoryClick = (category: string) => {
    dispatch(selectMajor({ value: 'Top' }));
    dispatch(selectMiddle({ value: category }));
  };

  const handleBottomCategoryClick = (category: string) => {
    dispatch(selectMajor({ value: 'Pants' }));
    dispatch(selectMiddle({ value: category }));
  };

  const handleOuterCategoryClick = (category: string) => {
    dispatch(selectMajor({ value: 'Outer' }));
    dispatch(selectMiddle({ value: category }));
  };

  // 로컬 스토리지에서 사용자 정보 가져오기
  const getUserInfoFromLocalStorage = () => {
    const userInfo = localStorage.getItem('persist:user');
    if (userInfo) {
      const { userId } = JSON.parse(userInfo);
      return userId;
    }
    return '';
  };

  return (
    <>
      <div className={styles.borderline}>
        <div className={styles.mainpage__TopButton}>
          {/* 상의 */}
          {topCategory === 'Shirt' && (
            <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
              <button
                className={styles.Shirt}
                onClick={() => handleTopCategoryClick('Shirt')}
              ></button>
            </Link>
          )}
          {topCategory === 'Short_T_shirt' && (
            <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
              <button
                className={styles.Short_T_shirt}
                onClick={() => handleTopCategoryClick('Short_T_shirt')}
              ></button>
            </Link>
          )}
          {topCategory === 'Long_T_shirt' && (
            <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
              <button
                className={styles.Long_T_shirt}
                onClick={() => handleTopCategoryClick('Long_T_shirt')}
              ></button>
            </Link>
          )}
          {topCategory === 'Hoodies' && (
            <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
              <button
                className={styles.Hoodies}
                onClick={() => handleTopCategoryClick('Hoodies')}
              ></button>
            </Link>
          )}
          {topCategory === 'Sweat_shirt' && (
            <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
              <button
                className={styles.Sweat_shirt}
                onClick={() => handleTopCategoryClick('Sweat_shirt')}
              ></button>
            </Link>
          )}
          {topCategory === 'Sweater' && (
            <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
              <button
                className={styles.Sweater}
                onClick={() => handleTopCategoryClick('Sweater')}
              ></button>
            </Link>
          )}
          {/* 나머지 상의 카테고리 추가 */}

          <div className={styles.mainpage__BottomButton}>
            {/* 바지 */}
            {bottomCategory === 'Denim' && (
              <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
                <button
                  className={styles.Denim}
                  onClick={() => handleBottomCategoryClick('Denim')}
                ></button>
              </Link>
            )}
            {bottomCategory === 'Slacks' && (
              <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
                <button
                  className={styles.Slacks}
                  onClick={() => handleBottomCategoryClick('Slacks')}
                ></button>
              </Link>
            )}
            {bottomCategory === 'Sport_pants' && (
              <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
                <button
                  className={styles.Sport_pants}
                  onClick={() => handleBottomCategoryClick('Sport_pants')}
                ></button>
              </Link>
            )}
            {bottomCategory === 'Short_pants' && (
              <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
                <button
                  className={styles.Short_pants}
                  onClick={() => handleBottomCategoryClick('Short_pants')}
                ></button>
              </Link>
            )}
            {/* 나머지 바지 카테고리 추가 */}
          </div>

          <div className={styles.mainpage__OuterButton}>
            {/* 아우터 */}
            {outerCategory === 'Jacket' && (
              <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
                <button
                  className={styles.Jacket}
                  onClick={() => handleOuterCategoryClick('Jacket')}
                ></button>
              </Link>
            )}
            {outerCategory === 'Coat' && (
              <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
                <button
                  className={styles.Coat}
                  onClick={() => handleOuterCategoryClick('Coat')}
                ></button>
              </Link>
            )}
            {outerCategory === 'Padded_jacket' && (
              <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
                <button
                  className={styles.Padded_jacket}
                  onClick={() => handleOuterCategoryClick('Padded_jacket')}
                ></button>
              </Link>
            )}
            {outerCategory === 'Blazer' && (
              <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
                <button
                  className={styles.Blazer}
                  onClick={() => handleOuterCategoryClick('Blazer')}
                ></button>
              </Link>
            )}
            {outerCategory === 'Mustang' && (
              <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
                <button
                  className={styles.Mustang}
                  onClick={() => handleOuterCategoryClick('Mustang')}
                ></button>
              </Link>
            )}
            {outerCategory === 'Sport_Jacket' && (
              <Link href={`/closet/${getUserInfoFromLocalStorage()}`}>
                <button
                  className={styles.Sport_Jacket}
                  onClick={() => handleOuterCategoryClick('Sport_Jacket')}
                ></button>
              </Link>
            )}
            {/* 나머지 아우터 카테고리 추가 */}
          </div>
        </div>
        <div className={styles.mainpage__BottomButton}>
          <Link href="/AIrecommend">
            <button className={styles.Ai}></button>
          </Link>
          <Link href={{ pathname: '../calendarpage' }}>
            <button className={styles.Report}></button>
          </Link>
        </div>
      </div>
    </>
  );
}
