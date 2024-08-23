import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
// import storage from "redux-persist/lib/storage";
import  authReducer  from './features/user/authSlice';
import clientReducer from './features/clientFeatures/clientSlice'
import employeeReducer from './features/employee/employeeSlice';
import storage from './customStorage';
import logger from 'redux-logger';
import departmentReducer from './features/department/departmentSlice';
import designationReducer from './features/designation/designationSlice';
import jobTypeReducer from './features/jobType/jobTypeSlice';
import jobNatureReducer from './features/jobNature/jobNatureSlice';


const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  client: clientReducer,
  employee: employeeReducer,
  department: departmentReducer,
  designation: designationReducer,
  jobType: jobTypeReducer,
  jobNature: jobNatureReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
