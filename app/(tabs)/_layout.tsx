// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#0066CC', 
        tabBarInactiveTintColor: '#64748B',
        headerShown: false, 
        
        // 1. Style the Tab Bar container
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0, // Optional: removes line for cleaner look
          elevation: 10, // Optional: adds shadow on Android
          shadowColor: '#000', // Optional: adds shadow on iOS
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
        },

        // 2. Style the Text Labels (Apply Poppins here)
        tabBarLabelStyle: {
          fontFamily: 'Poppins_600SemiBold', // Make sure this matches your loaded font name
          fontSize: 11,
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="pets"
        options={{
          title: 'My Pets',
          headerShown: true, 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="partners"
        options={{
          title: 'Partners',
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="regulations"
        options={{
          title: 'Regulations',
          headerShown: true, 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="airplane-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}