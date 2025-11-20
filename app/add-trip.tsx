import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; // 1. Import Picker
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  ScrollView,
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
  border: "#E0E7ED",
};

// --- MOCK DATA OPTIONS ---
const PETS = ["Coco", "Bella"];
const ORIGINS = [
  "Santiago, Chile",
  "Buenos Aires, Argentina",
  "Lima, Peru",
  "Bogota, Colombia",
  "Sao Paulo, Brazil",
];
const DESTINATIONS = [
  "San Francisco, USA",
  "Miami, USA",
  "New York, USA",
  "Madrid, Spain",
  "Paris, France",
];
const AIRLINES = [
  "LATAM",
  "United Airlines",
  "Delta",
  "American Airlines",
  "Sky Airline",
  "JetSMART",
];

// --- REUSABLE DROPDOWN COMPONENT ---
const CustomDropdown = ({ label, value, options, onSelect, icon }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setVisible(true)}
          activeOpacity={0.8}
        >
          <View style={styles.dropdownContent}>
            <Ionicons
              name={icon}
              size={20}
              color={COLORS.primary}
              style={{ marginRight: 10 }}
            />
            <Text
              style={[
                styles.dropdownText,
                !value && { color: COLORS.textGray },
              ]}
            >
              {value || `Select ${label}`}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={20} color={COLORS.textGray} />
        </TouchableOpacity>

        <Modal visible={visible} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select {label}</Text>
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => {
                      onSelect(item);
                      setVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item === value && {
                          color: COLORS.primary,
                          fontFamily: "Poppins_600SemiBold",
                        },
                      ]}
                    >
                      {item}
                    </Text>
                    {item === value && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={COLORS.primary}
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </>
  );
};

export default function AddTrip() {
  const router = useRouter();

  // State
  const [pet, setPet] = useState(PETS[0]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [airline, setAirline] = useState("");

  // --- DATE PICKER STATE ---
  const [date, setDate] = useState(new Date()); // Store as Date object
  const [showDatePicker, setShowDatePicker] = useState(false);

  const generateChecklistAndSave = () => {
    const fakeTripId = `trip-${Date.now()}`;
    router.replace(`/checklist/${fakeTripId}`);
  };

  // --- DATE HANDLER ---
  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    // On Android, we hide the picker immediately after selection
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    setDate(currentDate);
  };

  // Helper to format date nicely (e.g., "Dec 16, 2025")
  const formatDate = (dateObj: Date) => {
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan a Trip</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>New Adventure</Text>
        </View>

        <View style={styles.formCard}>
          <CustomDropdown
            label="Who is traveling?"
            value={pet}
            options={PETS}
            onSelect={setPet}
            icon="paw"
          />

          <CustomDropdown
            label="Origin (From)"
            value={origin}
            options={ORIGINS}
            onSelect={setOrigin}
            icon="navigate"
          />

          <CustomDropdown
            label="Destination (To)"
            value={destination}
            options={DESTINATIONS}
            onSelect={setDestination}
            icon="location"
          />

          <CustomDropdown
            label="Airline"
            value={airline}
            options={AIRLINES}
            onSelect={setAirline}
            icon="airplane"
          />

          {/* --- 5. REAL DATE PICKER --- */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Travel Date</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              activeOpacity={0.7}
              onPress={() => setShowDatePicker(true)} // Open picker
            >
              <View style={styles.dropdownContent}>
                <Ionicons
                  name="calendar"
                  size={20}
                  color={COLORS.primary}
                  style={{ marginRight: 10 }}
                />
                {/* Show formatted date */}
                <Text style={styles.dropdownText}>{formatDate(date)}</Text>
              </View>
            </TouchableOpacity>

            {/* The Picker Component */}
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChangeDate}
                minimumDate={new Date()} // Can't pick past dates
                style={styles.datePicker} // For iOS styling if needed
              />
            )}

            {/* iOS specific "Done" button since spinner doesn't close automatically */}
            {Platform.OS === "ios" && showDatePicker && (
              <TouchableOpacity
                style={styles.iosDateCloseBtn}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.iosDateCloseText}>Confirm Date</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={generateChecklistAndSave}
        >
          <Text style={styles.createButtonText}>Create Trip</Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color="#FFF"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
  },
  backBtn: {
    padding: 5,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },

  heroSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
  },

  formCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textGray,
    marginBottom: 8,
    marginLeft: 4,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 15,
  },
  dropdownContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textDark,
  },

  // Date Picker Styles
  datePicker: {
    marginTop: 10,
    width: "100%",
    height: 120,
  },
  iosDateCloseBtn: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E0F2FE",
    borderRadius: 8,
    marginTop: 5,
  },
  iosDateCloseText: {
    color: COLORS.primary,
    fontFamily: "Poppins_600SemiBold",
  },

  createButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginBottom: 15,
    textAlign: "center",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textDark,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
  },
  closeButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textGray,
  },
});
