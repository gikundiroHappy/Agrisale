import { initializeApp } from "firebase/app";
import {getAuth, initializeAuth, getReactNativePersistence} from  'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyBIXr1icpVBegPEVc5ampRo0RNxgGpqZDQ",
  authDomain: "agri-sales-83fdf.firebaseapp.com",
  projectId: "agri-sales-83fdf",
  storageBucket: "agri-sales-83fdf.appspot.com",
  messagingSenderId: "150487564224",
  appId: "1:150487564224:web:42c4630541624e9d6f9225"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);

// let auth = getAuth(FIREBASE_APP);
// if (!auth) {
//   auth = initializeAuth(FIREBASE_APP, {
//     persistence: getReactNativePersistence(AsyncStorage)
//   });
// }
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_storage = getStorage(FIREBASE_APP);

