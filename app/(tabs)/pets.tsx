// app/(tabs)/pets.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { MY_PETS } from '../../data/mockData'; // Import mock data

export default function Pets() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Add a New Pet" onPress={() => router.push('/add-pet')} />
      <FlatList
        data={MY_PETS} // Use hardcoded array
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.petItem}>
            <Text style={styles.petName}>{item.name}</Text>
            <Text>{item.breed}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  petItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  petName: { fontSize: 18, fontWeight: 'bold' },
});