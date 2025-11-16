// app/add-pet.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default function AddPet() {
  const router = useRouter();

  const handleAddPet = () => {
    // We don't save anything, just log it and go back
    console.log('Pet saved (pretending)');
    alert('Pet Added! (Prototype)');
    router.back(); // Go back after "saving"
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Pet Name" />
      <TextInput style={styles.input} placeholder="Breed" />
      <TextInput style={styles.input} placeholder="Weight (lbs)" keyboardType="numeric" />
      <Button title="Save Pet" onPress={handleAddPet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 5 },
});