import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
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
  accent: "#FF9500",
  success: "#10B981",
  border: "#E0E7ED",
  warning: "#F59E0B",
};

// --- LOCATION OPTIONS ---
const DEPARTURE_OPTIONS = [
  "Santiago, Chile",
  "Lima, Peru",
  "Buenos Aires, Argentina",
  "Bogota, Colombia",
  "Sao Paulo, Brazil",
  "Mexico City, Mexico",
];

const DESTINATION_OPTIONS = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Spain",
];

// --- AIRLINE OPTIONS ---
const AIRLINE_OPTIONS = [
  "LATAM",
  "United Airlines",
  "Delta Air Lines",
  "American Airlines",
  "Air Canada",
  "British Airways",
  "Lufthansa",
];

// --- DESTINATION REGULATIONS DATA ---
const DESTINATION_REGULATIONS = {
  "United States": {
    icon: "flag" as const,
    color: COLORS.primary,
    timeline: [
      {
        phase: "60+ Days Before Travel",
        items: [
          "Get dog microchipped (before rabies vaccination)",
          "Verify microchip number with veterinarian",
          "Ensure rabies vaccination won't expire during travel",
          "Get rabies vaccination or booster if needed",
          "Collect blood sample for rabies serology titer (30+ days after first vaccine)",
        ],
      },
      {
        phase: "30 Days Before Travel",
        items: [
          "Complete Certification of Foreign Rabies Vaccination form with veterinarian",
          "Get form endorsed by official government veterinarian",
          "Reserve spot at CDC-registered animal care facility",
          "Print reservation confirmation",
        ],
      },
      {
        phase: "Week of Travel",
        items: [
          "Complete CDC Dog Import Form online",
          "Print two copies of vaccination certification",
          "Take recent photo of dog (within 15 days if under 1 year old)",
        ],
      },
    ],
    requirements: [
      "Dog must be at least 6 months old",
      "Valid rabies vaccination from approved country",
      "Microchip implanted before rabies vaccination",
      "Rabies serology titer from CDC-approved lab",
      "Health certificate from accredited veterinarian",
    ],
  },
  Canada: {
    icon: "flag" as const,
    color: COLORS.accent,
    timeline: [
      {
        phase: "30 Days Before Travel",
        items: [
          "Get health certificate from accredited veterinarian",
          "Ensure rabies vaccination is current",
          "Verify microchip identification",
        ],
      },
    ],
    requirements: [
      "Valid rabies vaccination certificate",
      "Health certificate issued within 30 days",
      "Microchip for identification",
      "Dog must be at least 3 months old",
    ],
  },
  "United Kingdom": {
    icon: "flag" as const,
    color: COLORS.success,
    timeline: [
      {
        phase: "4 Months Before Travel",
        items: [
          "Get dog microchipped",
          "Get rabies vaccination (after microchip)",
          "Wait 21 days after vaccination",
          "Get rabies antibody blood test",
        ],
      },
      {
        phase: "10 Days Before Travel",
        items: [
          "Get health certificate from official veterinarian",
          "Arrange for treatment against tapeworm",
        ],
      },
    ],
    requirements: [
      "EU pet passport or health certificate",
      "Rabies vaccination with 21-day wait period",
      "Microchip identification",
      "Rabies antibody test from EU-approved lab",
      "Tapeworm treatment 1-5 days before travel",
    ],
  },
};

// --- AIRLINE REGULATIONS DATA ---
const AIRLINE_REGULATIONS = {
  LATAM: {
    icon: "airplane" as const,
    color: COLORS.primary,
    policies: [
      "Advance booking required for pet travel",
      "Maximum 2 pets per passenger",
      "Carrier size: 45cm x 35cm x 25cm for cabin",
      "Pet must remain in carrier during flight",
      "Additional fee: $150-300 depending on route",
    ],
    restrictions: [
      "No pets allowed on flights over 8 hours",
      "Temperature restrictions apply",
      "Breed restrictions for snub-nosed dogs",
      "Health certificate required within 10 days",
    ],
  },
  "United Airlines": {
    icon: "airplane" as const,
    color: COLORS.accent,
    policies: [
      "PetSafe program for cargo transport",
      "In-cabin pets up to 9kg including carrier",
      "Carrier dimensions: 46cm x 28cm x 24cm",
      "Advance reservation required",
      "Fee: $125 each way for in-cabin",
    ],
    restrictions: [
      "No pets as cargo during summer months",
      "Breed restrictions apply",
      "Age restrictions: minimum 4 months old",
      "Health documentation required",
    ],
  },
  "Delta Air Lines": {
    icon: "airplane" as const,
    color: COLORS.success,
    policies: [
      "Carry-on pets allowed in cabin",
      "Cargo pet transport available year-round",
      "Carrier size: 48cm x 33cm x 23cm maximum",
      "Online pet booking system available",
      "Fee: $125-200 depending on destination",
    ],
    restrictions: [
      "No more than 2 pets per cabin",
      "Embargo dates during extreme weather",
      "Vaccination requirements strictly enforced",
      "Professional health certificate required",
    ],
  },
};

// --- DROPDOWN COMPONENT ---
const CustomDropdown = ({ label, value, options, onSelect, icon }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
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
            style={[styles.dropdownText, !value && { color: COLORS.textGray }]}
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
                      value === item && { color: COLORS.primary },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
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
  );
};

export default function Regulations() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [airline, setAirline] = useState("");
  const [expandedDestination, setExpandedDestination] = useState(false);
  const [expandedAirline, setExpandedAirline] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (departure && destination && airline) {
      setHasSearched(true);
    }
  };

  const destinationData =
    DESTINATION_REGULATIONS[
      destination as keyof typeof DESTINATION_REGULATIONS
    ];
  const airlineData =
    AIRLINE_REGULATIONS[airline as keyof typeof AIRLINE_REGULATIONS];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Travel Regulations</Text>
          <Text style={styles.headerSubtitle}>
            Search destination and airline requirements
          </Text>
        </View>

        {/* Search Form */}
        <View style={styles.searchCard}>
          <Text style={styles.searchTitle}>Plan Your Trip</Text>
          <Text style={styles.searchDescription}>
            Select your travel details to view specific regulations and
            requirements.
          </Text>

          <CustomDropdown
            label="Departure"
            value={departure}
            options={DEPARTURE_OPTIONS}
            onSelect={setDeparture}
            icon="location"
          />

          <CustomDropdown
            label="Destination"
            value={destination}
            options={DESTINATION_OPTIONS}
            onSelect={setDestination}
            icon="flag"
          />

          <CustomDropdown
            label="Airline"
            value={airline}
            options={AIRLINE_OPTIONS}
            onSelect={setAirline}
            icon="airplane"
          />

          <TouchableOpacity
            style={[
              styles.searchButton,
              !(departure && destination && airline) &&
                styles.searchButtonDisabled,
            ]}
            onPress={handleSearch}
            activeOpacity={0.8}
            disabled={!(departure && destination && airline)}
          >
            <Ionicons name="search" size={20} color={COLORS.cardBg} />
            <Text style={styles.searchButtonText}>Search Requirements</Text>
          </TouchableOpacity>
        </View>

        {/* Results */}
        {hasSearched && destinationData && airlineData && (
          <>
            {/* Route Summary */}
            <View style={styles.routeSummary}>
              <Text style={styles.routeText}>
                {departure} → {destination} via {airline}
              </Text>
            </View>

            {/* Destination Regulations */}
            <TouchableOpacity
              style={styles.regulationCard}
              onPress={() => setExpandedDestination(!expandedDestination)}
              activeOpacity={0.8}
            >
              <View style={styles.regulationHeader}>
                <View
                  style={[
                    styles.regulationIcon,
                    { backgroundColor: `${destinationData.color}15` },
                  ]}
                >
                  <Ionicons
                    name={destinationData.icon}
                    size={24}
                    color={destinationData.color}
                  />
                </View>
                <View style={styles.regulationContent}>
                  <Text style={styles.regulationTitle}>
                    {destination} Requirements
                  </Text>
                  <Text style={styles.regulationSubtitle}>
                    Destination country regulations
                  </Text>
                </View>
                <Ionicons
                  name={expandedDestination ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={COLORS.textGray}
                />
              </View>

              {expandedDestination && (
                <View style={styles.regulationDetails}>
                  {destinationData.timeline.map((phase, index) => (
                    <View key={index} style={styles.timelinePhase}>
                      <Text style={styles.phaseTitle}>{phase.phase}</Text>
                      {phase.items.map((item, idx) => (
                        <View key={idx} style={styles.requirementRow}>
                          <View style={styles.bulletPoint} />
                          <Text style={styles.requirementText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  ))}

                  <View style={styles.additionalRequirements}>
                    <Text style={styles.additionalTitle}>Key Requirements</Text>
                    {destinationData.requirements.map((req, index) => (
                      <View key={index} style={styles.requirementRow}>
                        <Ionicons
                          name="checkmark-circle"
                          size={16}
                          color={COLORS.success}
                        />
                        <Text
                          style={[styles.requirementText, { marginLeft: 8 }]}
                        >
                          {req}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </TouchableOpacity>

            {/* Airline Regulations */}
            <TouchableOpacity
              style={styles.regulationCard}
              onPress={() => setExpandedAirline(!expandedAirline)}
              activeOpacity={0.8}
            >
              <View style={styles.regulationHeader}>
                <View
                  style={[
                    styles.regulationIcon,
                    { backgroundColor: `${airlineData.color}15` },
                  ]}
                >
                  <Ionicons
                    name={airlineData.icon}
                    size={24}
                    color={airlineData.color}
                  />
                </View>
                <View style={styles.regulationContent}>
                  <Text style={styles.regulationTitle}>{airline} Policies</Text>
                  <Text style={styles.regulationSubtitle}>
                    Airline-specific pet policies
                  </Text>
                </View>
                <Ionicons
                  name={expandedAirline ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={COLORS.textGray}
                />
              </View>

              {expandedAirline && (
                <View style={styles.regulationDetails}>
                  <View style={styles.policySection}>
                    <Text style={styles.policyTitle}>Pet Travel Policies</Text>
                    {airlineData.policies.map((policy, index) => (
                      <View key={index} style={styles.requirementRow}>
                        <View style={styles.bulletPoint} />
                        <Text style={styles.requirementText}>{policy}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.policySection}>
                    <Text style={styles.policyTitle}>
                      Restrictions & Limitations
                    </Text>
                    {airlineData.restrictions.map((restriction, index) => (
                      <View key={index} style={styles.requirementRow}>
                        <Ionicons
                          name="warning"
                          size={16}
                          color={COLORS.warning}
                        />
                        <Text
                          style={[styles.requirementText, { marginLeft: 8 }]}
                        >
                          {restriction}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </>
        )}

        {/* Empty State */}
        {!hasSearched && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color={COLORS.textGray} />
            <Text style={styles.emptyStateTitle}>
              Search Travel Requirements
            </Text>
            <Text style={styles.emptyStateText}>
              Select your departure, destination, and airline to view specific
              pet travel regulations and requirements.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 50,
  },
  header: {
    marginBottom: 25,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textGray,
  },
  searchCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  searchTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginBottom: 6,
  },
  searchDescription: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textGray,
    marginBottom: 20,
  },
  dropdownWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  dropdownButton: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textDark,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  searchButtonDisabled: {
    backgroundColor: COLORS.textGray,
    shadowOpacity: 0,
  },
  searchButtonText: {
    color: COLORS.cardBg,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    width: "100%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginBottom: 15,
    textAlign: "center",
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textDark,
  },
  closeButton: {
    marginTop: 15,
    padding: 12,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textGray,
  },
  routeSummary: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  routeText: {
    color: COLORS.cardBg,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  regulationCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  regulationHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  regulationIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  regulationContent: {
    flex: 1,
  },
  regulationTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  regulationSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textGray,
  },
  regulationDetails: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  timelinePhase: {
    marginBottom: 20,
  },
  phaseTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  additionalRequirements: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  additionalTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginBottom: 12,
  },
  policySection: {
    marginBottom: 20,
  },
  policyTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginBottom: 12,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 6,
    marginRight: 10,
  },
  requirementText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textDark,
    lineHeight: 16,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textGray,
    textAlign: "center",
    lineHeight: 20,
  },
});
