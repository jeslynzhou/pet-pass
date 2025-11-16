// app/(tabs)/home.tsx
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

export default function Home() {
  const router = useRouter();
  const { logout } = useAuth(); // Get the logout function

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Pass Dashboard</Text>
      
      <Button title="Add a New Trip" onPress={() => router.push('/add-trip')} />
      <Button title="Manage My Pets" onPress={() => router.push('/(tabs)/pets')} />
      <Button title="View Regulations" onPress={() => router.push('/(tabs)/regulations')} />

      <View style={{ marginTop: 50 }}>
        <Button title="Sign Out" onPress={logout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
});