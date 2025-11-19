import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
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
  border: '#E0E7ED',
};


const PARTNERS = [
  {
    title: "Airlines",
    icon: "airplane",
    logos: [
      { 
        id: 1, 
        name: "LATAM", 
        image: require('../../assets/images/latam.png'), 
        width: 100, height: 100 // <--- Adjust individually
      },    
      { 
        id: 2, 
        name: "Sky Airline", 
        image: require('../../assets/images/sky.png'), 
        width: 100, height: 100
      }, 
      { 
        id: 3, 
        name: "JetSMART", 
        image: require('../../assets/images/jetsmart.png'), 
        width: 150, height: 150
      }, 
    ]
  },
  {
    title: "Veterinary Clinics",
    icon: "medkit",
    logos: [
      { 
        id: 4, 
        name: "Hosp. Vet. U. Chile", 
        image: require('../../assets/images/uchile.png'), 
        width: 150, height: 100
      }, 
      { 
        id: 5, 
        name: "Clínica Alemana", 
        image: require('../../assets/images/alemana.png'), 
        width: 200, height: 200
      }, 
      { 
        id: 6, 
        name: "Dr. Pet", 
        image: require('../../assets/images/drpet.png'), 
        width: 220, height: 220
      }, 
    ]
  },
  {
    title: "Pet Relocation Agencies",
    icon: "map",
    logos: [
      { 
        id: 7, 
        name: "Pet Travel Chile", 
        image: require('../../assets/images/pettravel.png'), 
        width: 250, height: 200
      },
      { 
        id: 8, 
        name: "Animal Cargo", 
        image: require('../../assets/images/animalcargo.png'), 
        width: 120, height: 100
      },
    ]
  }
];

export default function Partners() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trusted Partners</Text>
        <Text style={styles.headerSubtitle}>Verified services for pet travel in Chile.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Banner */}
        <View style={styles.promoCard}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Partner with Pet Pass</Text>
            <Text style={styles.promoText}>Are you a local service in Santiago? Join our network.</Text>
          </View>
          <TouchableOpacity style={styles.joinButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>

        {/* Sections */}
        {PARTNERS.map((section, index) => (
          <View key={index} style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name={section.icon as any} size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>

            <View style={styles.gridContainer}>
              {section.logos.map((logo) => (
                <TouchableOpacity key={logo.id} style={styles.logoCard} activeOpacity={0.7}>
                  
                  {/* --- IMAGE RENDER WITH INDIVIDUAL SIZES --- */}
                  <View style={styles.logoContainer}>
                    <Image 
                      source={logo.image} 
                      style={{
                        width: logo.width,  // Uses the specific width from DATA
                        height: logo.height, // Uses the specific height from DATA
                        resizeMode: 'contain'
                      }} 
                    />
                  </View>
                  
                  <Text style={styles.logoName} numberOfLines={2}>{logo.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* --- CONTACT MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconCircle}>
              <Ionicons name="mail" size={32} color={COLORS.primary} />
            </View>
            <Text style={styles.modalTitle}>Contact Us</Text>
            <Text style={styles.modalText}>
              Interested in becoming a partner? Send us an email and we&apos;ll get back to you.
            </Text>
            <View style={styles.emailBox}>
              <Text style={styles.emailText}>partners@petpass.cl</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  promoCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
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
  promoContent: {
    flex: 1,
    paddingRight: 10,
  },
  promoTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  promoText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
  },
  joinButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  joinButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', 
    gap: 15,
  },
  logoCard: {
    backgroundColor: COLORS.cardBg,
    width: '30%', 
    minWidth: 100,
    aspectRatio: 1,
    borderRadius: 16,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  logoContainer: {
    width: '100%',
    height: 50, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  // NOTE: logoImage style removed from here because it's inline now
  logoName: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textGray,
    textAlign: 'center',
  },
  // --- MODAL STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textGray,
    textAlign: 'center',
    marginBottom: 20,
  },
  emailBox: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  emailText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  closeButton: {
    paddingVertical: 10,
  },
  closeButtonText: {
    color: COLORS.textGray,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
});