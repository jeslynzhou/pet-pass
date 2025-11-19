// app/_layout.tsx
import {
  Poppins_400Regular
} from '@expo-google-fonts/poppins';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

// 1. Prevent the splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

// --- The "Security Guard" Component ---
function AuthLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading || !segments) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (user && inAuthGroup) {
      router.replace('/(tabs)/home');
    } else if (!user && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [user, loading, segments, router]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Modals */}
      <Stack.Screen 
        name="add-pet" 
        options={{ title: "Add New Pet", presentation: "modal" }} 
      />
      <Stack.Screen 
        name="add-trip" 
        options={{ title: "Add New Trip", presentation: "modal" }} 
      />
      
      {/* Dynamic Pages */}
      <Stack.Screen name="checklist/[tripId]" options={{ title: "Trip Checklist" }} />
      <Stack.Screen 
        name="qrcode/[tripId]" 
        options={{ 
          title: "Boarding QR Code",
          headerShown: false 
        }} 
      />
    </Stack>
  );
}

// --- Main Root Layout ---
export default function RootLayout() {
  const colorScheme = useColorScheme();

  // 2. Load the fonts (TEMPORARILY LOADING ONLY ONE VARIANT)
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    // COMMENTED OUT TO DEBUG:
    // 'Poppins-Medium': Poppins_500Medium,
    // 'Poppins-SemiBold': Poppins_600SemiBold,
    // 'Poppins-Bold': Poppins_700Bold,
  });

  // 3. Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // 4. Keep Splash Screen visible while fonts load
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <AuthLayout />
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}