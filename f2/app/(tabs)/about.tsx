import { StyleSheet } from "react-native";
import { Button, Container, NativeBaseProvider } from "native-base";
import { Text, View } from "../../components/Themed";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>About this app</Text>
        <View style={styles.padding} />

        <Text style={styles.text}>
          This is a time-tracking app that allows employees to clock in and out
          of their work shifts, and helps employers manage their team's hours
          and schedules. It was developed as a project for a mobile development
          course.
        </Text>

        <View style={styles.padding} />
        <Text style={styles.text}>
          If you have any questions or feedback, please contact us at
          support@timetrackerapp.com.
        </Text>

        <View style={styles.padding} />
        <Text style={styles.text}>Version: 1.0.0</Text>
        <View style={styles.padding} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  infoContainer: {
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  padding: {
    height: 10,
  },
});

export default AboutScreen;
