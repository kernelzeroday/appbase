import { Pressable, StyleSheet, Button, TextInput } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { DefaultService } from "../client";
import React from "react";
import { Navigate } from "react-router-dom";

async function ClientTestFunc() {
  const res = await DefaultService.notSecretDataApiNotSecretGet();
  console.log(res);
}

// login handler with navigation
async function LoginHandler(email: any, password: any) {
  const res = await DefaultService.signinApiV1SigninPost({user_email: email, user_password: password});
  //navigate home page in react
  // if fail, display error message
}

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* Login Section */}
      <Text style={styles.title}>Royal Admin Time Portal Login</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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


      {/* input areas for email and password */}

      {/* email input */}
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="  Email"
      />

      {/* spacer */}
      <View style={{ height: 10 }} />
      {/* password input */}
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="  Password"
      />

      {/* padding */}
      <View style={{ height: 10 }} />

      {/* login button  */}
      <Button title="Login" onPress={ClientTestFunc} />

      {/* Warnings */}
      <View style={{ height: 10 }} />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* container area, 70% width of screen */}
      <View style={{ width: "70%" }}>
        {/* very small text */}
        <Text style={{ fontSize: 11 }}>
        Welcome to the Royal Admin Time Portal. We take the security and privacy
        of our users very seriously, and have implemented various measures to
        ensure the protection of your information. Please note that this is a
        secure web application, and access is limited to authorized personnel
        only. We kindly ask that you keep your login credentials confidential
        and do not share them with anyone. Our system employs advanced
        encryption technology to safeguard sensitive data, and our team
        continually monitors the application for any suspicious activity. If you
        encounter any issues with your login or have any questions about our
        security measures, please do not hesitate to contact our support team
        for assistance. Thank you for using the Royal Admin Time Portal.
      </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
