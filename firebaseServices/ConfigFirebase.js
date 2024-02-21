import { initializeApp } from 'firebase/app';
import { initializeAuth,getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBx38C7Kot46Z8Ffph1znRAOwlJdVC0hcI",
    authDomain: "fsplaces-8d7da.firebaseapp.com",
    projectId: "fsplaces-8d7da",
    databaseURL: "https://fsplaces-8d7da-default-rtdb.firebaseio.com/",
  
    storageBucket: "fsplaces-8d7da.appspot.com",
    messagingSenderId: "232980672161",
    appId: "1:232980672161:web:668f04d4734c59b3618ae0",
    measurementId: "G-WLVQ987STC"
  };
  
 export  const app = initializeApp(firebaseConfig);
  
  
  //AppRegistry.registerComponent(appName, () => App);
  
  // Initialize Cloud Firestore and get a reference to the service


  
  export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  export const db = getFirestore(app);

  
  
  