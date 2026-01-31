import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("User_3839");
  const [showId, setShowId] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  /* ================= IMAGE PICKER ================= */
  const openDPChooser = () => {
    Alert.alert("Profile Photo", "Choose an option", [
      { text: "Camera", onPress: openCamera },
      { text: "Gallery", onPress: openGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) setAvatar(result.assets[0].uri);
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) setAvatar(result.assets[0].uri);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ================= HEADER ================= */}
      <LinearGradient
        colors={["#5A1E8A", "#7A3DB5", "#9A5FD0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.waveBack} />
        <View style={styles.waveMid} />
        <View style={styles.waveFront} />
        <View style={styles.goldCurveBottom} />

        <View style={styles.headerTop}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
          <Text style={styles.headerTitle}>My Profile</Text>
          <Ionicons name="refresh" size={22} color="#fff" />
        </View>

        {/* ===== SINGLE BORDER PROFILE PHOTO ===== */}
        <View style={styles.avatarBorder}>
          <TouchableOpacity style={styles.avatar} onPress={openDPChooser}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={46} color="#CBD5E1" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={openDPChooser}
          >
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>UPSC Aspirant · Premium Member</Text>
      </LinearGradient>

      {/* ================= PREMIUM BADGE ================= */}
      <View style={styles.premiumSection}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>⭐ Premium Aspirant</Text>
        </View>
      </View>

      {/* ================= ACCOUNT INFORMATION ================= */}
      <View style={styles.card}>
        <View style={styles.goldCurveTop} />

        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Account Information</Text>
          <TouchableOpacity onPress={() => setEdit(!edit)}>
            <Ionicons
              name={edit ? "checkmark" : "pencil"}
              size={18}
              color="#6D28D9"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>FULL NAME</Text>
          {edit ? (
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>{name}</Text>
          )}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>MOBILE NUMBER</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.value}>7024913839</Text>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color="#22C55E"
              style={{ marginLeft: 6 }}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>OFFICIAL BODHA ID</Text>
          <TouchableOpacity onPress={() => setShowId(!showId)}>
            <Text style={styles.reveal}>
              {showId ? "BODHA-UPSC-83921" : "Tap to Reveal"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= SUBSCRIPTION STATUS ================= */}
      <View style={styles.card}>
        <View style={styles.goldCurveTop} />

        <View style={styles.subHeader}>
          <Text style={styles.cardTitle}>Subscription Status</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>ACTIVE</Text>
          </View>
        </View>

        <LinearGradient
          colors={["#047857", "#059669"]}
          style={styles.planCard}
        >
          <View style={styles.planRow}>
            <Text style={styles.planLabel}>YOUR PLAN</Text>
            <View style={styles.planActive}>
              <Text style={styles.planActiveText}>ACTIVE</Text>
            </View>
          </View>

          <Text style={styles.planName}>
            Bodha Premium (UPSC Mode)
          </Text>
        </LinearGradient>

        {[
          "Structured PYQ-based Preparation",
          "Anthropology / GS Smart Evaluation",
          "Daily Discipline & Progress Tracking",
          "Priority Mentor Support",
        ].map((t, i) => (
          <View key={i} style={styles.benefitRow}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.benefitText}>{t}</Text>
          </View>
        ))}
      </View>

      {/* ================= LOGOUT ================= */}
      <TouchableOpacity style={styles.logout}>
        <MaterialIcons name="logout" size={18} color="#DC2626" />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Bodha Civils Prep</Text>
      <Text style={styles.footerSub}>
        Serious Preparation. Structured Results.
      </Text>
    </ScrollView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { backgroundColor: "#F5F3FF" },

  header: {
    paddingTop: 50,
    paddingBottom: 100,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: "hidden",
    alignItems: "center",
  },

  waveBack: {
    position: "absolute",
    bottom: 60,
    left: -120,
    width: width + 240,
    height: 200,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderTopLeftRadius: 400,
    borderTopRightRadius: 400,
  },

  waveMid: {
    position: "absolute",
    bottom: 30,
    left: -100,
    width: width + 200,
    height: 180,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderTopLeftRadius: 380,
    borderTopRightRadius: 380,
  },

  waveFront: {
    position: "absolute",
    bottom: 10,
    left: -80,
    width: width + 160,
    height: 160,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderTopLeftRadius: 360,
    borderTopRightRadius: 360,
  },

  goldCurveBottom: {
    position: "absolute",
    bottom: 0,
    left: -40,
    width: width + 80,
    height: 6,
    backgroundColor: "#D4AF37",
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
  },

  headerTop: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },

  /* ===== SINGLE BORDER AVATAR ===== */
  avatarBorder: {
    marginTop: 28,
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    borderColor: "#E9D5FF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#fff",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarImg: { width: "100%", height: "100%", resizeMode: "cover" },

  cameraButton: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#6D28D9",
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  name: { color: "#fff", fontSize: 18, marginTop: 12 },
  role: { color: "#E9D5FF", fontSize: 13 },

  premiumSection: { alignItems: "center", marginTop: -18 },

  badge: {
    backgroundColor: "#FDE68A",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 18,
  },

  badgeText: { fontSize: 12, fontWeight: "600", color: "#92400E" },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 20,
    padding: 16,
    elevation: 4,
  },

  goldCurveTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 14,
    borderTopWidth: 2,
    borderColor: "#D4AF37",
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  cardTitle: { fontWeight: "600" },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },

  label: { color: "#6B7280", fontSize: 12 },
  value: { fontWeight: "500" },

  input: {
    borderBottomWidth: 1,
    borderColor: "#C4B5FD",
    minWidth: 160,
    textAlign: "right",
  },

  reveal: { color: "#6D28D9", fontWeight: "500" },

  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  activeBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  activeText: { color: "#92400E", fontSize: 11, fontWeight: "600" },

  planCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },

  planRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  planLabel: { color: "#ECFDF5", fontSize: 11 },

  planActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  planActiveText: { color: "#ECFDF5", fontSize: 11 },

  planName: {
    color: "#ECFDF5",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
  },

  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  benefitText: {
    marginLeft: 8,
    color: "#374151",
    fontSize: 13,
  },

  logout: {
    marginTop: 30,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 20,
  },

  logoutText: { color: "#DC2626", marginLeft: 6 },

  footer: {
    textAlign: "center",
    marginTop: 22,
    fontWeight: "600",
    color: "#2563EB",
  },

  footerSub: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 30,
    fontSize: 12,
  },
});
