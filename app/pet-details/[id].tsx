import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
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
  danger: '#EF4444',
  success: '#10B981',
};

// --- MOCK DATABASE ---
// In a real app, this would come from an API
const PET_DATABASE = [
  {
    id: '1', // Coco
    name: 'Coco',
    breed: 'Golden Retriever',
    weight: '28',
    size: 'Large',
    specialNeeds: 'Anxiety medication during flights.',
    vaccines: 'Rabies (Exp 2026), DHLPP',
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

export default function PetDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the ID passed from the previous screen

  // -- STATE --
  const [isEditing, setIsEditing] = useState(false);
  
  // Form Fields (Initialized empty, filled in useEffect)
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [needs, setNeeds] = useState('');
  const [vaccines, setVaccines] = useState('');
  const [image, setImage] = useState<any>(null);

  // Load Data on Mount
  useEffect(() => {
    const pet = PET_DATABASE.find(p => p.id === id);
    if (pet) {
      setName(pet.name);
      setBreed(pet.breed);
      setWeight(pet.weight);
      setSize(pet.size);
      setNeeds(pet.specialNeeds);
      setVaccines(pet.vaccines);
      setImage(pet.image);
    }
  }, [id]);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Profile Updated", "Your changes have been saved locally.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Profile' : 'Pet Portfolio'}</Text>
        
        <TouchableOpacity 
          style={styles.iconBtn} 
          onPress={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          <Text style={styles.headerActionText}>
            {isEditing ? 'Done' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* --- HERO IMAGE --- */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            {image ? (
              <Image source={image} style={styles.petImage} resizeMode="cover" />
            ) : (
               <View style={[styles.petImage, styles.placeholderImage]}>
                  <Ionicons name="paw" size={50} color={COLORS.primary} />
               </View>
            )}
            
            {/* Edit Icon overlay (only when editing) */}
            {isEditing && (
              <TouchableOpacity style={styles.editCameraBtn} onPress={() => Alert.alert("Change Photo", "Opens Image Picker")}>
                <Ionicons name="camera" size={20} color="#FFF" />
              </TouchableOpacity>
            )}
          </View>
          
          {!isEditing && <Text style={styles.heroName}>{name}</Text>}
        </View>

        {/* --- FORM FIELDS --- */}
        {/* We use the same inputs for View/Edit, but disable them when not editing */}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, isEditing && styles.editableInput]}
              value={name}
              onChangeText={setName}
              editable={isEditing}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Breed</Text>
              <TextInput
                style={[styles.input, isEditing && styles.editableInput]}
                value={breed}
                onChangeText={setBreed}
                editable={isEditing}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={[styles.input, isEditing && styles.editableInput]}
                value={weight}
                onChangeText={setWeight}
                editable={isEditing}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Size / Height</Text>
            <TextInput
              style={[styles.input, isEditing && styles.editableInput]}
              value={size}
              onChangeText={setSize}
              editable={isEditing}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health & Documents</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Special Needs</Text>
            <TextInput
              style={[styles.input, styles.textArea, isEditing && styles.editableInput]}
              value={needs}
              onChangeText={setNeeds}
              editable={isEditing}
              multiline
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vaccines</Text>
            <TextInput
              style={[styles.input, isEditing && styles.editableInput]}
              value={vaccines}
              onChangeText={setVaccines}
              editable={isEditing}
            />
          </View>

          {/* Document Download / View Mock */}
          <View style={styles.docCard}>
             <View style={styles.docIcon}>
                <Ionicons name="document-text" size={24} color={COLORS.primary} />
             </View>
             <View style={{flex: 1}}>
               <Text style={styles.docName}>Birth_Certificate.pdf</Text>
               <Text style={styles.docStatus}>Verified</Text>
             </View>
             <TouchableOpacity>
               <Ionicons name="eye-outline" size={24} color={COLORS.textGray} />
             </TouchableOpacity>
          </View>
        </View>

        {isEditing && (
           <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
             <Text style={styles.saveButtonText}>Save Changes</Text>
           </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
  },
  headerActionText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.primary,
  },
  iconBtn: {
    padding: 5,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },

  // HERO
  imageSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.cardBg,
  },
  placeholderImage: {
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroName: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
    marginTop: 15,
  },
  editCameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.background,
  },

  // SECTIONS
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.primary,
    marginBottom: 15,
  },
  
  // FORMS
  inputGroup: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  halfInput: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textGray,
    marginBottom: 5,
    marginLeft: 2,
  },
  input: {
    backgroundColor: 'transparent', // Transparent when not editing
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textDark,
  },
  editableInput: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1, // Reset border bottom
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: 'center',
  },

  // DOCS
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  docIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  docName: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
  },
  docStatus: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.success,
  },

  // BUTTON
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});