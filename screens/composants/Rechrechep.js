import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TextInput,
  Text,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Places from './PlacesV2';
import { btiment } from '../../firebaseServices/Batiments';

export default function RechercheP() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchText, setSearchText] = useState('');
  const [selectedBlocks, setSelectedBlocks] = useState([]);

  const translateHeader = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });

  const opacityTitle = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const translateTitle = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 40],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ backgroundColor: '#05141c' }}>
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: translateHeader }] },
        ]}>
        <Animated.Text
          style={[
            styles.headerTitle,
            { opacity: opacityTitle },
            { transform: [{ translateY: translateTitle }] },
          ]}>
          Rechercher {'\n'}dans la faculté
        </Animated.Text>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Entrez le nom de l'emplacement..."
            placeholderTextColor="#05141c"
            style={styles.input}
            onChangeText={(text) => {
              setSelectedBlocks([""]);

              setSearchText(text);
              if (!text) {
                // Réinitialiser la liste lorsqu'il n'y a pas de texte de recherche
              }
            }}
          />

          <View style={styles.inputIcon}>
            <FeatherIcon color="#FF8911" name="search" size={16} />
          </View>
        </View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={1}>
        </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 200, // Set the paddingTop to the height of the header
    padding: 24,
    backgroundColor: '#fff',
  },
  /** Header */
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 200,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: '#05141c',
  },
  headerTitle: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  /** Input */
  input: {
    height: 44,
    backgroundColor: '#fff',
    paddingLeft: 44,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
