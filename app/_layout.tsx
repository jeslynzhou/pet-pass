// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme'; // Your theme hook
import { AuthProvider, useAuth } from '../contexts/AuthContext'; // Our Auth logic

// This is the "security guard" component
function AuthLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading || !segments) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (user && inAuthGroup) {
      // User is logged in, redirect from (auth) group to home
      router.replace('/(tabs)/home');
    } else if (!user && !inAuthGroup) {
      // User is not logged in, redirect from app to login
      router.replace('/(auth)/login');
    }
  }, [user, loading, segments, router]);

  // Define all the screens for your app
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="add-pet" 
        options={{ title: "Add New Pet", presentation: "modal" }} 
      />
      <Stack.Screen 
        name="add-trip" 
        options={{ title: "Add New Trip", presentation: "modal" }} 
      />
      <Stack.Screen name="checklist/[tripId]" options={{ title: "Trip Checklist" }} />
      <Stack.Screen name="qrcode/[tripId]" options={{ title: "Boarding QR Code" }} />
    </Stack>
  );
}

// This is the main RootLayout
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    // 1. Your Theme Provider (outermost)
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      {/* 2. Our Auth Provider (wraps everything) */}
      <AuthProvider>
        
        {/* 3. Our AuthLayout (contains the Stack and redirect logic) */}
        <AuthLayout />

        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}