import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0066CC",
        tabBarInactiveTintColor: "#64748B",
        headerShown: false,

        // 1. Style the Tab Bar container
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
        },

        // 2. Style the Text Labels
        tabBarLabelStyle: {
          fontFamily: "Poppins_600SemiBold",
          fontSize: 10, // Smaller font to fit 5 items cleanly
          marginTop: 2,
        },

        // 3. CRITICAL: Force even spacing
        tabBarItemStyle: {
          flex: 1, // This forces all tabs to be exactly the same width
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="checklists"
        options={{
          title: "Checklists",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="airplane-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="pets"
        options={{
          title: "Pets", // Shortened from "My Pets" for better spacing
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="partners"
        options={{
          title: "Partners",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-outline" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="regulations"
        options={{
          title: "Rules", // Shortened from "Regulations" to prevent text wrapping
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
