// app/(auth)/login.tsx
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext'; // Import our new hook

export default function Login() {
  const [email, setEmail] = useState('user@test.com'); // Pre-fill for demo
  const [password, setPassword] = useState('password123'); // Pre-fill for demo
  const { login } = useAuth(); // Get the login function

  const handleLogin = () => {
    const success = login(email, password);
    if (!success) {
      alert('Invalid credentials. Try: user@test.com / password123');
    }
    // The root _layout will handle redirecting if login is successful
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Link href="/(auth)/signup" style={styles.link}>
        Don&apos;t have an account? Sign Up
      </Link>
    </View>
  );
}
// Add simple styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 5 },
  link: { marginTop: 16, textAlign: 'center', color: 'blue' },
});