import React, { useState, useEffect } from 'react';
import styles from '../../styles/calendar/weather.module.scss'; // 적절한 스타일 파일 import

const WeatherFromLocalStorage: React.FC = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState<{
    temperature: number | null;
    weather: string;
    icon: string;
  }>({
    temperature: null,
    weather: '',
    icon: '',
  });
  const [tomorrowWeatherData, setTomorrowWeatherData] = useState<{
    temperature: number | null;
    weather: string;
    icon: string;
  }>({
    temperature: null,
    weather: '',
    icon: '',
  });

  useEffect(() => {
    const fetchDataFromLocalStorage = (key: string) => {
      const dataString = localStorage.getItem(key);
      return dataString ? JSON.parse(dataString) : null;
    };

    const currentWeatherDataFromStorage =
      fetchDataFromLocalStorage('weatherData');
    if (currentWeatherDataFromStorage) {
      const temperature =
        Math.round((currentWeatherDataFromStorage.main.temp - 273) * 10) / 10;
      const weather = currentWeatherDataFromStorage.weather[0].main;
      const icon = currentWeatherDataFromStorage.weather[0].icon;
      setCurrentWeatherData({ temperature, weather, icon });
    }

    const tomorrowWeatherDataFromStorage = fetchDataFromLocalStorage(
      'tomorrowWeatherData'
    );
    if (tomorrowWeatherDataFromStorage) {
      const temperature =
        Math.round((tomorrowWeatherDataFromStorage.main.temp - 273) * 10) / 10;
      const weather = tomorrowWeatherDataFromStorage.weather[0].main;
      const icon = tomorrowWeatherDataFromStorage.weather[0].icon;
      setTomorrowWeatherData({ temperature, weather, icon });
    }
  }, []);

  return (
    <div className={styles.weatherContainer}>
      {currentWeatherData.temperature !== null &&
      currentWeatherData.weather &&
      tomorrowWeatherData.temperature !== null &&
      tomorrowWeatherData.weather ? (
        <div className={styles.weatherInfo}>
          <div className={styles.weatherItem}>
            <img
              src={`http://openweathermap.org/img/w/${currentWeatherData.icon}.png`}
              alt="Current Weather Icon"
              className={styles.weatherIcon}
            />
            <p>현재 온도 {currentWeatherData.temperature}°C</p>
          </div>

          <div className={styles.hi}></div>
          <div className={styles.weatherItem}>
            <img
              src={`http://openweathermap.org/img/w/${tomorrowWeatherData.icon}.png`}
              alt="Tomorrow Weather Icon"
              className={styles.weatherIcon}
            />
            <p>내일 온도 {tomorrowWeatherData.temperature}°C</p>
          </div>
        </div>
      ) : (
        <p>날씨 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default WeatherFromLocalStorage;
