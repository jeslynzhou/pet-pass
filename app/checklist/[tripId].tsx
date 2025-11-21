import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
  success: "#10B981", // Green
  warning: "#F59E0B", // Orange
  border: "#E0E7ED",
};

// --- INITIAL DATA ---
const INITIAL_CHECKLIST = [
  {
    id: "1",
    title: "Rabies Vaccination",
    desc: "Must be valid at least 28 days before travel.",
    status: "verified",
    type: "doc",
    fileName: "rabies_cert_coco.pdf",
  },
  {
    id: "2",
    title: "SAG Export Certificate",
    desc: "Issued by SAG Chile within 10 days of flight.",
    status: "pending",
    type: "doc",
    fileName: null,
  },
  {
    id: "3",
    title: "CDC Dog Import Form",
    desc: "Required for entry into the USA.",
    status: "pending",
    type: "doc",
    fileName: null,
  },
  {
    id: "4",
    title: "Airline Carrier Check",
    desc: "Photo of pet standing inside the carrier.",
    status: "pending",
    type: "photo",
    fileName: null,
  },
];

export default function Checklist() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();

  const [items, setItems] = useState(INITIAL_CHECKLIST);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Calculate Progress
  const completedCount = items.filter((i) => i.status === "verified").length;
  const totalCount = items.length;
  const progress = completedCount / totalCount;
  const isAllComplete = completedCount === totalCount;

  // --- HANDLE FILE PICKING & MOCK UPLOAD ---
  const handleAction = async (id: string, type: string) => {
    setLoadingId(id); // Start spinner

    try {
      let fileResult: any = null;

      // 1. Open the Real Picker
      if (type === "photo") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        if (!result.canceled) fileResult = result.assets[0];
      } else {
        const result = await DocumentPicker.getDocumentAsync({
          type: ["application/pdf", "image/*"],
          copyToCacheDirectory: true,
        });
        if (!result.canceled) fileResult = result.assets[0];
      }

      // 2. If user picked something, Mark as Complete
      if (fileResult) {
        // Small fake delay to feel like "Uploading..."
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Update State
        setItems((prevItems) =>
          prevItems.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                status: "verified",
                fileName: fileResult.name || "uploaded_doc.pdf", // Use real name or fallback
              };
            }
            return item;
          })
        );

        // 3. SHOW THE REQUESTED ALERT
        Alert.alert(
          "Submission Received",
          "Documents are ready. We will email you regarding the updates."
        );
      }
    } catch (error) {
      console.log(error); // Silent fail or log
    } finally {
      setLoadingId(null); // Stop spinner
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trip Checklist</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Route Card */}
          <View style={styles.routeCard}>
            <View style={styles.routeRow}>
              <View>
                <Text style={styles.airportCode}>SCL</Text>
                <Text style={styles.city}>Santiago</Text>
              </View>
              <Ionicons name="airplane" size={20} color={COLORS.primary} />
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.airportCode}>JFK</Text>
                <Text style={styles.city}>New York</Text>
              </View>
            </View>

            {/* Progress */}
            <View style={styles.progressContainer}>
              <View style={styles.progressTextRow}>
                <Text style={styles.progressLabel}>Completion</Text>
                <Text style={styles.progressValue}>
                  {Math.round(progress * 100)}%
                </Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${progress * 100}%` }]} />
              </View>
            </View>
          </View>

          {/* Checklist Items */}
          <Text style={styles.sectionTitle}>Requirements</Text>

          {items.map((item) => (
            <View key={item.id} style={styles.card}>
              {/* Icon Box */}
              <View
                style={[
                  styles.iconBox,
                  item.status === "verified"
                    ? { backgroundColor: "#DCFCE7" }
                    : { backgroundColor: "#F1F5F9" },
                ]}
              >
                <Ionicons
                  name={item.type === "photo" ? "camera" : "document-text"}
                  size={24}
                  color={
                    item.status === "verified"
                      ? COLORS.success
                      : COLORS.textGray
                  }
                />
              </View>

              {/* Text Content */}
              <View style={styles.cardContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>

                {/* Show filename if verified */}
                {item.status === "verified" && item.fileName && (
                  <View style={styles.fileBadge}>
                    <Ionicons name="attach" size={12} color={COLORS.textGray} />
                    <Text style={styles.fileName} numberOfLines={1}>
                      {item.fileName}
                    </Text>
                  </View>
                )}
              </View>

              {/* Action Button */}
              <View style={styles.actionArea}>
                {item.status === "verified" ? (
                  <View style={styles.verifiedBadge}>
                    <Ionicons
                      name="checkmark-circle"
                      size={28}
                      color={COLORS.success}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => handleAction(item.id, item.type)}
                    disabled={loadingId !== null}
                  >
                    {loadingId === item.id ? (
                      <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                      <Text style={styles.uploadText}>Upload</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          {/* Success Banner (Shows when 100%) */}
          {isAllComplete && (
            <View style={styles.successBanner}>
              <Ionicons name="checkmark-circle" size={32} color="#FFF" />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.successTitle}>Ready to Fly!</Text>
                <Text style={styles.successText}>All documents verified.</Text>
              </View>
            </View>
          )}
        </ScrollView>
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
  routeCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 25,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  routeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  airportCode: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
  },
  city: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textGray,
  },
  progressContainer: {
    marginTop: 5,
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textGray,
  },
  progressValue: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.primary,
  },
  track: {
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginBottom: 15,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textGray,
    lineHeight: 14,
  },
  fileBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  fileName: {
    fontSize: 10,
    fontFamily: "Poppins_400Regular",
    color: COLORS.textGray,
    marginLeft: 4,
    maxWidth: 120, // Prevent long filenames from breaking layout
  },
  actionArea: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  uploadText: {
    color: "#FFF",
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  verifiedBadge: {
    justifyContent: "center",
    alignItems: "center",
  },
  successBanner: {
    backgroundColor: COLORS.success,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  successTitle: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  successText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
});
