import React from "react";
import { StyleSheet } from "react-native";
import { Button, Container, NativeBaseProvider, Text, View } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

const ContactScreen = () => {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Royal Admin Time Portal</Text>
        </View>

        {/* contact information */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Contact Us</Text>

          {/* phone */}
          <View style={styles.dataContainer}>
            <FontAwesome name="phone" size={24} color="black" />
            <Text style={styles.data}>(123) 456-7890</Text>
          </View>

          {/* email */}
          <View style={styles.dataContainer}>
            <FontAwesome name="envelope" size={24} color="black" />
            <Text style={styles.data}>info@royaladmintimeportal.com</Text>
          </View>

          {/* address */}
          <View style={styles.dataContainer}>
            <FontAwesome name="map-marker" size={24} color="black" />
            <Text style={styles.data}>123 Main St, Anytown USA 12345</Text>
          </View>

          {/* website */}
          <View style={styles.dataContainer}>
            <FontAwesome name="globe" size={24} color="black" />
            <Text style={styles.data}>www.royaladmintimeportal.com</Text>
          </View>
        </View>

        {/* back button */}
        <Button style={styles.backButton}>Back</Button>
      </View>
    </NativeBaseProvider>
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
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#0477BF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  infoContainer: {
    width: "100%",
    maxWidth: 400,
    marginTop: 40,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  data: {
    fontSize: 16,
    marginLeft: 10,
  },
  backButton: {
    marginTop: 40,
    backgroundColor: "#0477BF",
    borderRadius: 10,
    paddingHorizontal: 30,
  },
});

export default ContactScreen;
