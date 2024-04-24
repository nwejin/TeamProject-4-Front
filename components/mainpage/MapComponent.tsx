import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/mainpage/mainpage.module.scss';
import { useDispatch } from 'react-redux';
import { setTemp, setWeather } from '../../Store/aiSlice/aiSlice';
import Loading from '../../components/Loading';

interface WeatherData {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  clouds: {
    all: number;
  };
  name: string;
}

const LocationWeather: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isTemp, setIsTemp] = useState<number>(0);
  const [isWeather, setIsWeather] = useState('');
  const [isTomorrowTemp, setIsTomorrowTemp] = useState<number>(0);
  const [isTomorrowWeather, setIsTomorrowWeather] = useState('');

  const dispatch = useDispatch();

  const saveDataToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const loadDataFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자의 위치 정보를 가져오기
        const position = await getLocation();
        setLocation(position);

        // 현재 날씨 데이터 가져오기
        const apiKey = '15c5ec95f74fa746cc03e71ed9b610f5';
        const currentApiURI = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${apiKey}`;
        const currentResponse = await axios.get<WeatherData>(currentApiURI);

        // 내일의 날씨 데이터 가져오기
        const forecastApiURI = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.latitude}&lon=${position.longitude}&appid=${apiKey}`;
        const forecastResponse = await axios.get(forecastApiURI);

        // 현재 날씨 데이터 설정
        setWeatherData(currentResponse.data);
        setIsTemp(Math.round((currentResponse.data.main.temp - 273) * 10) / 10);
        setIsWeather(currentResponse.data.weather[0].main);

        // 내일의 날씨 데이터 필터링
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDate = tomorrow.toISOString().slice(0, 10);
        const tomorrowWeather = forecastResponse.data.list.find((item: any) =>
          item.dt_txt.includes(tomorrowDate)
        );
        setIsTomorrowTemp(
          Math.round((tomorrowWeather.main.temp - 273) * 10) / 10
        );
        setIsTomorrowWeather(tomorrowWeather.weather[0].main);

        setLoading(false);

        // 받아온 데이터를 로컬 스토리지에 저장
        saveDataToLocalStorage('weatherData', currentResponse.data);

        // 내일의 날씨 데이터를 로컬 스토리지에 저장
        saveDataToLocalStorage('tomorrowWeatherData', tomorrowWeather);
      } catch (error) {
        ('');
      }
    };

    fetchData();

    // 한 시간마다 데이터 업데이트
    const interval = setInterval(() => {
      fetchData();
    }, 3600000); // 1시간마다 (1000 * 60 * 60)

    // 컴포넌트가 unmount 되었을 때 interval 정리
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const tempData = async () => {
      try {
        await dispatch(
          setTemp({
            value: isTemp,
          })
        );
        await dispatch(
          setWeather({
            value: isWeather,
          })
        );
      } catch (error) {
        ('');
      }
    };
    tempData();
  }, [isTemp, isWeather]);

  // 사용자의 위치 정보를 가져오는 함수
  const getLocation = async (): Promise<{
    latitude: number;
    longitude: number;
  }> => {
    const options: PositionOptions = {
      maximumAge: 60 * 1000,
      timeout: 10 * 1000,
    };

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        options
      );
    });
  };

  const iconUrl = `http://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`;
  const temperatureText = weatherData?.main.temp
    ? Math.round((weatherData.main.temp - 273) * 10) / 10
    : null;

  const getTemperatureDescription = (temperature: number) => {
    if (temperature <= 0) {
      return '날이 매우 추우니 옷을 따듯하게 입으세요';
    } else if (temperature <= 10) {
      return '날이 쌀쌀하니 가벼운 겉옷을 챙기세요';
    } else if (temperature <= 20) {
      return '날이 따듯한 편이니 겉옷은 안챙겨도 괜찮아요';
    } else {
      return '날이 매우 더우니 반팔을 추천해요';
    }
  };
  const getLocationName = (name: string): string => {
    // 날씨 데이터의 이름이 "yongsan"인 경우 "용산"으로 변환
    if (name.toLowerCase() === 'yongsan') {
      return '서울시 용산구';
    } else if (name.toLowerCase() === 'incheon') {
      return '인천';
    }
    // 기본적으로는 날씨 데이터의 이름 그대로 사용
    return name;
  };

  // 위치 이름 가져오기
  const locationName = getLocationName(weatherData?.name || '');

  useEffect(() => {
    let refreshTimeout: NodeJS.Timeout;

    // 로딩이 3초 이상 지속되면 페이지를 새로고침
    if (loading) {
      refreshTimeout = setTimeout(() => {
        window.location.reload();
      }, 3000);
    }

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [loading]);

  return (
    <div className={styles.weatherContainer}>
      {loading && <Loading />}
      {!loading && (
        <>
          <div className={styles.weatherbox}>
            <div className={styles.weatherIcon}>
              <img src={iconUrl} alt="Weather Icon" />
            </div>
            <p className={styles.locationText}>{locationName}</p>

            <p className={styles.temperatureTextmain}>
              {Math.round((weatherData?.main.temp - 273) * 10) / 10}
              °C
            </p>
            <p className={styles.temperatureTextcolor}>
              <span style={{ color: 'red' }}>
                ▲{Math.round((weatherData?.main.temp_max - 273) * 10) / 10}°C
              </span>{' '}
              &nbsp; {} &nbsp; {} &nbsp; {} &nbsp; {} &nbsp; {}
              <span style={{ color: 'blue' }}>
                ▼{Math.round((weatherData?.main.temp_min - 273) * 10) / 10}°C
              </span>{' '}
            </p>
          </div>
          <div className={styles.hi}></div>
          <div className={styles.temperatureText}>
            <div className={styles.today}>오늘의 날씨</div>
            <br />
            <div className={styles.temperatureTextBox}>
              {temperatureText ? (
                <>{getTemperatureDescription(temperatureText)}</>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationWeather;
