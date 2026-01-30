import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function ProfileScreen() {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient
        colors={["#2E6CF6", "#4A8CFF"]}
        style={styles.header}
      >
        {/* White dots overlay */}
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
          {Array.from({ length: 120 }).map((_, i) => (
            <Circle
              key={i}
              cx={Math.random() * 400}
              cy={Math.random() * 300}
              r="1.2"
              fill="rgba(255,255,255,0.25)"
            />
          ))}
        </Svg>

        <Ionicons name="arrow-back" size={22} color="#fff" style={styles.back} />
        <Text style={styles.title}>My Profile</Text>

        {/* Profile Image */}
        <View style={styles.avatarWrapper}>
          <Image
            source={require("../assets/user.png")} // dummy avatar
            style={styles.avatar}
          />
          <View style={styles.camera}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </View>

        <Text style={styles.username}>User_3839</Text>
        <Text style={styles.subText}>UPSC Aspirant · Premium Member</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>⭐ Premium Aspirant</Text>
        </View>
      </LinearGradient>

      {/* ACCOUNT INFO */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account Information</Text>

        <View style={styles.row}>
          <Ionicons name="call" size={20} color="#2E6CF6" />
          <Text style={styles.rowText}>7024913839</Text>
          <Ionicons name="checkmark-circle" size={20} color="green" />
        </View>

        <View style={styles.row}>
          <MaterialIcons name="email" size={20} color="#2E6CF6" />
          <Text style={styles.rowText}>Official Bodha ID</Text>
          <Text style={styles.reveal}>Tap to Reveal</Text>
        </View>
      </View>

      {/* SUBSCRIPTION */}
      <View style={styles.card}>
        <View style={styles.subHeader}>
          <Text style={styles.cardTitle}>Subscription Status</Text>
          <Text style={styles.active}>ACTIVE</Text>
        </View>

        <View style={styles.plan}>
          <Text style={styles.planTitle}>Bodha Premium (UPSC Mode)</Text>

          {[
            "Structured PYQ-based Preparation",
            "Anthropology / GS Smart Evaluation",
            "Daily Discipline & Progress Tracking",
            "Priority Mentor Support",
          ].map((item, i) => (
            <View key={i} style={styles.point}>
              <Ionicons name="checkmark-circle" size={18} color="#1BA672" />
              <Text style={styles.pointText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* SIGN OUT */}
      <TouchableOpacity style={styles.logout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Bodha Civils Prep{"\n"}
        <Text style={{ fontSize: 12, color: "#888" }}>
          Serious Preparation. Structured Results.
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  back: { position: "absolute", top: 60, left: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "600" },

  avatarWrapper: {
    marginTop: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EAF0FF",
  },
  camera: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2E6CF6",
    padding: 6,
    borderRadius: 15,
  },

  username: { color: "#fff", fontSize: 18, fontWeight: "600", marginTop: 10 },
  subText: { color: "#EAF0FF", fontSize: 13 },

  badge: {
    backgroundColor: "#FFD36A",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  badgeText: { fontWeight: "600" },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  rowText: { flex: 1, marginLeft: 10 },
  reveal: { color: "#2E6CF6" },

  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  active: {
    color: "#1BA672",
    fontWeight: "600",
  },

  plan: {
    backgroundColor: "#E9FFF5",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  planTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  point: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  pointText: { marginLeft: 8 },

  logout: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#FF5A5A",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  logoutText: { color: "#FF5A5A", fontWeight: "600" },

  footer: {
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "600",
    color: "#2E6CF6",
  },
});
