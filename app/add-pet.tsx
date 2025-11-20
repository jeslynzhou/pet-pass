import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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

const COLORS = {
  primary: '#0066CC',
  background: '#def4ff',
  cardBg: '#FFFFFF',
  textDark: '#1E293B',
  textGray: '#64748B',
  border: '#E0E7ED',
  danger: '#EF4444',
};

export default function CreatePetProfile() {
  const router = useRouter();

  // Form State
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');
  const [vaccines, setVaccines] = useState('');
  
  // Upload State
  const [petImage, setPetImage] = useState<string | null>(null);
  const [certFile, setCertFile] = useState<any | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setPetImage(result.assets[0].uri);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
      });
      if (!result.canceled) setCertFile(result.assets[0]);
    } catch (err) { console.log(err); }
  };

  const handleSave = () => {
    // VALIDATION REMOVED: You can now save empty forms
    console.log("Saving Pet:", { petName, imageUri: petImage });

    Alert.alert("Success", "Pet profile created!", [
      { text: "OK", onPress: () => router.replace('/(tabs)/home') }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.heroSection}>
          <Text style={styles.title}>Add Your Pet</Text>
          <Text style={styles.subtitle}>Tell us about your furry friend.</Text>
        </View>

        {/* --- 1. Pet Picture Upload (Optional) --- */}
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage} activeOpacity={0.8}>
            {petImage ? (
              <Image source={{ uri: petImage }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.placeholderContent}>
                <View style={styles.iconCircle}>
                  <Ionicons name="camera" size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.uploadText}>Add Photo</Text>
              </View>
            )}
            
            {petImage && (
              <View style={styles.editBadge}>
                <Ionicons name="pencil" size={12} color="#FFF" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* --- 2. Basic Info --- */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Coco"
            placeholderTextColor={COLORS.textGray}
            value={petName}
            onChangeText={setPetName}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Breed</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Retriever"
                placeholderTextColor={COLORS.textGray}
                value={breed}
                onChangeText={setBreed}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 25"
                placeholderTextColor={COLORS.textGray}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.label}>Height / Size</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Medium, 50cm tall"
            placeholderTextColor={COLORS.textGray}
            value={size}
            onChangeText={setSize}
          />
        </View>

        {/* --- 3. Health & Docs --- */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Special Needs</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any medication, anxiety, or disabilities?"
            placeholderTextColor={COLORS.textGray}
            value={specialNeeds}
            onChangeText={setSpecialNeeds}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Current Vaccines</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Rabies, DHLPP"
            placeholderTextColor={COLORS.textGray}
            value={vaccines}
            onChangeText={setVaccines}
          />

          <Text style={styles.label}>Birth Certificate / Pedigree</Text>
          <TouchableOpacity style={styles.fileUploadBox} onPress={pickDocument}>
             <Ionicons 
                name={certFile ? "document-text" : "cloud-upload-outline"} 
                size={24} 
                color={COLORS.primary} 
             />
             <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.fileNameText} numberOfLines={1}>
                  {certFile ? certFile.name : "Upload Document (PDF/Img)"}
                </Text>
                {certFile && <Text style={styles.changeFileText}>Tap to change</Text>}
             </View>
             {certFile && <Ionicons name="checkmark-circle" size={22} color="#10B981" />}
          </TouchableOpacity>
        </View>

        {/* --- Buttons --- */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addAnotherButton} onPress={() => {
            setPetName(''); setPetImage(null); setCertFile(null);
            Alert.alert("Saved!", "Ready for next pet.");
        }}>
          <Text style={styles.addAnotherText}>+ Save and Add Another Pet</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 50, 
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
  },
  backBtn: {
    paddingRight: 10, 
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  
  // HERO SECTION
  heroSection: {
    marginTop: 5, 
    marginBottom: 20,
  },
  title: {
    fontSize: 26, 
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.textGray,
  },
  
  // UPLOAD SECTION
  uploadSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  imageUploadBox: {
    width: 110, 
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.cardBg,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  placeholderContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editBadge: {
    position: 'absolute',
    bottom: 5,
    right: 25,
    backgroundColor: COLORS.primary,
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.cardBg,
  },
  iconCircle: {
    marginBottom: 4,
  },
  uploadText: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.primary,
  },

  // FORM ELEMENTS
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12, // Consistent height
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 16,
    color: COLORS.textDark,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },

  // FILE UPLOAD
  fileUploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  fileNameText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold', 
    color: COLORS.textDark,
  },
  changeFileText: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: COLORS.primary,
  },

  // BUTTONS
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: COLORS.cardBg,
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  addAnotherButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  addAnotherText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  }
});