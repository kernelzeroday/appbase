import { StyleSheet } from "react-native";
import { Button, Container, NativeBaseProvider } from "native-base";
import { Text, View } from "../../components/Themed";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>About Royal Timeclock</Text>
        <View style={styles.padding} />

        <Text style={styles.text}>
          Welcome to the Royal Timeclock Timesheet App, designed to streamline 
          time management and employee tracking. Our mission is to optimize your 
          workforce with user-friendly tools that simplify employee hours tracking, 
          timesheet generation, and performance monitoring. The intuitive interface 
          allows you to focus on core business operations without complex software.{" "}
        </Text>

        <View style={styles.padding} />
        <Text style={styles.text}>
          Our dedicated team of developers and support specialists 
          ensure our app remains up-to-date, reliable, and easy-to-use, catering to 
          businesses of all sizes. Experience the convenience and efficiency of our 
          cutting-edge solution by joining today.
        </Text>

        <View style={styles.padding} />

        <Text style={styles.text}>
          Should you face any issues, please contact your direct supervisor for 
          guidance and support in resolving problems.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  infoContainer: {
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  padding: {
    height: 10,
  },
});

export default AboutScreen;
