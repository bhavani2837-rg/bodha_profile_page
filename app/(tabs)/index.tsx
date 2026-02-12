import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // home screen updated

import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  AppState,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const logoImg = require("../../assets/bodha_logo.png");
const gs1Icon = require("../../assets/gs1_icon.png");
const gs2Icon = require("../../assets/gs2_icon.png");
const gs1Bg = require("../../assets/gs1_bg.png");
const gs2Bg = require("../../assets/gs2_bg.png");


/* ================= BANNER DATA ================= */
const banners = [
  {
    title: "Daily Study Goals",
    subtitle: "Stay consistent, achieve greatness",
    icon: "book",
    iconBg: ["#FF9A8B", "#FF6A88"] as const,
  },
  {
    title: "UPSC Daily Quiz",
    subtitle: "Test your knowledge every day",
    icon: "clipboard",
    iconBg: ["#6EC6FF", "#4D9CFF"] as const,
  },
  {
    title: "Answer Writing Practice",
    subtitle: "Improve speed & clarity",
    icon: "create",
    iconBg: ["#7BE495", "#56C596"] as const,
  },
];


export default function App() {
  const { width } = Dimensions.get("window");
  const CARD_WIDTH = width - 48;
  const SPACING = 16;

  const scrollRef = useRef<ScrollView>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

;
  const [activeIndex, setActiveIndex] = useState(0);

  /* ===== BLINK STATE (ADDED) ===== */
  const [gsPressed, setGsPressed] = useState<null | "GS1" | "GS2">(null);

  /* ===== Auto slide ===== */
  const startAutoSlide = () => {
  stopAutoSlide();
  intervalRef.current = setInterval(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % banners.length;
      scrollRef.current?.scrollTo({
        x: next * (CARD_WIDTH + SPACING),
        animated: true,
      });
      return next;
    });
  }, 3000);
};

const stopAutoSlide = () => {
  if (intervalRef.current !== null) {
    clearInterval(intervalRef.current);
  }
  intervalRef.current = null;
};


  useEffect(() => {
    startAutoSlide();
    const sub = AppState.addEventListener("change", (s) =>
      s === "active" ? startAutoSlide() : stopAutoSlide()
    );
    return () => {
      stopAutoSlide();
      sub.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f2e8fd" }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <StatusBar barStyle="dark-content" />

        {/* ===== Header ===== */}
        <View style={styles.header}>
          <View style={styles.iconButton}>
            <Ionicons name="menu" size={22} color="#555" />
          </View>
          <View style={styles.profile}>
            <Ionicons name="person" size={22} color="#6A3EA1" />
          </View>
        </View>

        {/* ===== Logo ===== */}
        <View style={styles.logoSection}>
          <Image source={logoImg} style={styles.logoImage} />
          <Text style={styles.appName}>BODHA</Text>
          <Text style={styles.subTitle}>Civils Prep</Text>
          <Text style={styles.tagline}>Your Gateway to Success ✨</Text>
        </View>

        {/* ===== CAROUSEL ===== */}
        <View style={{ marginVertical: 10 }}>
          <ScrollView
            ref={scrollRef}
            horizontal
            snapToInterval={CARD_WIDTH + SPACING}
            decelerationRate="fast"
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: (width - CARD_WIDTH) / 2,
            }}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x /
                  (CARD_WIDTH + SPACING)
              );
              setActiveIndex(index);
            }}
          >
            {banners.map((item, index) => (
              <LinearGradient
                key={index}
                colors={["#3A247B", "#5A3FA8", "#4C6EDB"]}
                style={[
                  styles.banner,
                  { width: CARD_WIDTH, marginRight: SPACING },
                ]}
              >
                <LinearGradient colors={item.iconBg} style={styles.bannerIcon}>
                  <Ionicons name={item.icon as any} size={30} color="#fff" />
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bannerTitle}>{item.title}</Text>
                  <Text style={styles.bannerSub}>{item.subtitle}</Text>
                </View>
              </LinearGradient>
            ))}
          </ScrollView>

          <View style={styles.dotsContainer}>
            {banners.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  activeIndex === i && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* ===== Section Header ===== */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>General Studies</Text>
          <Text style={styles.sectionSub}>Master the fundamentals</Text>
        </View>

        {/* ===== GS CARDS ===== */}
        <View style={styles.gsRow}>
          {/* GS 1 */}
          <Pressable
            style={{ width: "48%", borderRadius: 22, overflow: "hidden" }}
            android_ripple={{ color: "rgba(0,0,0,0.08)", borderless: false }}
            onPressIn={() => setGsPressed("GS1")}
            onPressOut={() => setGsPressed(null)}
          >
            {({ pressed }) => (
              <LinearGradient
                colors={["#CFA8FF", "#9E7BFF"]}
                style={[
                  styles.gsBorder,
                  pressed && styles.glowPressedPurple,
                  gsPressed === "GS1" && { opacity: 0.75 },
                ]}
              >
                <ImageBackground
                  source={gs1Bg}
                  resizeMode="cover"
                  style={styles.gsCard}
                  imageStyle={{ borderRadius: 20 }}
                >
                  <View style={styles.gsContent}>
                    <View style={styles.gsIconTile}>
                      <Image source={gs1Icon} style={styles.gsInnerLogo} />
                    </View>

                    <View>
                      <Text style={styles.gsTitle}>GS 1</Text>
                      <Text style={styles.gsSub}>History & Culture</Text>
                    </View>

                    <View style={styles.gsFooter}>
                      <View style={[styles.topicPillPurple, styles.topicPillOffset]}>

                        <MaterialIcons
                          name="library-books"
                          size={10}
                          color="#6A3EA1"
                        />
                        <Text style={styles.topicTextPurple}>14 Topics</Text>
                      </View>
                      <View style={styles.arrowPurple}>
                        <Ionicons name="arrow-forward" size={18} color="#fff" />
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </LinearGradient>
            )}
          </Pressable>

          {/* GS 2 */}
          <Pressable
            style={{ width: "48%", borderRadius: 22, overflow: "hidden" }}
            android_ripple={{ color: "rgba(0,0,0,0.08)", borderless: false }}
            onPressIn={() => setGsPressed("GS2")}
            onPressOut={() => setGsPressed(null)}
          >
            {({ pressed }) => (
              <LinearGradient
                colors={["#A7C7FF", "#6EA8FF"]}
                style={[
                  styles.gsBorder,
                  pressed && styles.glowPressedBlue,
                  gsPressed === "GS2" && { opacity: 0.75 },
                ]}
              >
                <ImageBackground
                  source={gs2Bg}
                  resizeMode="cover"
                  style={styles.gsCard}
                  imageStyle={{ borderRadius: 20 }}
                >
                  <View style={styles.gsContent}>
                    <View style={styles.gsIconTile}>
                      <Image source={gs2Icon} style={styles.gsInnerLogo} />
                    </View>

                    <View>
                      <Text style={styles.gsTitle}>GS 2</Text>
                      <Text style={styles.gsSub}>Polity & Governance</Text>
                    </View>

                    <View style={styles.gsFooter}>
                      <View style={[styles.topicPillBlue, styles.topicPillOffset]}>
                        <MaterialIcons
                          name="library-books"
                          size={10}
                          color="#3B6EDC"
                        />
                        <Text style={styles.topicTextBlue}>21 Topics</Text>
                      </View>
                      <View style={styles.arrowBlue}>
                        <Ionicons name="arrow-forward" size={18} color="#fff" />
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </LinearGradient>
            )}
          </Pressable>
        </View>
      </ScrollView>

      {/* ===== Security Footer ===== */}
      <View style={styles.securityBottom}>
        <Ionicons name="checkmark-circle" size={18} color="#2E9E5B" />
        <Text style={styles.securityText}>Secure & Encrypted Login</Text>
      </View>

      {/* ===== Bottom Nav ===== */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="#6A3EA1" />
        <Ionicons name="chatbubble-outline" size={24} color="#AAA" />
        <Ionicons name="star" size={24} color="#FFA726" />
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    marginTop: 40,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconButton: { backgroundColor: "#fef7f7", padding: 10, borderRadius: 14 },
  profile: { backgroundColor: "#f9f8fb", padding: 10, borderRadius: 50 },

  logoSection: { alignItems: "center", marginVertical: 24 },
  logoImage: { width: 90, height: 95, resizeMode: "contain" },

  appName: { fontSize: 28, fontWeight: "700", color: "#911ad2" },
  subTitle: { fontSize: 16, color: "#6A3EA1", fontWeight: "600" },
  tagline: { fontSize: 13, color: "#888" },

  banner: {
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderRadius: 36,
    flexDirection: "row",
    alignItems: "center",
  },

  bannerIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },

  bannerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  bannerSub: { color: "rgba(255,255,255,0.85)", fontSize: 13, marginTop: 4 },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -14,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    opacity: 0.5,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 22,
    height: 6,
    borderRadius: 6,
    opacity: 1,
  },

  sectionHeader: { paddingHorizontal: 20, marginTop: 40 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#333" },
  sectionSub: { fontSize: 13, color: "#777" },

  gsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 14,
  },

  gsBorder: { borderRadius: 22, padding: 3 },

  glowPressedPurple: {
    shadowColor: "#9E7BFF",
    shadowOpacity: 0.9,
    shadowRadius: 18,
    elevation: 14,
  },

  glowPressedBlue: {
    shadowColor: "#6EA8FF",
    shadowOpacity: 0.9,
    shadowRadius: 18,
    elevation: 14,
  },

  /* 🔧 CARD HEIGHT ADJUSTED */
  gsCard: { height: 180, borderRadius: 20, overflow: "hidden" },

  /* 🔧 INNER SPACING REBALANCED */
  gsContent: {
    flex: 1,
    padding: 16,
    paddingTop: 18,
    paddingBottom: 12,
    justifyContent: "space-between",
  },

  /* 🔧 ICON TILE SIZE + POSITION */
  gsIconTile: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  /* 🔧 ICON SCALE MATCHED */
  gsInnerLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    transform: [{ scale: 2.5 }],
  },

  gsTitle: { fontSize: 18, fontWeight: "700", color: "#333" },
  gsSub: { fontSize: 13, color: "#666", marginTop: 2 },

  /* 🔧 FOOTER MICRO-ALIGN */
  gsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },

  topicPillPurple: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1E9FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },

  topicPillBlue: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9F1FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  topicPillOffset: {
  marginLeft: -9, // 👈 change value if needed
},


  topicTextPurple: {
    marginLeft: 6,
    fontWeight: "600",
    color: "#6A3EA1",
  },
  topicTextBlue: {
    marginLeft: 6,
    fontWeight: "600",
    color: "#3B6EDC",
  },

  arrowPurple: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#9E7BFF",
    justifyContent: "center",
    alignItems: "center",
  },

  arrowBlue: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#6EA8FF",
    justifyContent: "center",
    alignItems: "center",
  },

  securityBottom: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  securityText: { marginLeft: 6, fontSize: 13, color: "#555" },

  bottomNav: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderRadius: 20,
  },
});
