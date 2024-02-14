import { getAuth, signInWithEmailAndPassword ,sendPasswordResetEmail} from 'firebase/auth';
import React, { useState } from 'react';
import MyLocalImage from '../../../assets/iconApp.png'

import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
// import { auth } from '../ConfigFirebase';

export default function LoginComponent({navigation}) {
 const auth = getAuth();

    const [error, setError] = useState('');
    const [resetSent, setResetSent] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleForget = async () => {
    try {
        if (!form.email ) {
            setError('Veuillez remplir le champ email');
            return;
        }
      await sendPasswordResetEmail(auth,form.email);
      setResetSent(true);
      setError('')
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      // Gérer les erreurs, par exemple, afficher un message à l'utilisateur
    }
  };
  const handleSignIn = () => {
    if (!form.email || !form.password) {
        setError('Veuillez remplir tous les champs');
        return;
    }
    signInWithEmailAndPassword(auth, form.email, form.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
   navigation.navigate('NAvT');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("waaaaaaaaaaaaaaaaaaaaaaaaa",errorMessage)
    setError("email et/ou mot de passe incorrect(s)");
    return;
    // ..
  });

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <Image
              alt=""
              resizeMode="contain"
              style={styles.headerImg}
              source={MyLocalImage
              }
            />

            <Text style={styles.title}>
              Connectez-vous à <Text style={{ color: '#FF8911' }}>FSNav</Text>
            </Text>

            <Text style={styles.subtitle}>
              Application de navigation au sein de la Faculté des Sciences, El Jadida
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Adresse e-mail</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="exemple@ucd.ac.ma"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Mot de passe</Text>

              <TextInput
                autoCorrect={false}
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>
            {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleForget}>
                <Text style={styles.errorTextt}> cliquez ici pour  Réinitialiser le mot de passe</Text>

              </TouchableOpacity> 
                 </View>
      ) : null}

{resetSent ? (
        <Text style={styles.successMessage}>
          Un email de réinitialisation a été envoyé à l'adresse {form.email}.
        </Text>
      ) : (null
      )}
            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSignIn}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Se connecter</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SingUp');
            }}
              style={{ marginTop: 'auto' }}
            >
              <Text style={styles.formFooter}>
                Vous n'avez pas de compte ?{' '}
                <Text style={{ textDecorationLine: 'underline' , color:'#FF8911'}}>Inscrivez-vous</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#7F27FF',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  /** Header */
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#7F27FF',
    borderColor: '#7F27FF',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  errorContainer: {
    backgroundColor: '#ffccc7',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    textAlign:'center',

    color: '#ff4d4f',
    fontWeight: 'bold',
  },
  errorTextt: {
    textAlign:'center',

    color: 'blue',
    fontWeight: 'bold',
  },
   buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  successMessage: {
    textAlign:'center',

    fontSize: 18,
    color: 'green',
    textAlign: 'center',
  },
});
