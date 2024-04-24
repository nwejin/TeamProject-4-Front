// 전부 다 로컬에 저장하는 코드
// 'use client';

// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import { addClothesReducer } from './closetSlice/addClothesSlice';
// import { showListReducer } from './closetSlice/showListSlice';
// import userReducer from './userSlice/userSlice';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = combineReducers({
//   status: showListReducer,
//   clothes: addClothesReducer,
//   user: userReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);

// export default store;

// userid만 로컬에 저장하는 코드
'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { calendarReducer } from './calendarSlice/calendarSlice';
import userReducer from './userSlice/userSlice';
import { addClothesReducer } from './closetSlice/addClothesSlice';
import { showListReducer } from './closetSlice/showListSlice';
import { selectDataReducer } from './closetSlice/selectDataSlice';
import { aiRecommedRuducer } from './aiSlice/aiSlice';
import mainPageReducer from './mainSlice/mainPageSlice';
import { selectCrawlingDataReducer } from './closetSlice/selectDataCrawlingSlice';
import { userDataReducer } from './userSlice/userNickNameSlice';

const userPersistConfig = {
  key: 'user',
  storage,
};

const weatherPersistConfig = {
  key: 'aiRecommend',
  storage,
};

const searchDataPersistConfig = {
  key: 'search',
  storage,
};

const searchCrawDataPersistConfig = {
  key: 'searchCrawling',
  storage,
};

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  status: showListReducer,
  clothes: addClothesReducer,
  search: persistReducer(searchDataPersistConfig, selectDataReducer),
  searchCrawling: persistReducer(
    searchCrawDataPersistConfig,
    selectCrawlingDataReducer
  ),
  calendar: calendarReducer,
  aiRecommend: persistReducer(weatherPersistConfig, aiRecommedRuducer),
  mainPage: mainPageReducer,
  userData: userDataReducer,
});
// test
const store = configureStore({
  reducer: rootReducer, // 다음이 middleware 추가 코드이다.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export default store;
