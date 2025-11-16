// app/qrcode/[tripId].tsx
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeScreen() {
  const { tripId } = useLocalSearchParams();
  
  // This is the URL airline staff would scan.
  // For the prototype, this URL is just a placeholder.
  const checkInUrl = `https://your-check-in-url.com/verify?trip=${tripId}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Airline Check-In</Text>
      <Text style={styles.subtitle}>Show this code to the airline staff.</Text>
      <View style={styles.qrContainer}>
        <QRCode
          value={checkInUrl}
          size={250}
          logoBackgroundColor="transparent"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: 'white' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 16, 
    color: 'gray', 
    marginBottom: 30, 
    textAlign: 'center' 
  },
  qrContainer: { 
    padding: 20, 
    backgroundColor: 'white', 
    borderRadius: 10,
    // Adds a nice shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});