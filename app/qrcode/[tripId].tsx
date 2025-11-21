import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

// --- Theme Constants ---
const COLORS = {
  primary: "#0066CC",
  background: "#0066CC",
  cardBg: "#FFFFFF",
  textDark: "#1E293B",
  textGray: "#64748B",
  divider: "#E2E8F0",
};

export default function QRCodeScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();

  // Mock Data
  const ticketData = {
    origin: "SCL",
    destination: "JFK",
    flight: "LA 602",
    date: "Dec 16",
    seat: "4A",
    passenger: "Coco & Owner",
    gate: "12",
  };

  const checkInUrl = `https://petpass.com/verify?trip=${tripId}`;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Boarding Pass</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.container}>
          <View style={styles.ticketCard}>
            <View style={styles.topSection}>
              <View style={styles.flightRow}>
                <View>
                  <Text style={styles.airportCode}>{ticketData.origin}</Text>
                  <Text style={styles.cityName}>Santiago</Text>
                </View>
                <Ionicons
                  name="airplane"
                  size={24}
                  color={COLORS.primary}
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.airportCode}>
                    {ticketData.destination}
                  </Text>
                  <Text style={styles.cityName}>New York</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <View>
                  <Text style={styles.label}>Flight</Text>
                  <Text style={styles.value}>{ticketData.flight}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Date</Text>
                  <Text style={styles.value}>{ticketData.date}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Gate</Text>
                  <Text style={styles.value}>{ticketData.gate}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Seat</Text>
                  <Text style={styles.value}>{ticketData.seat}</Text>
                </View>
              </View>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.leftNotch} />
              <View style={styles.dashedLine} />
              <View style={styles.rightNotch} />
            </View>

            <View style={styles.bottomSection}>
              <View style={styles.qrWrapper}>
                <QRCode
                  value={checkInUrl}
                  size={180}
                  color="black"
                  backgroundColor="white"
                />
              </View>
              <Text style={styles.scanText}>Scan at counter</Text>
              <Text style={styles.passengerName}>{ticketData.passenger}</Text>
            </View>
          </View>

          <Text style={styles.brightnessHint}>
            Please increase screen brightness
          </Text>
        </View>
      </SafeAreaView>
    </>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  ticketCard: {
    width: "100%",
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    overflow: "hidden",
  },
  topSection: {
    padding: 24,
    paddingBottom: 30,
  },
  flightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  airportCode: {
    fontSize: 32,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginBottom: -5,
  },
  cityName: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textGray,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textGray,
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 20,
    backgroundColor: COLORS.cardBg,
    position: "relative",
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    marginHorizontal: 10,
  },
  leftNotch: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.background,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: -10,
  },
  rightNotch: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: -10,
  },
  bottomSection: {
    padding: 30,
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
  },
  qrWrapper: {
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 15,
  },
  scanText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textGray,
    marginBottom: 5,
  },
  passengerName: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
  },
  brightnessHint: {
    marginTop: 20,
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});
