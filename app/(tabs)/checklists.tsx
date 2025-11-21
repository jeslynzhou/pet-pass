import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- Theme Constants ---
const COLORS = {
  primary: "#0066CC",
  background: "#def4ff",
  cardBg: "#FFFFFF",
  textDark: "#1E293B",
  textGray: "#64748B",
  success: "#10B981",
  warning: "#F59E0B",
  border: "#E0E7ED",
};

// --- MOCK TRIP DATA ---
const MY_TRIPS = [
  {
    id: "trip_1",
    origin: "SCL",
    destination: "JFK",
    date: "Dec 16, 2025",
    pet: "Coco",
    status: "In Progress", // In Progress, Ready, Completed
    progress: 0, // 25% done
  },
];

export default function TripsList() {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return COLORS.success;
      case "In Progress":
        return COLORS.primary;
      case "Completed":
        return COLORS.textGray;
      default:
        return COLORS.warning;
    }
  };

  const renderTripCard = ({ item }: { item: (typeof MY_TRIPS)[0] }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      // LINK TO THE CHECKLIST PAGE WE BUILT
      onPress={() => router.push(`/checklist/${item.id}`)}
    >
      {/* Header Row */}
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + "20" },
          ]}
        >
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {item.status}
          </Text>
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>

      {/* Route Row */}
      <View style={styles.routeRow}>
        <Text style={styles.airportCode}>{item.origin}</Text>
        <View style={styles.planeLine}>
          <View style={styles.dot} />
          <View style={styles.line} />
          <Ionicons
            name="airplane"
            size={16}
            color={COLORS.textGray}
            style={{ marginHorizontal: 5 }}
          />
          <View style={styles.line} />
          <View style={styles.dot} />
        </View>
        <Text style={styles.airportCode}>{item.destination}</Text>
      </View>

      {/* Footer Row */}
      <View style={styles.cardFooter}>
        <View style={styles.petInfo}>
          <Ionicons name="paw" size={14} color={COLORS.textGray} />
          <Text style={styles.petText}>{item.pet}</Text>
        </View>

        {/* Mini Progress Bar */}
        {item.status !== "Completed" && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>
              {Math.round(item.progress * 100)}% Ready
            </Text>
            <View style={styles.track}>
              <View
                style={[styles.fill, { width: `${item.progress * 100}%` }]}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
        <TouchableOpacity onPress={() => router.push("/add-trip")}>
          <Ionicons name="add-circle" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MY_TRIPS}
        keyExtractor={(item) => item.id}
        renderItem={renderTripCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },

  // --- CARD STYLES ---
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  dateText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textGray,
  },

  // Route Visualization
  routeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  airportCode: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
  },
  planeLine: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E2E8F0",
  },

  // Footer
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  petInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  petText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textDark,
  },
  progressContainer: {
    width: 100,
  },
  progressLabel: {
    fontSize: 10,
    color: COLORS.textGray,
    marginBottom: 4,
    textAlign: "right",
  },
  track: {
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: COLORS.success,
    borderRadius: 3,
  },
});
