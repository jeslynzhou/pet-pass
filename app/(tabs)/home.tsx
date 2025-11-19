import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

// --- Constants for Theme ---
const COLORS = {
  primary: '#0066CC',    // Deep Blue
  secondary: '#E6F0FF',  // Light Blue Background
  white: '#FFFFFF',
  textDark: '#1F2937',
  textLight: '#6B7280',
  border: '#F3F4F6',
};

export default function Home() {
  const router = useRouter();
  const { logout } = useAuth();

  // Mock Data
  const upcomingTrip = {
    id: 'trip_123', // Added an ID for the QR link
    destination: 'San Francisco',
    date: 'Dec 16, 2025',
    pet: 'Coco',
    airline: 'United Airlines'
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      
      {/* --- SECTION 1: UPCOMING TRIP --- */}
      <Text style={styles.sectionTitle}>Upcoming Trip</Text>
      {upcomingTrip ? (
        <View style={styles.tripCard}>
          <View style={styles.tripHeader}>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>Upcoming</Text>
            </View>
            <Text style={styles.tripDate}>{upcomingTrip.date}</Text>
          </View>
          
          <View style={styles.tripDetails}>
            <View>
              <Text style={styles.label}>Destination</Text>
              <Text style={styles.tripDest}>{upcomingTrip.destination}</Text>
            </View>
            <Ionicons name="airplane" size={28} color={COLORS.white} />
          </View>

          <View style={styles.divider} />

          <View style={styles.tripFooter}>
            <View style={styles.footerItem}>
              <Ionicons name="paw" size={16} color="rgba(255,255,255,0.9)" />
              <Text style={styles.footerText}> Traveling with {upcomingTrip.pet}</Text>
            </View>
            <View style={styles.footerItem}>
              <Ionicons name="briefcase" size={16} color="rgba(255,255,255,0.9)" />
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
        style={styles.primaryButton} 
        onPress={() => router.push('/add-trip')}
      >
        <Ionicons name="add-circle-outline" size={24} color={COLORS.white} />
        <Text style={styles.primaryButtonText}>Plan a New Trip</Text>
      </TouchableOpacity>

      {/* --- SECTION 3: QUICK ACTIONS (Vertical List) --- */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionList}>
        
        {/* 1. My Pets */}
        <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/(tabs)/pets')}>
          <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
            <Ionicons name="paw" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>My Pets</Text>
            <Text style={styles.actionSubtitle}>Manage profiles & health</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

        {/* 2. Regulations */}
        <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/(tabs)/regulations')}>
          <View style={[styles.iconCircle, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="document-text" size={24} color="#2E7D32" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Regulations</Text>
            <Text style={styles.actionSubtitle}>Check airline & country rules</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

        {/* 3. Pet Pass QR (Using the trip ID) */}
        <TouchableOpacity 
          style={[styles.actionRow, { borderBottomWidth: 0 }]} // No border for last item
          onPress={() => {
             // Safety check: Only go if a trip exists
             if(upcomingTrip?.id) router.push(`/qrcode/${upcomingTrip.id}`);
             else alert("No upcoming trip to show!");
          }}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#FFF3E0' }]}>
            <Ionicons name="qr-code" size={24} color="#EF6C00" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Pet Pass QR</Text>
            <Text style={styles.actionSubtitle}>Boarding pass for next trip</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  // Section Titles
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.textDark,
    marginBottom: 15,
    paddingRight: 5, // Prevent clipping
  },

  // Trip Card
  tripCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tagContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  tripDate: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  tripDest: {
    color: COLORS.white,
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    paddingRight: 10, // Prevent clipping
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 15,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    paddingRight: 5,
  },

  // Primary Button
  primaryButton: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
    paddingHorizontal: 5,
  },

  // --- NEW: Vertical List Styles ---
  actionList: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 10,
    // Soft Shadow for the whole list container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.textDark,
    paddingRight: 5, // Prevent clipping
  },
  actionSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.textLight,
    marginTop: 2,
  },
  
  // Empty State
  emptyStateCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.textLight,
  },
  emptyStateText: {
    color: COLORS.textLight,
    fontFamily: 'Poppins-Regular',
  }
});