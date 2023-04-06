import React from "react";
import { StyleSheet } from "react-native";
import { Button, Container, NativeBaseProvider, Text, View } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

const ContactScreen = () => {
  return (
    <NativeBaseProvider>
      <Container style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Contact Us!</Text>
        </View>

        {/* contact information */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Royal Time Clock Portal</Text>

          {/* phone */}
          <View style={styles.dataContainer}>
            <FontAwesome name="phone" size={24} color="white" />
            <Text style={styles.data}>(123) 456-7890</Text>
          </View>

          {/* email */}
          <View style={styles.dataContainer}>
            <FontAwesome name="envelope" size={24} color="white" />
            <Text style={styles.data}>info@royaltimeclock.com</Text>
          </View>

          {/* address */}
          <View style={styles.dataContainer}>
            <FontAwesome name="map-marker" size={24} color="white" />
            <Text style={styles.data}>123 Main St, Anytown USA 12345</Text>
          </View>

          {/* website */}
          <View style={styles.dataContainer}>
            <FontAwesome name="globe" size={24} color="white" />
            <Text style={styles.data}>www.royaltimeclock.com</Text>
          </View>
        </View>

        {/* back button */}
        <Button style={styles.backButton}>Back</Button>
      </Container>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingHorizontal: 20,
    marginLeft: 200,
  },
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 20,
    marginLeft: "auto", // This will center the container horizontally
    marginRight: "auto", // This will center the container horizontally
    marginBottom: 10,
    justifyContent: "center", // This will center the contents vertically
    alignItems: "center", // This will center the contents horizontally
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  dataContainer: {
    flexDirection: "row",
    marginLeft: "auto", // This will center the container horizontally
    marginRight: "auto", // This will center the container horizontally
    marginBottom: 10,
    justifyContent: "center", // This will center the contents vertically
    alignItems: "center", // This will center the contents horizontally
  },
  data: {
    fontSize: 16,
    marginLeft: 10,
    color: "white",
  },
  backButton: {
    marginTop: 40,
    backgroundColor: "#0477BF",
    borderRadius: 10,
    paddingHorizontal: 30,
  },
});

export default ContactScreen;
