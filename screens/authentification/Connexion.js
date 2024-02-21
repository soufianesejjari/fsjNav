// LoginPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    navigation.navigate('Home');
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("waaaaaaaaaaaaaaaaaaaaaaaaa",errorMessage)
    // ..
  });
    // Ajoutez ici la logique d'authentification
    // Vous pouvez utiliser une API, Firebase, AsyncStorage, etc.
    // Pour cet exemple, nous naviguerons simplement vers la page Home si les identifiants sont corrects.

  };

  return (
    <View ClassName="bg-red-300" style={styles.container}>
      <Text style={styles.title}>Connectez-vous</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default LoginPage;
