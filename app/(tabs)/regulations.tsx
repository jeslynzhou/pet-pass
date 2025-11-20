import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Theme Constants ---
const COLORS = {
  primary: '#0066CC',
  background: '#def4ff',
  cardBg: '#FFFFFF',
  textDark: '#1E293B',
  textGray: '#64748B',
  accent: '#FF9500',
  success: '#10B981',
  border: '#E0E7ED',
};

// --- DROPDOWN OPTIONS ---
const ORIGIN_OPTIONS = [
  'Santiago, Chile',
  'Lima, Peru',
  'Buenos Aires, Argentina',
  'Bogota, Colombia',
  'Sao Paulo, Brazil'
];

const DESTINATION_OPTIONS = [
  'San Francisco, USA',
  'Miami, USA',
  'New York, USA',
  'Madrid, Spain',
  'Paris, France'
];

// Updated with Latin American Airlines
const AIRLINE_OPTIONS = [
  'LATAM',
  'Sky Airline',
  'JetSMART',
  'Copa Airlines',
  'Avianca',
  'United Airlines',
  'American Airlines', 
  'Delta', 
];

// --- RULES DATA ---
const COUNTRY_RULES = {
  USA: [
    { id: 1, title: "Rabies Vaccination", desc: "Must be administered at least 28 days before arrival." },
    { id: 2, title: "CDC Dog Import Form", desc: "Receipt must be shown at check-in." },
    { id: 3, title: "Microchip", desc: "ISO 11784/11785 compatible (15 digits)." },
    { id: 4, title: "Health Certificate", desc: "Issued by a vet within 10 days of travel." },
  ]
};

// Updated Rules for LATAM/Chilean Airlines
const AIRLINE_RULES: Record<string, any> = {
  'LATAM': {
    weight: "Max 7kg (pet + carrier)",
    carrier: "Soft: 36 x 33 x 23 cm / Hard: 36 x 33 x 19 cm",
    restrictions: "No brachycephalic dogs in hold. 8 weeks min age.",
  },
  'Sky Airline': {
    weight: "Max 6kg (pet + carrier)",
    carrier: "Soft: 35 x 33 x 17 cm",
    restrictions: "Cabin only. 1 pet per passenger.",
  },
  'JetSMART': {
    weight: "Max 10kg (pet + carrier)",
    carrier: "Soft: 38 x 35 x 22 cm",
    restrictions: "No pets in exit rows. Dogs & Cats only.",
  },
  'Copa Airlines': {
    weight: "Max 10kg (pet + carrier)",
    carrier: "Soft preferred: 28 x 45 x 28 cm",
    restrictions: "No pets in Business Class.",
  },
  'Avianca': {
    weight: "Max 10kg (pet + carrier)",
    carrier: "Soft: 55 x 35 x 25 cm (Flexible)",
    restrictions: "Must fit fully inside carrier.",
  },
  'United Airlines': {
    weight: "No specific limit (must fit comfortably)",
    carrier: "Hard: 44 x 30 x 19 cm / Soft: 45 x 27 x 27 cm",
    restrictions: "Must stand and turn around in carrier.",
  },
  'Default': {
    weight: "Standard: Max 8kg usually",
    carrier: "Standard: 40 x 30 x 20 cm",
    restrictions: "Check specific airline website.",
  }
};

// --- REUSABLE DROPDOWN COMPONENT ---
const CustomDropdown = ({ label, value, options, onSelect }: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity 
        style={styles.dropdownButton} 
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownText}>{value}</Text>
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
                  <Text style={[
                    styles.optionText, 
                    item === value && { color: COLORS.primary, fontFamily: 'Poppins_600SemiBold' }
                  ]}>
                    {item}
                  </Text>
                  {item === value && <Ionicons name="checkmark" size={20} color={COLORS.primary} />}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default function Regulations() {
  const [origin, setOrigin] = useState(ORIGIN_OPTIONS[0]);
  const [destination, setDestination] = useState(DESTINATION_OPTIONS[0]);
  const [airline, setAirline] = useState(AIRLINE_OPTIONS[0]);
  
  const [hasSearched, setHasSearched] = useState(false);
  const [isSupportedRoute, setIsSupportedRoute] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    if (origin.includes('Santiago') && destination.includes('San Francisco')) {
      setIsSupportedRoute(true);
    } else {
      setIsSupportedRoute(false);
    }
  };

  const currentAirlineRules = AIRLINE_RULES[airline] || AIRLINE_RULES['Default'];

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Travel Regulations</Text>
        <Text style={styles.headerSubtitle}>Find rules for your specific route.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* --- SEARCH BOX --- */}
        <View style={styles.searchCard}>
          <CustomDropdown 
            label="From" 
            value={origin} 
            options={ORIGIN_OPTIONS} 
            onSelect={setOrigin} 
          />
          <View style={styles.arrowContainer}>
             <Ionicons name="arrow-down" size={24} color={COLORS.primary} />
          </View>
          <CustomDropdown 
            label="To" 
            value={destination} 
            options={DESTINATION_OPTIONS} 
            onSelect={setDestination} 
          />
          <View style={{ height: 20 }} />
          <CustomDropdown 
            label="Airline" 
            value={airline} 
            options={AIRLINE_OPTIONS} 
            onSelect={setAirline} 
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Check Regulations</Text>
          </TouchableOpacity>
        </View>

        {/* --- RESULTS --- */}
        {hasSearched && (
          <View style={styles.resultsContainer}>
            
            {isSupportedRoute ? (
              <>
                {/* Section A: Government Rules */}
                <View style={styles.resultSection}>
                  <View style={styles.sectionHeader}>
                    <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
                      <Ionicons name="earth" size={20} color={COLORS.success} />
                    </View>
                    <Text style={styles.sectionTitle}>Entry Requirements (USA)</Text>
                  </View>
                  <View style={styles.infoCard}>
                    {COUNTRY_RULES.USA.map((rule) => (
                      <View key={rule.id} style={styles.ruleRow}>
                        <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                        <View style={styles.ruleContent}>
                          <Text style={styles.ruleTitle}>{rule.title}</Text>
                          <Text style={styles.ruleDesc}>{rule.desc}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Section B: Airline Rules */}
                <View style={styles.resultSection}>
                  <View style={styles.sectionHeader}>
                    <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
                      <Ionicons name="airplane" size={20} color={COLORS.primary} />
                    </View>
                    <Text style={styles.sectionTitle}>Airline Policy ({airline})</Text>
                  </View>

                  <View style={styles.infoCard}>
                    <View style={styles.ruleRow}>
                      <Ionicons name="scale" size={20} color={COLORS.primary} />
                      <View style={styles.ruleContent}>
                        <Text style={styles.ruleTitle}>Cabin Weight Limit</Text>
                        <Text style={styles.ruleDesc}>{currentAirlineRules.weight}</Text>
                      </View>
                    </View>
                    <View style={styles.ruleRow}>
                      <Ionicons name="briefcase" size={20} color={COLORS.primary} />
                      <View style={styles.ruleContent}>
                        <Text style={styles.ruleTitle}>Carrier Dimensions</Text>
                        <Text style={styles.ruleDesc}>{currentAirlineRules.carrier}</Text>
                      </View>
                    </View>
                    <View style={styles.ruleRow}>
                      <Ionicons name="alert-circle" size={20} color={COLORS.accent} />
                      <View style={styles.ruleContent}>
                        <Text style={[styles.ruleTitle, { color: COLORS.accent }]}>Restrictions</Text>
                        <Text style={styles.ruleDesc}>{currentAirlineRules.restrictions}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              // --- EMPTY STATE ---
              <View style={styles.emptyState}>
                <Ionicons name="search" size={48} color={COLORS.textGray} />
                <Text style={styles.emptyTitle}>No Data Available</Text>
                <Text style={styles.emptyText}>
                  We currently only have verified data for the Santiago to San Francisco route.
                </Text>
              </View>
            )}
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textGray,
    marginTop: 2,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  // Search Card
  searchCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  dropdownWrapper: { marginBottom: 10 },
  inputLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textGray,
    marginBottom: 5,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textDark,
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: -5,
    zIndex: 1,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  // Results
  resultsContainer: { marginTop: 10 },
  resultSection: { marginBottom: 25 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
  },
  infoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  ruleContent: { flex: 1, marginLeft: 12 },
  ruleTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
  },
  ruleDesc: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textGray,
    marginTop: 2,
    lineHeight: 20,
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
    marginTop: 15,
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textGray,
    textAlign: 'center',
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
    marginBottom: 15,
    textAlign: 'center',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textDark,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
  },
  closeButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textGray,
  },
});