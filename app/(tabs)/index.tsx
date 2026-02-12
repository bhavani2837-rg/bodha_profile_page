import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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

/* ================= ASSETS ================= */
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

  const [activeIndex, setActiveIndex] = useState(0);
  const [gsPressed, setGsPressed] = useState<null | "GS1" | "GS2">(null);

  /* ================= AUTO SLIDE ================= */

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
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();

    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") startAutoSlide();
      else stopAutoSlide();
    });

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

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          <Pressable
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconPressed,
            ]}
            onPress={() => console.log("Menu pressed")}
          >
            <Ionicons name="menu" size={22} color="#555" />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.profile,
              pressed && styles.iconPressed,
            ]}
            onPress={() => console.log("Profile pressed")}
          >
            <Ionicons name="person" size={22} color="#6A3EA1" />
          </Pressable>

        </View>

        {/* ================= LOGO ================= */}

        <View style={styles.logoSection}>
          <Image source={logoImg} style={styles.logoImage} />
          <Text style={styles.appName}>BODHA</Text>
          <Text style={styles.subTitle}>Civils Prep</Text>
          <Text style={styles.tagline}>Your Gateway to Success ✨</Text>
        </View>

        {/* ================= CAROUSEL ================= */}

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
            onTouchStart={stopAutoSlide}
            onTouchEnd={startAutoSlide}
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

        {/* ================= GS SECTION ================= */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>General Studies</Text>
          <Text style={styles.sectionSub}>Master the fundamentals</Text>
        </View>

        {/* ================= GS CARDS ================= */}

        <View style={styles.gsRow}>

          {/* GS1 */}
          <Pressable
            style={{ width: "48%", borderRadius: 22, overflow: "hidden" }}
            onPressIn={() => setGsPressed("GS1")}
            onPressOut={() => setGsPressed(null)}
            onPress={() => console.log("GS1 pressed")}
          >
            {({ pressed }) => (
              <LinearGradient
                colors={["#CFA8FF", "#9E7BFF"]}
                style={[
                  styles.gsBorder,
                  pressed && styles.glowPressedPurple,
                  pressed && styles.scalePressed,
                  gsPressed === "GS1" && { opacity: 0.75 },
                ]}
              >
                <ImageBackground
                  source={gs1Bg}
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

                      <View style={styles.topicPillPurple}>
                        <MaterialIcons
                          name="library-books"
                          size={12}
                          color="#6A3EA1"
                        />
                        <Text style={styles.topicTextPurple}>14 Topics</Text>
                      </View>

                      <View style={styles.arrowPurple}>
                        <Ionicons
                          name="arrow-forward"
                          size={18}
                          color="#fff"
                        />
                      </View>

                    </View>

                  </View>
                </ImageBackground>
              </LinearGradient>
            )}
          </Pressable>

          {/* GS2 */}
          <Pressable
            style={{ width: "48%", borderRadius: 22, overflow: "hidden" }}
            onPressIn={() => setGsPressed("GS2")}
            onPressOut={() => setGsPressed(null)}
            onPress={() => console.log("GS2 pressed")}
          >
            {({ pressed }) => (
              <LinearGradient
                colors={["#A7C7FF", "#6EA8FF"]}
                style={[
                  styles.gsBorder,
                  pressed && styles.glowPressedBlue,
                  pressed && styles.scalePressed,
                  gsPressed === "GS2" && { opacity: 0.75 },
                ]}
              >
                <ImageBackground
                  source={gs2Bg}
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
                      <View style={styles.topicPillBlue}>
                        <MaterialIcons
                          name="library-books"
                          size={12}
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

      {/* ================= SECURITY ================= */}

      <View style={styles.securityBottom}>
        <Ionicons name="checkmark-circle" size={18} color="#2E9E5B" />
        <Text style={styles.securityText}>
          Secure & Encrypted Login
        </Text>
      </View>

      {/* ================= BOTTOM NAV ================= */}

      <View style={styles.bottomNav}>

        <Pressable
          style={({ pressed }) => [
            pressed && styles.scalePressed,
          ]}
          onPress={() => console.log("Home pressed")}
        >
          <Ionicons name="home" size={24} color="#6A3EA1" />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            pressed && styles.scalePressed,
          ]}
          onPress={() => console.log("Message pressed")}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#AAA" />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            pressed && styles.scalePressed,
          ]}
          onPress={() => console.log("Star pressed")}
        >
          <Ionicons name="star" size={24} color="#FFA726" />
        </Pressable>

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

  iconButton: {
    backgroundColor: "#fef7f7",
    padding: 10,
    borderRadius: 14,
  },

  profile: {
    backgroundColor: "#f9f8fb",
    padding: 10,
    borderRadius: 50,
  },

  iconPressed: {
    transform: [{ scale: 0.9 }],
  },

  scalePressed: {
    transform: [{ scale: 0.96 }],
  },

  logoSection: {
    alignItems: "center",
    marginVertical: 24,
  },

  logoImage: {
    width: 90,
    height: 95,
    resizeMode: "contain",
  },

  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#911ad2",
  },

  subTitle: {
    fontSize: 16,
    color: "#6A3EA1",
    fontWeight: "600",
  },

  tagline: {
    fontSize: 13,
    color: "#888",
  },

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

  bannerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  bannerSub: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    marginTop: 4,
  },

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

  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 40,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  sectionSub: {
    fontSize: 13,
    color: "#777",
  },

  gsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 14,
  },

  gsBorder: {
    borderRadius: 22,
    padding: 3,
  },

  gsCard: {
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
  },

  gsContent: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },

  gsIconTile: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  gsInnerLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    transform: [{ scale: 2.5 }],
  },

  gsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  gsSub: {
    fontSize: 13,
    color: "#666",
  },

  gsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  glowPressedPurple: {
    elevation: 14,
  },

  glowPressedBlue: {
    elevation: 14,
  },

  securityBottom: {
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  securityText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#555",
  },

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
