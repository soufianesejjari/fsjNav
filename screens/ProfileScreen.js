import React, { useEffect, useState } from 'react';
import MyLocalImage from '../assets/60111.jpg'

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import getUserData from '../firebaseServices/GetUserData';
import Laoding from './Laoding';
import { useTheme } from '../ThemeContext';
import { getAuth } from 'firebase/auth';
import AddOrganizationModal from './AddOrganizationModal';

const SECTIONS = [
  {
    header: 'Préférences',
    icon: 'settings',
    items: [
      { label: 'Mode Sombre', value: false, type: 'boolean' },
    ],
  },
  
];

export default function ProfileScreen({ navigation }) {
  const [isAddingOrganization, setIsAddingOrganization] = useState(false);

  const auth=getAuth();


  const renderAddEventButton = () => {
    if (userData && userData.type === "organisateur") {
      return (
        <View>

        <TouchableOpacity
          onPress={() => {
            // Handle navigation to the add event component
            // For example:
            navigation.navigate('EventForm');
          }}>
          <View style={styles.profileAction} className="mx-8">
            <Text style={styles.profileActionText}>Ajouter un événement</Text>
            <FeatherIcon color="#fff" name="plus" size={16} />
          </View>
        </TouchableOpacity>
         <TouchableOpacity
         onPress={() => {
           setIsAddingOrganization(true);
         }}>
         <View style={styles.profileAction} className="mx-8">
           <Text style={styles.profileActionText}>Ajouter un organisateur</Text>
           <FeatherIcon color="#fff" name="user-plus" size={16} />
         </View>
       </TouchableOpacity>

       </View>


      );
    }
    return null;
  };
   const signOut = async () => {
    try {
      await auth.signOut(); // Utilisez la méthode signOut de l'objet auth de Firebase
      // Ajoutez d'autres actions si nécessaire après la déconnexion réussie
      navigation.navigate("Login")
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error.message);
      // Gérez les erreurs ou affichez un message à l'utilisateur si nécessaire
    }
  };
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [onAddOrganization,setonAddOrganization]=useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData(data.userData);
        setEventsData(data.eventsData);
        if (eventsData) {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  const [value, setValue] = useState(0);
  const { tabs, items } = React.useMemo(() => {
    return {
      tabs: SECTIONS.map(({ header, icon }) => ({
        name: header,
        icon,
      })),
      items: SECTIONS[value].items,
    };
  }, [value]);

  return (
    <SafeAreaView style={{ backgroundColor: isDarkMode ? '#1F2937' : '#f8f8f8', flex: 1 }}>
      {loading ? (
        <Laoding />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          style={{ backgroundColor: isDarkMode ? '#1F2937' : '#f8f8f8' }}>
          <View style={styles.header}>
            <Text style={styles.title}>Paramètres</Text>
          </View>

          <View style={styles.profile}>
            <View style={styles.profileHeader}>
              <Image
                alt=""
                source={MyLocalImage
                }
                style={styles.profileAvatar}
              />
              <View>
                <Text style={styles.profileName}>{userData && userData.full_name ? userData.full_name : 'Nom non disponible'}</Text>
                <Text style={styles.profileHandle}>
                  {userData && userData.email ? userData.full_name : 'Nom non disponible'}
                </Text>
              </View>
      
            </View>
  


            <TouchableOpacity  onPress={signOut}>
              <View style={styles.profileAction} >
                <FeatherIcon color="#fff" name="log-out" size={16} />
                <Text style={styles.profileActionText}>Déconnexion</Text>
              </View>
            </TouchableOpacity>









          </View>
            {/* Ajouter un bouton de déconnexion */}

     
          <View style={styles.content}>
            <View style={styles.tabs}>
              {tabs.map(({ name, icon }, index) => {
                const isActive = index === value;
                return (
                  <View
                    key={name}
                    style={[
                      styles.tabWrapper,
                      isActive && { borderBottomColor: '#6366f1' },
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        setValue(index);
                      }}>
                      <View style={styles.tab}>
                        <FeatherIcon color={isActive ? '#FF8911' : '#FF8911'} name={icon} size={16} />
                        <Text
                          style={[
                            styles.tabText,
                            isActive && { color: '#FF8911' },
                          ]}>
                          {name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            {items.map(({ label, type, value }, index) => {
              return (
                <View
                  key={label}
                  style={[
                    styles.rowWrapper,
                    index === 0 && { borderTopWidth: 0 },
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}>
                    <View style={styles.row}>
                      <Text style={styles.rowLabel}>{label}</Text>
                      <View style={styles.rowSpacer} />
                      {type === 'input' && <Text style={styles.rowValue}>{value}</Text>}
                      <Switch
                    trackColor={{ true: '#007bff' }}
                    value={isDarkMode}  // Utilisez isDarkMode au lieu de value
                    onValueChange={toggleDarkMode}  // Utilisez la fonction de basculement directement
                  />   
                  
                  
                                     {(type === 'input' || type === 'link') && (
                        <FeatherIcon color="#7f7f7f" name="chevron-right" size={20} />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
 
            {renderAddEventButton()} 
 <AddOrganizationModal
        visible={isAddingOrganization}
        onClose={() => setIsAddingOrganization(false)}
        onAddOrganization={setonAddOrganization
        }
      />
          <View style={styles.photos}>
            <Swiper
              renderPagination={(index, total) => (
                <View style={styles.photosPagination}>
                  <Text style={styles.photosPaginationText}>
                    {index + 1} / {total}
                  </Text>
                </View>
              )}>
              {eventsData.map(({ eventName, eventImage }, index) => (
                <View className="position-relative" key={eventImage} style={{ flex: 1  
                }}>
                  <Image alt="" source={{ uri: eventImage }} style={styles.photosImg} />
                  <View className="absolute inset-x-0 bottom-0  items-center mb-2 decoration-sky-500/30  " style={{
                    
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  }}>
                    <TouchableOpacity
                          style={styles.eventCard}

                      onPress={() => {
                        navigation.navigate('EventMain', { eventData: eventsData[index] });
                      }}>
  <Text style={styles.eventNameText}>{eventName ? eventName : 'non disponible'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Swiper>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    marginTop:10,
    fontSize: 32,
    fontWeight: '700',
    color: '#FF8911',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  content: {
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  tabs: {
    padding: 16,
    flexDirection: 'row',
  },
  profile: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 12,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3d3d3d',
  },
  profileHandle: {
    marginTop: 4,
    fontSize: 15,
    color: '#989898',
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7F27FF',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  tabWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: '#e5e7eb',
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    paddingLeft: 24,
    paddingRight: 24,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#2c2c2c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#7f7f7f',
    marginRight: 4,
  },
  photos: {
    paddingTop: 6,
    paddingHorizontal: 20,
    marginTop: 12,
    position: 'relative',
    height: 240,
    overflow: 'hidden',
    borderRadius: 12,
  },
  photosPagination: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#242329',
    borderRadius: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  photosPaginationText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#ffffff',
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: '100%',
    height: 240,
    borderRadius: 12,
  },
  eventNameText: {
    color: '#FF8911',   // Couleur du texte
    fontWeight: 'bold',   // Texte en gras
  },
  eventCard: {
    marginTop:160,
    backgroundColor: 'rgba(159, 112, 253, 0.65)',  // Utilisez les valeurs RVB de votre palette
    padding: 12,  // Espacement intérieur de la carte
    borderRadius: 8,  // Bordure arrondie
    justifyContent:'flex-end',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});
