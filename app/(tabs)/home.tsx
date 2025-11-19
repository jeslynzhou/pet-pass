import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

// --- Theme Constants ---
const COLORS = {
  primary: '#0066CC',      // Deep Brand Blue
  background: '#def4ff',   // Your requested light blue
  cardBg: '#FFFFFF',       // White for cards
  textDark: '#1E293B',     // Dark Slate for headings
  textGray: '#64748B',     // Cool Gray for subtitles
  accent: '#FF9500',       // Orange for action icons
  success: '#10B981',      // Green for regulations
};

export default function Home() {
  const router = useRouter();
  const { logout } = useAuth(); // You can use 'user' here to get the name if available

  // Mock Data
  const upcomingTrip = {
    id: 'trip_123',
    destination: 'San Francisco',
    date: 'Dec 16, 2025',
    pet: 'Coco',
    airline: 'United Airlines'
  };

  return (
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER --- */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Welcome Back!</Text>
            <Text style={styles.subGreeting}>Ready for your next adventure?</Text>
          </View>
        </View>

        {/* --- SECTION 1: UPCOMING TRIP --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Trip</Text>
        </View>
        
        {upcomingTrip ? (
          <View style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>In 28 Days</Text>
              </View>
              <Ionicons name="airplane" size={24} color={COLORS.cardBg} />
            </View>
            
            <View style={styles.tripMainInfo}>
              <Text style={styles.tripLabel}>Traveling to</Text>
              <Text style={styles.tripDest}>{upcomingTrip.destination}</Text>
              <Text style={styles.tripDate}>{upcomingTrip.date}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.tripFooter}>
              <View style={styles.footerItem}>
                <Ionicons name="paw" size={14} color="rgba(255,255,255,0.8)" />
                <Text style={styles.footerText}> {upcomingTrip.pet}</Text>
              </View>
              <View style={styles.footerItem}>
                <Ionicons name="briefcase" size={14} color="rgba(255,255,255,0.8)" />
                <Text style={styles.footerText}> {upcomingTrip.airline}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.emptyStateCard}>
            <Text style={styles.emptyStateText}>No upcoming trips planned.</Text>
          </View>
        )}

        {/* --- SECTION 2: MAIN ACTION --- */}
        <TouchableOpacity 
          style={styles.planButton} 
          onPress={() => router.push('/add-trip')}
          activeOpacity={0.8}
        >
          <View style={styles.planButtonIcon}>
             <Ionicons name="add" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.planButtonText}>Plan a New Trip</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.cardBg} />
        </TouchableOpacity>

        {/* --- SECTION 3: DASHBOARD ACTIONS --- */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionList}>
          
          {/* 1. My Pets */}
          <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/(tabs)/pets')}>
            <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
              <Ionicons name="paw" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>My Pets</Text>
              <Text style={styles.actionSubtitle}>Profiles & Health Docs</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textGray} />
          </TouchableOpacity>

          {/* 2. Regulations */}
          <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/(tabs)/regulations')}>
            <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="document-text" size={22} color={COLORS.success} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Regulations</Text>
              <Text style={styles.actionSubtitle}>Airline & Country Rules</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textGray} />
          </TouchableOpacity>

          {/* 3. Pet Pass QR */}
          <TouchableOpacity 
            style={[styles.actionRow, { borderBottomWidth: 0 }]} 
            onPress={() => {
               if(upcomingTrip?.id) router.push(`/qrcode/${upcomingTrip.id}`);
               else alert("No upcoming trip!");
            }}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#FFF7ED' }]}>
              <Ionicons name="qr-code" size={22} color={COLORS.accent} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Pet Pass QR</Text>
              <Text style={styles.actionSubtitle}>Boarding Pass</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textGray} />
          </TouchableOpacity>

        </View>

      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
    paddingBottom: 50,
    backgroundColor: COLORS.background,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
    marginTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
  },
  subGreeting: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textGray,
    marginTop: 2,
  },
  profileButton: {
    backgroundColor: COLORS.cardBg,
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  // Section Titles
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
    marginBottom: 12,
  },

  // Trip Card
  tripCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: 24,
    marginBottom: 25,
    position: 'relative',
    overflow: 'hidden',
    // Deep Shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tagContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: COLORS.cardBg,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  tripMainInfo: {
    marginBottom: 10,
  },
  tripLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 4,
  },
  tripDest: {
    color: COLORS.cardBg,
    fontSize: 26,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 32,
  },
  tripDate: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 16,
  },
  tripFooter: {
    flexDirection: 'row',
    gap: 20,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.cardBg,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    marginLeft: 6,
  },

  // Plan Button
  planButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  planButtonIcon: {
    backgroundColor: COLORS.cardBg,
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planButtonText: {
    color: COLORS.cardBg,
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    flex: 1,
    marginLeft: 15,
  },

  // Action List
  actionList: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContent: {
    flex: 1,
    marginLeft: 16,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
  },
  actionSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textGray,
    marginTop: 2,
  },

  // Empty State
  emptyStateCard: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: COLORS.cardBg,
    borderStyle: 'dashed',
  },
  emptyStateText: {
    color: COLORS.textGray,
    fontFamily: 'Poppins_400Regular',
  }
});