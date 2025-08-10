import React from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { toggleTheme } from "../store/themeSlice";
import Ionicons from "react-native-vector-icons/Ionicons";

const Settings = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = useSelector((state) => state.theme.isDark);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.colors.statusBarContent}
        backgroundColor={theme.colors.statusBar}
      />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Settings
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            Configure your app preferences
          </Text>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Appearance
          </Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon" size={20} color={theme.colors.primary} />
              <Text style={[styles.settingText, { color: theme.colors.text }]}>
                Dark Theme
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={handleThemeToggle}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor={isDark ? theme.colors.primary : "#f4f3f4"}
              ios_backgroundColor={theme.colors.border}
            />
          </View>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            App Information
          </Text>
          <View style={styles.infoItem}>
            <Ionicons
              name="information-circle"
              size={20}
              color={theme.colors.primary}
            />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              Free Games & Giveaways
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="code" size={20} color={theme.colors.primary} />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              Version 1.0.0
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="globe" size={20} color={theme.colors.primary} />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              Powered by GamerPower API
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Features
          </Text>
          <View style={styles.infoItem}>
            <Ionicons name="search" size={20} color={theme.colors.secondary} />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              Smart filtering and search
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="heart" size={20} color={theme.colors.secondary} />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              Save favorite giveaways
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="link" size={20} color={theme.colors.secondary} />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              Direct claiming links
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons
              name="phone-portrait"
              size={20}
              color={theme.colors.secondary}
            />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              Mobile optimized interface
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Support
          </Text>
          <View style={styles.infoItem}>
            <Ionicons
              name="help-circle"
              size={20}
              color={theme.colors.warning}
            />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              Long-press items to save/remove
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="refresh" size={20} color={theme.colors.warning} />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              Pull down to refresh lists
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="filter" size={20} color={theme.colors.warning} />
            <Text
              style={[styles.infoText, { color: theme.colors.textSecondary }]}
            >
              Use filters to find specific games
            </Text>
          </View>
        </View>
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
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    padding: 24,
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  section: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 16,
    flex: 1,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 16,
    flex: 1,
  },
});

export default Settings;
