import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const ZoomControl = ({ handleZoom }) => {
  return (
    <View>
      <Pressable style={styles.button} onPress={() => handleZoom("zoomIn")}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => handleZoom("zoomOut")}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
    </View>
  );
};

export default ZoomControl;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
});
