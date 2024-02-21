import { AppRegistry, StyleSheet,Text , View } from 'react-native';
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { getFirestore } from "firebase/firestore";
import { addDoc,getDocs, collection } from "firebase/firestore"; 
import { name as appName } from './app.json';
import { useEffect, useState,useCallback } from 'react';

import { getAuth,  onAuthStateChanged   ,User, initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import MyTabs from './screens/composants/navbar2';

import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './ThemeContext';
import LoginComposont from './screens/composants/authentification/Login';
import SignUp from './screens/composants/authentification/SingUp';
import Places from './screens/composants/emplacements/PlacesV2';
import EventForm from './screens/composants/profile/EventForm';
import Home from './screens/composants/Home/Home';
import EventList from './screens/composants/events/EventList';
import ProfileScreen from './screens/composants/profile/ProfileScreen';
import Map from './screens/composants/emplacements/Map';
import EventMain from './screens/composants/events/EventMain';

SplashScreen.preventAutoHideAsync();

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

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
  AppRegistry.registerComponent(appName, () => App);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);;





const Stack = createStackNavigator();






export default  function App() {

    const [user,setUser]= useState()

    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        async function prepare() {
          try {
            // ...
      
            onAuthStateChanged(auth, (user) => {
              console.log("mon user :", auth.currentUser);
              setUser(auth.currentUser);
              setAppIsReady(true);

            });
            console.log("rrrrrrrrrrrrrrrrrrrrrrrrrr")


            // ...
          } catch (e) {
            console.warn(e);
          }
        }
      
        prepare();
      }, []);
      
      const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
        //    await new Promise(resolve => setTimeout(resolve, 700));

          // This tells the splash screen to hide immediately! If we call this after
          // `setAppIsReady`, then we may see a blank screen while the app is
          // loading its initial state and rendering its first pixels. So instead,
          // we hide the splash screen once we know the root view has already
          // performed layout.
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);
    
      if (!appIsReady) {
        return null;
      }
  
 

  /* async function getSata(){
    const querySnapshot = await getDocs(collection(db, "places"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }
  async function setSata(){
    try {
      const docRef =  await addDoc(collection(db, "places"), data.batiment);
    
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }
  
  getSata()
 */




  return (
    <ThemeProvider>

<NavigationContainer    onReady={() => {
    
      onLayoutRootView();
    }}  >
      

      <Stack.Navigator  initialRouteName='Login' screenOptions={{headerShown : false}}>
      {user ? (<Stack.Screen name="Login" component={MyTabs}          options={{
            headerLeft: null, // Désactive le bouton de retour
          }} />):(<Stack.Screen name="Login" component={LoginComposont}          options={{
            headerLeft: null, // Désactive le bouton de retour
          }} />)}
      
             <Stack.Screen name="SingUp" component={SignUp}     options={{
            headerLeft: null, // Désactive le bouton de retour
          }} />
                 <Stack.Screen name="Places" component={Places}     options={{
            headerLeft: null, // Désactive le bouton de retour
          }} />
                    <Stack.Screen name="EventForm" component={EventForm}     options={{
            headerLeft: null, // Désactive le bouton de retour
          }} />

        <Stack.Screen name="Home" component={Home}    options={{
            headerLeft: null, // Désactive le bouton de retour
          }} />
   {/*                <Stack.Screen name="Test2ev" component={Test2ev}    options={{
            headerLeft: null, // Désactive le bouton de retour
          }} /> */}
                            <Stack.Screen name="EventList" component={EventList}    options={{
            headerLeft: null, // Désactive le bouton de retour
          }} />

<Stack.Screen name="Profile" component={ProfileScreen}    options={{
            headerLeft: null, // Désactive le bouton de retour
          }} />
          
          <Stack.Screen name="Map" component={Map}    options={{
            headerLeft: null, // Désactive le bouton de retour
          }} />
          <Stack.Screen name="NAvT" component={MyTabs}    options={{
            headerLeft: null, // Désactive le bouton de retour
          }} />

    <Stack.Screen name="EventMain" component={EventMain}    options={{
            headerLeft: null, // Désactive le bouton de retour
          }} />
        

      </Stack.Navigator>
    </NavigationContainer>   
    </ThemeProvider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
