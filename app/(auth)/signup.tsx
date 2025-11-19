import { useRouter } from 'expo-router';
import React, { useState } from 'react'; // Import useState
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // Import Image
import { SafeAreaView } from 'react-native-safe-area-context'; // For safe areas

// --- Theme Constants (Mirroring Home.tsx and Login.tsx for consistency) ---
const COLORS = {
  primary: '#0066CC',      // Deep Brand Blue
  background: '#def4ff',   // Light blue background
  cardBg: '#FFFFFF',       // White for cards/forms
  textDark: '#1E293B',     // Dark Slate for headings
  textGray: '#64748B',     // Cool Gray for subtitles/placeholders
  border: '#E0E7ED',       // Light border for inputs
};

export default function SignUp() {
  const router = useRouter();

  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Basic validation (you'd have more robust logic here)
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    
    // Just pretend it works and send the user to the login screen
    Alert.alert('Success', 'Account created! Please log in.');
    router.replace('/(auth)/login'); // Use replace to clear signup from history
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>

        {/* Pet Illustration */}
        <Image 
          source={require('../../assets/images/pet_travel_sign_up.png')}
          style={styles.petImage} 
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>Join Pet Pass and start your adventure.</Text>        
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={COLORS.textGray}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          returnKeyType="next"
        />
        
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
        
        <TouchableOpacity style={styles.button} onPress={handleSignUp} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: COLORS.background, 
  },
  backButton: {
    position: 'absolute', // Position absolutely for top-left
    top: 60, // Adjust as needed for status bar
    left: 24,
    zIndex: 10, // Ensure it's above other elements
  },
  backButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textGray,
  },
  petImage: {
    width: 250, // Adjust size as needed
    height: 150, 
    marginBottom: 20, // Reduced margin
  },
  title: { 
    fontSize: 30, // Slightly smaller than login title
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
    marginBottom: 8, 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textGray,
    marginBottom: 30, // Space below subtitle
    textAlign: 'center',
  },
  input: { 
    height: 50, 
    width: '100%',
    borderWidth: 1, 
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 15, 
    marginBottom: 15, 
    backgroundColor: COLORS.cardBg,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textDark,
  },
  button: { 
    backgroundColor: COLORS.primary, 
    width: '100%', 
    height: 50, 
    borderRadius: 12,
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 15, // Space above button
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { 
    color: COLORS.cardBg,
    fontSize: 18, 
    fontFamily: 'Poppins_600SemiBold',
  },
});