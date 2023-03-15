import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Button,
  Input,
  Text,
  NativeBaseProvider,
  Image,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // TODO: implement sign in logic
  };

  return (
    <NativeBaseProvider>
      <Container style={styles.container}>
        {/* logo from assets  */}
        {/* <Image
            source={require("../../assets/images/logo.jpg")}
            style={{ width: 200, height: 200 }}
            /> */}
        {/* vector logo from font awesome */}
        {/* <FontAwesome name="user-circle" size={200} color="black" /> */}

        <View
          style={{ flexDirection: "row", backgroundColor: "#eee", padding: 20 }}
        >
          <FontAwesome name="clock-o" size={100} color="black" />
          {/* padding */}
            <View style={{ width: 20 }} />
          <FontAwesome name="vcard" size={100} color="black" />
        </View>

        {/* Login Section */}
        <Text style={styles.title}>Royal Admin Time Portal Login</Text>
        {/* test button */}
        {/* <Button title="Test" onPress={ClientTestFunc} />  */}

        {/* medium text area */}
        <View style={{ width: "70%" }}>
          {/* medium text */}
          {/* center it */}
          <Text style={{ fontSize: 15, textAlign: "center" }}>
            Please enter your login credentials below to access the Royal Admin
            Time Portal.
          </Text>
        </View>
        {/* spacer */}
        <View style={{ height: 10 }} />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Button onPress={handleSignIn} style={styles.button}>
          <Text>Sign In</Text>
        </Button>
        {/* Warnings */}
        <View style={{ height: 10 }} />
        {/* container area, 70% width of screen */}
        <View style={{ width: "70%" }}>
          {/* very small text */}
          <Text style={{ fontSize: 11 }}>
            Welcome to the Royal Admin Time Portal. We take the security and
            privacy of our users very seriously, and have implemented various
            measures to ensure the protection of your information. Please note
            that this is a secure web application, and access is limited to
            authorized personnel only. We kindly ask that you keep your login
            credentials confidential and do not share them with anyone. Our
            system employs advanced encryption technology to safeguard sensitive
            data, and our team continually monitors the application for any
            suspicious activity. If you encounter any issues with your login or
            have any questions about our security measures, please do not
            hesitate to contact our support team for assistance. Thank you for
            using the Royal Admin Time Portal.
          </Text>
        </View>
      </Container>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default SignInScreen;