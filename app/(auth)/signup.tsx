// app/(auth)/signup.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignUp() {
  const router = useRouter();

  const handleSignUp = () => {
    // Just pretend it works and send the user to the login screen
    alert('Sign up successful! Please log in.');
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Back to Login" onPress={() => router.back()} />
    </View>
  );
}
// Use same styles as Login
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 5 },
});