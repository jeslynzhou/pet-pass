// app/checklist/[tripId].tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { MOCK_CHECKLIST } from '../../data/mockData'; // Import mock checklist

export default function Checklist() {
  const { tripId } = useLocalSearchParams(); // We only use this for the QR code
  const router = useRouter();
  
  // We ignore the tripId and just show the mock checklist
  const checklist = MOCK_CHECKLIST;
  
  // Check if all items are "verified" in our mock data
  const allComplete = checklist.every(item => item.status === 'verified');

  return (
    <View style={styles.container}>
      <Text style={styles.tripTitle}>Trip ID: {tripId}</Text>
      <FlatList
        data={checklist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>Status: {item.status}</Text>
            {item.status === 'pending' && (
              <Button title="Upload (mock)" onPress={() => alert('Mock upload!')} />
            )}
          </View>
        )}
      />
      
      {/* For demo, we'll show the button even if not all complete */}
      <Button 
        title="View Boarding QR Code" 
        onPress={() => router.push(`/qrcode/${tripId}`)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  tripTitle: { fontSize: 14, color: 'gray', textAlign: 'center', marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  itemName: { fontSize: 16, fontWeight: 'bold' },
});