import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // Import Image
import { SafeAreaView } from 'react-native-safe-area-context'; // For safe areas
import { useAuth } from '../../contexts/AuthContext';

// --- Theme Constants (Mirroring Home.tsx for consistency) ---
const COLORS = {
  primary: '#0066CC',      // Deep Brand Blue
  background: '#def4ff',   // Light blue background
  cardBg: '#FFFFFF',       // White for cards/forms
  textDark: '#1E293B',     // Dark Slate for headings
  textGray: '#64748B',     // Cool Gray for subtitles/placeholders
  border: '#E0E7ED',       // Light border for inputs
};

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('user@test.com'); // Pre-fill for testing
  const [password, setPassword] = useState('password123'); // Pre-fill for testing

  const handleLogin = () => {
    const success = login(email, password);

    if (success) {
      console.log("Login successful, redirecting...");
      router.replace('/(tabs)/home'); 
    } else {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Pet Illustration */}
        <Image 
          source={require('../../assets/images/pet_log_in.png')}
          style={styles.petImage} 
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Welcome to Pet Pass!</Text>
        <Text style={styles.subtitle}>Sign in to continue your adventure.</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor={COLORS.textGray}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={COLORS.textGray}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          returnKeyType="done"
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Optional: Add a signup link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')} activeOpacity={0.7}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // Match Home screen background
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', // Center content horizontally
    paddingHorizontal: 24, // Consistent horizontal padding
    backgroundColor: COLORS.background, 
  },
  petImage: {
    width: 250, // Adjust size as needed
    height: 150, // Adjust size as needed
    marginBottom: 30, // Space below image
  },
  title: { 
    fontSize: 25, // Larger for impact
    fontFamily: 'Poppins_600SemiBold', // Use loaded Poppins font
    color: COLORS.textDark,
    marginBottom: 8, 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular', // Use loaded Poppins font
    color: COLORS.textGray,
    marginBottom: 40, // Space below subtitle
    textAlign: 'center',
  },
  input: { 
    height: 50, 
    width: '100%', // Take full width
    borderWidth: 1, 
    borderColor: COLORS.border, // Lighter border
    borderRadius: 12, // More rounded corners
    paddingHorizontal: 15, 
    marginBottom: 15, 
    backgroundColor: COLORS.cardBg, // White input background
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textDark,
  },
  button: { 
    backgroundColor: COLORS.primary, 
    width: '100%', 
    height: 50, 
    borderRadius: 12, // Match input border radius
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10, // Space above button
    // Add shadow for consistency
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { 
    color: COLORS.cardBg, // White text
    fontSize: 18, 
    fontFamily: 'Poppins_600SemiBold', // Use loaded Poppins font
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textGray,
  },
  signupLink: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.primary,
  },
});