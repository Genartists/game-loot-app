import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

const Spinner = ({ size = 24, color = "#007AFF" }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      rotateAnim.setValue(0);
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => startRotation());
    };

    startRotation();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          {
            width: size,
            height: size,
            borderColor: color,
            borderTopColor: "transparent",
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#007AFF",
    borderTopColor: "transparent",
  },
});

export default Spinner;
