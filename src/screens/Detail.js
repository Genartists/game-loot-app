import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { loadDetail } from "../store/giveawaysSlice";
import ClaimModal from "../modals/ClaimModal";
import Spinner from "../components/Spinner";

const { width } = Dimensions.get("window");

const Detail = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { detail, loading, error } = useSelector((state) => state.giveaways);
  const { id, title } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(loadDetail(id));
    }
  }, [dispatch, id]);

  const handleClaimPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Spinner size={32} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>
          Loading giveaway details...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.errorContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Ionicons
          name="alert-circle-outline"
          size={64}
          color={theme.colors.error}
        />
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Error loading giveaway
        </Text>
        <Text
          style={[styles.errorSubtext, { color: theme.colors.textSecondary }]}
        >
          {error}
        </Text>
      </View>
    );
  }

  if (!detail) {
    return (
      <View
        style={[
          styles.emptyContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Ionicons
          name="game-controller-outline"
          size={64}
          color={theme.colors.textTertiary}
        />
        <Text style={[styles.emptyText, { color: theme.colors.text }]}>
          No giveaway details found
        </Text>
      </View>
    );
  }

  const getPlatformText = () => {
    if (detail.platforms) {
      return Array.isArray(detail.platforms)
        ? detail.platforms.join(", ")
        : detail.platforms;
    }
    return detail.platform || "Unknown";
  };

  const getDescription = () => {
    return (
      detail.description ||
      detail.short_description ||
      "No description available"
    );
  };

  const getWorthText = () => {
    if (detail.worth) {
      return detail.worth;
    }
    if (detail.worth_approx) {
      return `~${detail.worth_approx}`;
    }
    return "Unknown";
  };

  const getEndDateText = () => {
    if (detail.end_date) {
      try {
        const date = new Date(detail.end_date);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }
      } catch (e) {
        console.error(e); // If parsing fails, return the original string
      }
      return detail.end_date;
    }
    if (detail.end_date_approx) {
      return `~${detail.end_date_approx}`;
    }
    return "No end date specified";
  };

  const formatWorth = (worth) => {
    if (typeof worth === "string" && worth.includes("$")) {
      return worth;
    }
    if (typeof worth === "number") {
      return `$${worth.toLocaleString()}`;
    }
    if (typeof worth === "string") {
      return `$${worth}`;
    }
    return worth;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top"]}
    >
      <StatusBar
        barStyle={theme.colors.statusBarContent}
        backgroundColor={theme.colors.statusBar}
      />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with Thumbnail */}
        <View style={styles.heroSection}>
          {detail.thumbnail && (
            <Image
              source={{ uri: detail.thumbnail }}
              style={styles.thumbnail}
            />
          )}
          <View
            style={[styles.heroOverlay, { backgroundColor: "rgba(0,0,0,0.6)" }]}
          >
            <View style={styles.heroContent}>
              <Text
                style={[styles.heroTitle, { color: theme.colors.text }]}
                numberOfLines={3}
              >
                {detail.title}
              </Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Quick Info Cards */}
          <View style={styles.infoGrid}>
            <View
              style={[
                styles.infoCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name="desktop"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Platform
              </Text>
              <Text
                style={[styles.infoValue, { color: theme.colors.text }]}
                numberOfLines={2}
              >
                {getPlatformText()}
              </Text>
            </View>

            <View
              style={[
                styles.infoCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name="cash"
                  size={20}
                  color={theme.colors.secondary}
                />
              </View>
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Worth
              </Text>
              <Text
                style={[styles.worthValue, { color: theme.colors.secondary }]}
              >
                ${formatWorth(getWorthText())}
              </Text>
            </View>

            <View
              style={[
                styles.infoCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name="calendar"
                  size={20}
                  color={theme.colors.warning}
                />
              </View>
              <Text
                style={[
                  styles.infoLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                End Date
              </Text>
              <Text
                style={[styles.infoValue, { color: theme.colors.text }]}
                numberOfLines={2}
              >
                {getEndDateText()}
              </Text>
            </View>
          </View>

          {/* Description Section */}
          <View
            style={[
              styles.section,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Ionicons
                name="document-text"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Description
              </Text>
            </View>
            <View style={styles.sectionContent}>
              <Text
                style={[
                  styles.descriptionText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {getDescription()}
              </Text>
            </View>
          </View>

          {/* Instructions Section (if available) */}
          {detail.instructions && (
            <View
              style={[
                styles.section,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.sectionHeader}>
                <Ionicons name="list" size={24} color={theme.colors.primary} />
                <Text
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  How to Claim
                </Text>
              </View>
              <View style={styles.sectionContent}>
                <Text
                  style={[
                    styles.instructionsText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {detail.instructions}
                </Text>
              </View>
            </View>
          )}

          {/* Claim Button */}
          <TouchableOpacity
            style={[
              styles.claimButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleClaimPress}
          >
            <Ionicons name="open-outline" size={24} color="#ffffff" />
            <Text style={styles.claimButtonText}>Claim This Giveaway</Text>
          </TouchableOpacity>
        </View>

        <ClaimModal
          visible={modalVisible}
          onClose={closeModal}
          url={detail.open_giveaway_url || detail.giveaway_url || ""}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  heroSection: {
    position: "relative",
    height: 280,
    marginBottom: 20,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "linear-gradient(transparent, rgba(0,0,0,0.8))",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 28,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  infoCard: {
    width: (width - 60) / 2,
    backgroundColor: "#2a2a2a",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#3a3a3a",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 18,
  },
  worthValue: {
    color: "#00ff88",
  },
  section: {
    backgroundColor: "#2a2a2a",
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3a3a3a",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3a",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginLeft: 12,
  },
  sectionContent: {
    padding: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: "#cccccc",
    lineHeight: 24,
    textAlign: "justify",
  },
  instructionsText: {
    fontSize: 16,
    color: "#cccccc",
    lineHeight: 24,
    textAlign: "justify",
  },
  claimButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  claimButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  loadingText: {
    color: "#cccccc",
    fontSize: 16,
    marginTop: 16,
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtext: {
    color: "#888888",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    color: "#cccccc",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 16,
  },
});

export default Detail;
