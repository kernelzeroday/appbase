import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Button, Container, NativeBaseProvider, Text, View } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';

import type { AdminSignUpRequestModel } from '../client/models/AdminSignUpRequestModel';

import { DefaultService } from "../client";

const NewAdminPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const signupRequest: AdminSignUpRequestModel = {
      admin_email: email,
      admin_password: password,
      admin_first_name: firstName,
      admin_last_name: lastName,
      admin_timezone: "",
      admin_role: ""
    };

    const res = await DefaultService.adminSignupApiV1AdminSignupPost(signupRequest);

    Toast.show({
      type: 'success',
      text1: 'Created new admin',
      text2: 'Admin account for ' + email + ' created.',
      visibilityTime: 2000
    });
    //TODO error handling
    // handle form submission logic
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <FontAwesome name="user-plus" size={32} color="black" />
          <Text style={styles.title}>Create New Admin</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>First Name:</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={16} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <Text style={styles.label}>Last Name:</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={16} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <Text style={styles.label}>Email:</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={16} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>Password:</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={16} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <Button style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Admin</Text>
          </Button>
        </View>
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "100%",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "black",
    justifyContent: "center",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default NewAdminPage;
