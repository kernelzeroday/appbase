import { StyleSheet, TextInput } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Button, Container, NativeBaseProvider } from "native-base";
import { Text, View } from "../../components/Themed";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function AdminModifyUserScreen() {
  const [userData, setUserData] = useState({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    role: "user",
  });

  const handleFirstNameChange = (firstName) => {
    setUserData({ ...userData, firstName });
  };

  const handleLastNameChange = (lastName) => {
    setUserData({ ...userData, lastName });
  };

  const handleEmailChange = (email) => {
    setUserData({ ...userData, email });
  };

  const handleRoleChange = (role) => {
    setUserData({ ...userData, role });
  };

  return (
    <NativeBaseProvider>
    <View style={styles.container}>
      {/* user info */}
      <View style={styles.infoContainer}>
        {/* padding  */}
        <View style={styles.padding} />

        {/* user icon */}
        <View style={styles.userIconContainer}>
          <FontAwesome name="user" size={100} color="black" />
        </View>

        <Text style={styles.label}>ID</Text>
        <View style={styles.dataContainer}>
          <Text style={styles.data}>{userData.id}</Text>
        </View>
        <Text style={styles.label}>First Name:</Text>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.input}
            value={userData.firstName}
            onChangeText={handleFirstNameChange}
          />
        </View>
        <Text style={styles.label}>Last Name:</Text>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.input}
            value={userData.lastName}
            onChangeText={handleLastNameChange}
          />
        </View>
        <Text style={styles.label}>Email:</Text>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.input}
            value={userData.email}
            onChangeText={handleEmailChange}
          />
        </View>
        <Text style={styles.label}>Role:</Text>
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.input}
            value={userData.role}
            onChangeText={handleRoleChange}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={() => console.log("Save")}>
            <Text style={styles.buttonText}>Save</Text>
          </Button>
          <Button style={styles.button} onPress={() => console.log("Delete")}>
            <Text style={styles.buttonText}>Delete</Text>
          </Button>
        </View>
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
  infoContainer: {
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

    data: {
        fontSize: 16,
        marginLeft: 10,
    },
    input: {
        fontSize: 16,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
    },
    button: {
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 16,
    },
    userIconContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    padding: {
        height: 20,
        width: "100%",
        backgroundColor: "#fff",
    },


});