import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";

const ClaimModal = ({ visible, onClose, url }) => {
  const handleClaim = async () => {
    if (!url) {
      Alert.alert(
        "No URL Available",
        "This giveaway does not have a direct claim URL. Please check the description for instructions.",
        [{ text: "OK", onPress: onClose }]
      );
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        onClose();
      } else {
        Alert.alert(
          "Cannot Open URL",
          "Unable to open this URL. Please copy and paste it into your browser.",
          [{ text: "OK", onPress: onClose }]
        );
      }
    } catch (error) {
      console.error("Error opening URL:", error);
      Alert.alert(
        "Error",
        "Failed to open the giveaway URL. Please try again later.",
        [{ text: "OK", onPress: onClose }]
      );
    }
  };

  const isUrlAvailable = !!url;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>How to Claim</Text>
          <Text style={styles.modalDescription}>
            {isUrlAvailable
              ? "Click the button below to visit the giveaway page and follow the instructions to claim your prize."
              : "This giveaway does not have a direct claim URL. Please check the description above for instructions on how to participate."}
          </Text>

          {isUrlAvailable && (
            <TouchableOpacity style={styles.claimButton} onPress={handleClaim}>
              <Text style={styles.claimButtonText}>Go to Giveaway</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Close</Text>
          </TouchableOpacity>
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
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#cccccc",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  claimButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
    minWidth: 200,
  },
  claimButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#666666",
  },
  cancelButtonText: {
    color: "#cccccc",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ClaimModal;
