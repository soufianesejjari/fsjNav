import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

const AddOrganizationModal = ({ visible, onClose, onAddOrganization, isLoading }) => {
  const [organizerEmail, setOrganizerEmail] = useState('');

  const handleAddOrganization = async () => {
    // Add validation logic if needed
    try {
    
        const querySnapshot = await getDocs(query(collection(firestore, 'users'), where('email', '==', organizerEmail)));
        
        if (querySnapshot.size > 0) {
          const docRef = querySnapshot.docs[0].ref;
    
          await updateDoc(docRef, {
            type: "organisateur"
          });
    
          await onAddOrganization("L'organisateur a été Bien ajouté");
        } else {
            await onAddOrganization("Utilisateur non trouvé ");
        }
      } catch (error) {
        await onAddOrganization("Erreur lors de l'ajout de l'organisateur  :");
      }
    
    // Call the onAddOrganization prop with the organizerEmail
 //   await onAddOrganization(organizerEmail);

    // Close the modal and reset the state
    setOrganizerEmail('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Ajouter un organisateur</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez l'adresse e-mail de l'organisateur"
          value={organizerEmail}
          onChangeText={(text) => setOrganizerEmail(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddOrganization} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Ajouter</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onClose} disabled={isLoading}>
          <Text style={styles.buttonText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },

  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    opacity: (props) => (props.disabled ? 0.6 : 1), // Reduce opacity when disabled
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddOrganizationModal;
