import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { loadWorth } from "../store/giveawaysSlice";
import Spinner from "../components/Spinner";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { worth, loading } = useSelector((state) => state.giveaways);

  useEffect(() => {
    dispatch(loadWorth());
  }, [dispatch]);

  const handleQuickFilter = (platform) => {
    navigation.navigate("Giveaways", { platform });
  };

  // Helper function to extract worth value from API response
  const getWorthValue = (worthData) => {
    if (!worthData) return 0;

    // Handle the specific API response structure
    if (
      typeof worthData === "object" &&
      worthData.worth_estimation_usd !== undefined
    ) {
      // Convert string to number and handle potential parsing errors
      const worthValue = parseFloat(worthData.worth_estimation_usd);
      return isNaN(worthValue) ? 0 : worthValue;
    }

    // Fallback for other structures
    if (typeof worthData === "number") return worthData;
    if (typeof worthData === "object") {
      // Try common property names
      if (worthData.total !== undefined)
        return parseFloat(worthData.total) || 0;
      if (worthData.value !== undefined)
        return parseFloat(worthData.value) || 0;
      if (worthData.worth !== undefined)
        return parseFloat(worthData.worth) || 0;
      if (worthData.amount !== undefined)
        return parseFloat(worthData.amount) || 0;
    }

    return 0;
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Spinner />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>
          Loading worth data...
        </Text>
      </View>
    );
  }

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
        style={styles.contentContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Free Games & Giveaways
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            Discover amazing free games and loot!
          </Text>
        </View>

        {worth && (
          <View
            style={[
              styles.worthCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.worthTitle, { color: theme.colors.text }]}>
              Total Worth Available
            </Text>
            <Text style={[styles.worthValue, { color: theme.colors.primary }]}>
              ${getWorthValue(worth).toLocaleString()}
            </Text>
            <Text
              style={[
                styles.worthSubtitle,
                { color: theme.colors.textSecondary },
              ]}
            >
              in free games and giveaways
            </Text>
            {worth.active_giveaways_number && (
              <Text
                style={[
                  styles.giveawaysCount,
                  { color: theme.colors.secondary },
                ]}
              >
                {worth.active_giveaways_number} active giveaways
              </Text>
            )}
          </View>
        )}

        <View style={styles.quickActions}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Filters
          </Text>
          <View style={styles.buttonGrid}>
            <TouchableOpacity
              style={[
                styles.quickButton,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => handleQuickFilter("steam")}
            >
              <Ionicons
                name="logo-steam"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>
                Steam Only
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickButton,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => handleQuickFilter("epic-games-store")}
            >
              <Ionicons
                name="game-controller"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>
                Epic Games
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickButton,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => handleQuickFilter("gog")}
            >
              <Ionicons name="desktop" size={24} color={theme.colors.primary} />
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>
                GOG
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickButton,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => handleQuickFilter("")}
            >
              <Ionicons name="grid" size={24} color={theme.colors.primary} />
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>
                All Platforms
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.infoItem}>
            <Ionicons name="search" size={20} color="#007AFF" />
            <Text style={styles.infoText}>
              Browse through thousands of free games and giveaways
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="heart" size={20} color="#007AFF" />
            <Text style={styles.infoText}>Save your favorites for later</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="link" size={20} color="#007AFF" />
            <Text style={styles.infoText}>Claim directly from the source</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  contentContainer: {
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 16,
    marginTop: 16,
  },
  header: {
    padding: 24,
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#cccccc",
    textAlign: "center",
  },
  worthCard: {
    backgroundColor: "#2a2a2a",
    margin: 24,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  worthTitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 8,
    fontWeight: "600",
  },
  worthValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#00ff88",
    marginBottom: 4,
  },
  worthSubtitle: {
    fontSize: 14,
    color: "#cccccc",
  },
  giveawaysCount: {
    fontSize: 14,
    color: "#00ff88",
    marginTop: 8,
    fontWeight: "500",
  },
  quickActions: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickButton: {
    backgroundColor: "#2a2a2a",
    width: "48%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#3a3a3a",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
  infoSection: {
    padding: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  infoText: {
    color: "#cccccc",
    fontSize: 16,
    marginLeft: 16,
    flex: 1,
  },
});

export default Home;
