import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
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

// --- UPDATED MOCK DATA (Matching Pet Details) ---
const PET_DATABASE = [
  {
    id: '1', // Coco
    name: 'Coco',
    breed: 'Golden Retriever',
    weight: '28',
    size: 'Large',
    specialNeeds: 'Anxiety medication during flights.',
    vaccines: 'Rabies (Exp 2026)',
    image: require('../../assets/images/pet.png'),
  },
  {
    id: '2', // Bella
    name: 'Bella',
    breed: 'French Bulldog',
    weight: '12',
    size: 'Small',
    specialNeeds: 'None',
    vaccines: 'Needs Booster',
    image: null,
  }
];

export default function Pets() {
  const router = useRouter();

  // Helper to determine status color based on text
  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes('needs') || status.toLowerCase().includes('expired')) {
      return COLORS.accent; // Orange/Red
    }
    return COLORS.success; // Green
  };

  const renderPetCard = ({ item }: { item: typeof PET_DATABASE[0] }) => {
    const statusColor = getStatusColor(item.vaccines);

    return (
      <TouchableOpacity 
        style={styles.petCard} 
        activeOpacity={0.9}
        // Navigate to details page with ID
        onPress={() => router.push({ pathname: '/pet-details/[id]', params: { id: item.id } })}
      >
        {/* Pet Image */}
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image source={item.image} style={styles.petImage} resizeMode="cover" />
          ) : (
            <View style={[styles.petImage, styles.placeholderImage]}>
               <Ionicons name="paw" size={30} color={COLORS.primary} />
            </View>
          )}
        </View>

        {/* Pet Details */}
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.petName}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textGray} />
          </View>
          
          <Text style={styles.petBreed}>{item.breed}</Text>
          
          <View style={styles.statsRow}>
            {/* Badge 1: Size */}
            <View style={styles.statBadge}>
              <Text style={styles.statLabel}>{item.size}</Text>
            </View>
            {/* Badge 2: Weight */}
            <View style={styles.statBadge}>
              <Text style={styles.statLabel}>{item.weight} kg</Text>
            </View>
          </View>

          {/* Status Indicator */}
          <View style={styles.statusRow}>
              <Ionicons 
                name={statusColor === COLORS.success ? "checkmark-circle" : "alert-circle"} 
                size={14} 
                color={statusColor} 
              />
              <Text 
                style={[styles.statusText, { color: statusColor }]}
                numberOfLines={1}
              >
                {item.vaccines}
              </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Pets</Text>
        <Text style={styles.headerSubtitle}>Manage profiles and health documents.</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Add Pet Button */}
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => router.push('/add-pet')} // Corrected Route
          activeOpacity={0.8}
        >
          <View style={styles.addIconCircle}>
            <Ionicons name="add" size={24} color={COLORS.cardBg} />
          </View>
          <Text style={styles.addButtonText}>Add a New Pet</Text>
        </TouchableOpacity>

        {/* List of Pets */}
        <FlatList
          data={PET_DATABASE}
          keyExtractor={(item) => item.id}
          renderItem={renderPetCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },

  // --- ADD BUTTON ---
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    padding: 12,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  addIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.primary,
  },

  // --- PET CARD ---
  petCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    marginRight: 15,
  },
  petImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  placeholderImage: {
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  petName: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
  },
  petBreed: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textGray,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  statBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textGray,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    flex: 1,
  },
});