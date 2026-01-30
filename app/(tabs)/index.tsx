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

/* ================= STATIC DOTS ================= */
const StaticDots = () => (
  <View style={StyleSheet.absoluteFill}>
    {[...Array(8)].map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          { top: 70 + i * 18, left: 25 + i * 35 },
        ]}
      />
    ))}
  </View>
);

/* ================= MAIN SCREEN ================= */
export default function ProfileScreen() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("User_3839");
  const [showId, setShowId] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  /* ===== WHATSAPP DP CHOOSER ===== */
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
      {/* HEADER */}
      <LinearGradient colors={["#2E1065", "#4C1D95"]} style={styles.header}>
        <StaticDots />

        <View style={styles.headerTop}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
          <Text style={styles.headerTitle}>My Profile</Text>
          <Ionicons name="refresh" size={20} color="#fff" />
        </View>

        {/* PROFILE PIC */}
        <TouchableOpacity style={styles.avatar} onPress={openDPChooser}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImg} />
          ) : (
            <Ionicons name="person" size={46} color="#4C1D95" />
          )}
          <View style={styles.camera}>
            <Ionicons name="camera" size={14} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>UPSC Aspirant · Premium Member</Text>

        {/* PREMIUM BADGE */}
        <View style={styles.premiumWrap}>
          <View style={styles.premiumGoldCurve} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⭐ Premium Aspirant</Text>
          </View>
        </View>
      </LinearGradient>

      {/* ACCOUNT INFO */}
      <View style={styles.card}>
        <View style={styles.goldCurve} />

        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Account Information</Text>
          <TouchableOpacity onPress={() => setEdit(!edit)}>
            <Ionicons
              name={edit ? "checkmark" : "pencil"}
              size={18}
              color="#4C1D95"
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

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logout}>
        <MaterialIcons name="logout" size={18} color="#DC2626" />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { backgroundColor: "#F5F3FF" },

  header: {
    paddingTop: 50,
    paddingBottom: 105,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: "center",
    overflow: "hidden",
  },

  headerTop: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },

  avatar: {
    marginTop: 30,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#fff",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },

  avatarImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  camera: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#4C1D95",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  name: { color: "#fff", fontSize: 18, marginTop: 10 },
  role: { color: "#E9D5FF", fontSize: 13 },

  premiumWrap: { marginTop: 10, alignItems: "center" },

  premiumGoldCurve: {
    position: "absolute",
    top: 0,
    width: 170,
    height: 10,
    borderTopWidth: 2,
    borderColor: "#D4AF37",
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
  },

  badge: {
    backgroundColor: "#FACC15",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 18,
  },

  badgeText: { fontSize: 12, fontWeight: "600", color: "#5B3A00" },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 20,
    padding: 16,
    elevation: 4,
  },

  goldCurve: {
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

  reveal: { color: "#4C1D95", fontWeight: "500" },

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

  dot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
});
