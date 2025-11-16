// app/add-trip.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default function AddTrip() {
  const router = useRouter();

  const generateChecklistAndSave = () => {
    // Just create a fake trip ID and navigate to the checklist
    const fakeTripId = `fake-trip-${Date.now()}`;
    
    // In this prototype, every trip will show the *same* checklist
    // We pass the ID just to show that the URL is dynamic
    router.replace(`/checklist/${fakeTripId}`);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Select Pet (e.g., Buddy)" />
      <TextInput style={styles.input} placeholder="Destination (e.g., 'United Kingdom')" />
      <TextInput style={styles.input} placeholder="Airline (e.g., 'American Airlines')" />
      <Button title="Create Trip" onPress={generateChecklistAndSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, padding: 8, borderRadius: 5 },
});