import { StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Button, Container, NativeBaseProvider } from "native-base";
import { Text, View } from "../../components/Themed";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function AccountInfoScreen() {
  const data = {
    user_id: 1,
    first_name: "Jason",
    last_name: "Doe",
    user_name: "jason_doe",
    week_total_hours: 8.0,
  };

  return (
    <View style={styles.container}>
      {/* user info */}
      <View style={styles.infoContainer}>
        {/* padding  */}
        <View style={styles.padding} />

        {/* user icon */}
        <View style={styles.userIconContainer}>
          <Ionicons name="person-circle-outline" size={100} color="white" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>First/Last Name:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.first_name}{data.last_name}</Text>
          </View>
        </View>


        <View style={styles.row}>
          <Text style={styles.label}>username:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.user_name}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Week Total Hours:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.week_total_hours}</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingHorizontal: 20,
    alignSelf: "center",
    width: "90%",
    maxWidth: 400,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
    color: "white",
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  data: {
    fontSize: 18,
    marginLeft: 10,
    color: "white",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 10,
  },
  userIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingHorizontal: 20,
  },
  padding: {
    height: 20,
    width: "100%",
    backgroundColor: "black",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
