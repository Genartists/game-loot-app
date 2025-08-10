import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { remove } from "../store/savedSlice";

const Saved = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { items: savedItems } = useSelector((state) => state.saved);

  const handleItemPress = (item) => {
    navigation.navigate("Giveaways", {
      screen: "Detail",
      params: { id: item.id, title: item.title },
    });
  };

  const handleItemLongPress = (item) => {
    Alert.alert(
      "Remove from Saved",
      `Remove "${item.title}" from your saved items?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => dispatch(remove(item.id)),
        },
      ]
    );
  };

  const renderSavedItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.savedItem,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={() => handleItemPress(item)}
      onLongPress={() => handleItemLongPress(item)}
      delayLongPress={500}
    >
      {item.thumbnail && (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      )}

      <View style={styles.itemContent}>
        <Text
          style={[styles.itemTitle, { color: theme.colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <View style={styles.itemInfo}>
          <Text
            style={[styles.platforms, { color: theme.colors.textSecondary }]}
          >
            {Array.isArray(item.platforms)
              ? item.platforms.join(", ")
              : item.platforms || "Unknown"}
          </Text>
          {item.worth && (
            <Text style={[styles.worth, { color: theme.colors.secondary }]}>
              {item.worth}
            </Text>
          )}
        </View>

        {item.type && (
          <Text style={[styles.type, { color: theme.colors.primary }]}>
            {item.type}
          </Text>
        )}

        {item.end_date && (
          <Text style={[styles.endDate, { color: theme.colors.warning }]}>
            Ends: {item.end_date}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View
      style={[
        styles.emptyContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text style={styles.emptyIcon}>💾</Text>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        No Saved Items
      </Text>
      <Text
        style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
      >
        Long-press any giveaway in the Giveaways tab to save it here
      </Text>
      <TouchableOpacity
        style={[styles.browseButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate("Giveaways")}
      >
        <Text style={styles.browseButtonText}>Browse Giveaways</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.colors.statusBarContent}
        backgroundColor={theme.colors.statusBar}
      />
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Saved Items
        </Text>
        <Text
          style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}
        >
          {savedItems.length} saved giveaway{savedItems.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <FlatList
        data={savedItems}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderSavedItem}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3a",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  savedItem: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFD700",
    backgroundColor: "#FFFEF7",
  },
  thumbnail: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  itemContent: {
    padding: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    lineHeight: 20,
  },
  itemInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  platforms: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  worth: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
    marginLeft: 8,
  },
  type: {
    fontSize: 12,
    color: "#007AFF",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  endDate: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  browseButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  clearButton: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  clearButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Saved;
