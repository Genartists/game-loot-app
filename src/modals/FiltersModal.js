import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { setPlatform, setType, setSortBy } from "../store/filtersSlice";

const FiltersModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const { platform, type, sortBy } = useSelector((state) => state.filters);

  const chipAnimations = useRef({});

  const platforms = [
    { key: "", label: "All Platforms" },
    { key: "pc", label: "PC" },
    { key: "steam", label: "Steam" },
    { key: "epic-games-store", label: "Epic Games" },
    { key: "ubisoft", label: "Ubisoft" },
    { key: "gog", label: "GOG" },
    { key: "itchio", label: "itch.io" },
    { key: "ps4", label: "PS4" },
    { key: "ps5", label: "PS5" },
    { key: "xbox-one", label: "Xbox One" },
    { key: "xbox-series-xs", label: "Xbox Series X/S" },
    { key: "switch", label: "Nintendo Switch" },
    { key: "android", label: "Android" },
    { key: "ios", label: "iOS" },
    { key: "vr", label: "VR" },
    { key: "battlenet", label: "Battle.net" },
    { key: "origin", label: "Origin" },
    { key: "drm-free", label: "DRM-Free" },
    { key: "xbox-360", label: "Xbox 360" },
  ];

  const types = [
    { key: "", label: "All Types" },
    { key: "game", label: "Game" },
    { key: "loot", label: "Loot" },
    { key: "beta", label: "Beta" },
    { key: "dlc", label: "DLC" },
  ];

  const sortOptions = [
    { key: "date", label: "Date" },
    { key: "value", label: "Value" },
    { key: "popularity", label: "Popularity" },
  ];

  const animateChip = (key, toValue) => {
    if (!chipAnimations.current[key]) {
      chipAnimations.current[key] = new Animated.Value(1);
    }

    Animated.sequence([
      Animated.timing(chipAnimations.current[key], {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(chipAnimations.current[key], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePlatformPress = (key) => {
    animateChip(`platform-${key}`);
    dispatch(setPlatform(key));
  };

  const handleTypePress = (key) => {
    animateChip(`type-${key}`);
    dispatch(setType(key));
  };

  const handleSortPress = (key) => {
    animateChip(`sort-${key}`);
    dispatch(setSortBy(key));
  };

  const renderChips = (items, selectedValue, onPress, prefix) => {
    return items.map((item) => {
      const isSelected = selectedValue === item.key;
      const animKey = `${prefix}-${item.key}`;

      if (!chipAnimations.current[animKey]) {
        chipAnimations.current[animKey] = new Animated.Value(1);
      }

      return (
        <Animated.View
          key={item.key}
          style={[
            styles.chip,
            isSelected && styles.chipSelected,
            { opacity: chipAnimations.current[animKey] },
          ]}
        >
          <TouchableOpacity
            style={styles.chipTouchable}
            onPress={() => onPress(item.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.chipText, isSelected && styles.chipTextSelected]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      );
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Platform</Text>
              <View style={styles.chipsContainer}>
                {renderChips(
                  platforms,
                  platform,
                  handlePlatformPress,
                  "platform"
                )}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Type</Text>
              <View style={styles.chipsContainer}>
                {renderChips(types, type, handleTypePress, "type")}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.chipsContainer}>
                {renderChips(sortOptions, sortBy, handleSortPress, "sort")}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyButton} onPress={onClose}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  closeButton: {
    padding: 8,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  chip: {
    backgroundColor: "#3a3a3a",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4a4a4a",
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  chipTouchable: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#ffffff",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  applyButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  applyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FiltersModal;
