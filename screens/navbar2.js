import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './Home';
import Places from './composants/PlacesV2';
import EventList from './EventList';
import ProfileScreen from './ProfileScreen';
import { useTheme } from '../ThemeContext'; // Importez votre hook de thème
import EventForm from './composants/EventForm';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const { isDarkMode } = useTheme(); // Obtenez l'état du thème

  const tabBarOptions = {
    tabBarInactiveBackgroundColor : isDarkMode ? '#1F2937' : '#8ecae6', // Couleur de fond de la barre de navigation

    tabBarActiveBackgroundColor : isDarkMode ? '#1F2937' : '#8ecae6', // Couleur de fond de la barre de navigation
    activeTintColor: isDarkMode ? '#fb8500' : '#fb8500', // Couleur de l'icône active
    inactiveTintColor: isDarkMode ? '#8ecae6' : '#023047', // Couleur de l'icône inactive
    labelStyle: {
      fontSize: 12, // Taille du texte
      fontWeight: 'bold', // Poids de la police du texte
    },
   // tabBarStyle: {  backgroundColor: isDarkMode ? '#1F2937' : '#8ecae6', // Couleur de fond de la barre de navigation
  //},

 
  };

  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown:false ,
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Places"
        component={Places}
        options={{
          headerShown:false ,

          tabBarLabel: 'Places',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="EventList"
        component={EventList}
        options={{
          headerShown:false ,

          tabBarLabel: 'Événements',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
       
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown:false ,

          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
