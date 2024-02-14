import { getAuth } from 'firebase/auth';
import { collection, getDocs, where, query, getFirestore, getDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserData = async () => {
    const firestore=getFirestore()

  try {
    const auth = getAuth();
    const emailUser = auth.currentUser ? auth.currentUser.email : null;

    if (emailUser) {
      // Obtenir les informations de l'utilisateur
      const userQuery = query(collection(firestore, 'users'), where('email', '==', emailUser));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.size > 0) {
        const userData = userSnapshot.docs[0].data();
        console.log('Informations sur l\'utilisateur :', userData);

        // Obtenir la liste des événements aimés par l'utilisateur

// Vérifier l'ID correct

// Exécuter la requête




const storedEvents = await AsyncStorage.getItem('storedEvents');
const eventsData = storedEvents ? JSON.parse(storedEvents) : [];
console.log('Événements récupérés du stockage local:', eventsData);


        return { userData, eventsData };
      } else {
        console.error("Utilisateur non trouvé dans la collection 'users'");
        return null;
      }
    } else {
      console.error('Utilisateur non connecté');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
    return null;
  }
};

export default getUserData;
