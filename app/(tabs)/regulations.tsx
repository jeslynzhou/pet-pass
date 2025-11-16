// app/(tabs)/regulations.tsx
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { REGULATIONS } from '../../data/mockData'; // Import mock data

export default function Regulations() {
  return (
    <View style={styles.container}>
      <FlatList
        data={REGULATIONS} // Use hardcoded array
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.regItem}>
            <Text style={styles.regTitle}>{item.name} ({item.type})</Text>
            {item.requirements.map((req: string, index: number) => (
              <Text key={index}>- {req}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  regItem: { padding: 12, marginBottom: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
  regTitle: { fontSize: 18, fontWeight: 'bold' },
});