import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Card = ({ item, onPress, onLongPress, isSaved, onSaveToggle }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const savedOpacity = useRef(new Animated.Value(isSaved ? 1 : 0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(savedOpacity, {
      toValue: isSaved ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isSaved]);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.96,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.02,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLongPress = () => {
    if (onLongPress) {
      onLongPress(item);
    }
  };

  const handleHeartPress = (e) => {
    e.stopPropagation(); // Prevent card press when heart is pressed

    // Animate heart button
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(heartScale, {
        toValue: 1,
        tension: 200,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    if (onSaveToggle) {
      onSaveToggle(item, isSaved);
    }
  };

  // Add pulse animation when saved state changes
  useEffect(() => {
    if (isSaved) {
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(heartScale, {
          toValue: 1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSaved]);

  const getWorthText = (worth) => {
    if (!worth) return null;
    if (typeof worth === "string") return worth;
    if (typeof worth === "number") return `$${worth.toLocaleString()}`;
    return null;
  };

  const getPlatformText = (platforms) => {
    if (!platforms) return "Unknown Platform";
    if (Array.isArray(platforms)) return platforms.join(", ");
    return platforms;
  };

  const getEndDateText = (endDate) => {
    if (!endDate) return null;
    // Try to format the date if it's a valid date string
    try {
      const date = new Date(endDate);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString();
      }
    } catch (e) {
      // If parsing fails, return the original string
    }
    return endDate;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={handleLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      style={[styles.card, isSaved && styles.cardSaved]}
    >
      <Animated.View
        style={[styles.cardContent, { transform: [{ scale: scaleAnim }] }]}
      >
        {/* Thumbnail Section */}
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />

          {/* Heart Button */}
          <TouchableOpacity
            style={styles.heartButton}
            onPress={handleHeartPress}
            activeOpacity={0.8}
          >
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Ionicons
                name={isSaved ? "heart" : "heart-outline"}
                size={24}
                color={isSaved ? "#ff4757" : "#ffffff"}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>

          {/* Platform and Type */}
          <View style={styles.metaRow}>
            <View style={styles.platformChip}>
              <Ionicons name="desktop" size={14} color="#007AFF" />
              <Text style={styles.platformText}>
                {getPlatformText(item.platforms || item.platform)}
              </Text>
            </View>
            <View style={styles.typeChip}>
              <Text style={styles.typeText}>{item.type || "Game"}</Text>
            </View>
          </View>

          {/* Worth and End Date */}
          <View style={styles.detailsRow}>
            {getWorthText(item.worth) && (
              <View style={styles.worthContainer}>
                <Ionicons name="diamond" size={14} color="#00ff88" />
                <Text style={styles.worthText}>{getWorthText(item.worth)}</Text>
              </View>
            )}
            {getEndDateText(item.end_date) && (
              <View style={styles.dateContainer}>
                <Ionicons name="time" size={14} color="#ff6b6b" />
                <Text style={styles.dateText}>
                  Ends: {getEndDateText(item.end_date)}
                </Text>
              </View>
            )}
          </View>

          {/* Description Preview */}
          {item.short_description && (
            <Text style={styles.description} numberOfLines={2}>
              {item.short_description}
            </Text>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#3a3a3a",
    overflow: "hidden",
  },
  cardSaved: {
    borderWidth: 2,
    borderColor: "#ff4757",
    backgroundColor: "#2d1a1a",
  },
  cardContent: {
    flexDirection: "row",
    padding: 0,
  },
  thumbnailContainer: {
    position: "relative",
    width: 100,
    height: 100,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 8,
  },
  platformChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 122, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  platformText: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "600",
    marginLeft: 4,
  },
  typeChip: {
    backgroundColor: "rgba(255, 107, 107, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ff6b6b",
  },
  typeText: {
    fontSize: 12,
    color: "#ff6b6b",
    fontWeight: "600",
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 12,
  },
  worthContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 136, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00ff88",
  },
  worthText: {
    fontSize: 12,
    color: "#00ff88",
    fontWeight: "700",
    marginLeft: 4,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 107, 107, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ff6b6b",
  },
  dateText: {
    fontSize: 12,
    color: "#ff6b6b",
    fontWeight: "600",
    marginLeft: 4,
  },
  description: {
    fontSize: 13,
    color: "#cccccc",
    lineHeight: 18,
    fontStyle: "italic",
  },
  heartButton: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Card;
