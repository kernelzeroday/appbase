import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Button, Container, NativeBaseProvider, Text, View } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

const NewAdminPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // handle form submission logic
  };

  return (
    <NativeBaseProvider>
      <Container style={styles.container}>
        <View style={styles.titleContainer}>
          <FontAwesome name="user-plus" size={32} color="black" />
          <Text style={styles.title}>Create New Admin</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Name:</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={16} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={name}
              onChangeText={setName}
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
            />
          </View>

          <Button style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Admin</Text>
          </Button>
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
