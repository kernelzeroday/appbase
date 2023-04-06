import { StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Button, Container, NativeBaseProvider } from "native-base";
import { Text, View } from "../../components/Themed";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function AccountInfoScreen() {
  const data = {
    user_id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    date: "2023-03-13",
    clock_in_times: ["09:00:00"],
    clock_out_times: ["17:00:00"],
    total_hours: 8.0,
    week_number: 11,
    week_total_hours: 8.0,
    month_name: "March",
    month_total_hours: 8.0,
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
          <Text style={styles.label}>Name:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>
              {data.first_name} {data.last_name}
            </Text>
          </View>
        </View>
  
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.email}</Text>
          </View>
        </View>
  
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.date}</Text>
          </View>
        </View>
  
        <View style={styles.row}>
          <Text style={styles.label}>Clock In Time:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.clock_in_times.join(", ")}</Text>
          </View>
        </View>
  
        <View style={styles.row}>
          <Text style={styles.label}>Clock Out Time:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.clock_out_times.join(", ")}</Text>
          </View>
        </View>
  
        <View style={styles.row}>
          <Text style={styles.label}>Total Hours:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.total_hours}</Text>
          </View>
        </View>
  
        <View style={styles.row}>
          <Text style={styles.label}>Week Number:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.week_number}</Text>
          </View>
        </View>
  
        <View style={styles.row}>
          <Text style={styles.label}>Week Total:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.week_total_hours}</Text>
          </View>
        </View>
  
        <View style={styles.row}>
          <Text style={styles.label}>Month:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.month_name}</Text>
          </View>
        </View>
  
        <View style={styles.row}>
          <Text style={styles.label}>Month Total:</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>{data.month_total_hours}</Text>
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
    fontSize: 18,
    marginLeft: 10,
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
