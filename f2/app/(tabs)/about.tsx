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
          Welcome to the about page for the Royal Admin Time Portal Timesheet
          Application! Our application is designed to make time management and
          employee tracking easier and more efficient than ever before. We
          understand that time is a valuable commodity, and our mission is to
          help businesses optimize their workforce by providing streamlined and
          user-friendly tools. With the Royal Admin Time Portal, you can easily
          manage and track employee hours, view and generate timesheets, and
          monitor employee performance. Our application is designed to be
          intuitive and user-friendly, ensuring that you can focus on your
          business's core operations without worrying about complicated
          software. At Royal Admin, we are committed to delivering the highest
          quality service to our customers. Our team of experienced developers
          and customer support specialists work tirelessly to ensure that our
          application is up-to-date, reliable, and easy to use. Whether you are
          a small business owner or managing a large team, the Royal Admin Time
          Portal is the perfect solution for all your timesheet management
          needs. Join us today and experience the convenience and efficiency of
          our state-of-the-art application!{" "}
        </Text>

        <View style={styles.padding} />
        <Text style={styles.text}>
          If you encounter any issues while using the Royal Admin Time Portal
          Timesheet Application, please don't hesitate to reach out to your
          direct supervisor for assistance. They will be able to provide you
          with further guidance and support to help resolve any problems you may
          be experiencing.
        </Text>

        <View style={styles.padding} />
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
