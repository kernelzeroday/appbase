import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Container, Input, NativeBaseProvider, Text, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';

import type { UserSignUpRequestModel } from '../client/models/UserSignUpRequestModel';

import { DefaultService } from "../client";

export default function AdminCreateUserScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const signupRequest: UserSignUpRequestModel = {
      user_email: email,
      user_password: password,
      user_first_name: firstName,
      user_last_name: lastName,
      user_timezone: "",
      user_role: ""
    };
    const res = await DefaultService.signupApiV1SignupPost(signupRequest);
    Toast.show({
      type: 'success',
      text1: 'Created new user',
      text2: 'User account for ' + email + ' created.',
      visibilityTime: 2000
    });
    //TODO error handling
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="add" size={32} color="white" />
          <Text style={styles.headerText}>Create New User</Text>
        </View>
        <View style={styles.form}>
          <Input
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={styles.input}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            style={styles.input}
          />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry={true}
          />
          <Button onPress={handleSubmit} style={styles.button}>
            <Text>Create User</Text>
          </Button>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
});
