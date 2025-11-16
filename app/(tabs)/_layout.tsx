// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons'; // Import an icon set
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: 'blue', // Sets the color for the active tab
        headerShown: false, // Hides the header for all tab screens
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: true, // Show header *only* for the home screen
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pets"
        options={{
          title: 'My Pets',
          headerShown: true, // Show header for this screen
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="regulations"
        options={{
          title: 'Regulations',
          headerShown: true, // Show header for this screen
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="airplane-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}