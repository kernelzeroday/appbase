import { StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Button, Container, NativeBaseProvider } from "native-base";
import { Text, View } from "../../components/Themed";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  tableContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  actionButton: {
    marginHorizontal: 10,
  },
});

const AdminViewTicketsScreen = () => {
  // Dummy data for table
  const tableData = [
    ["1", "John Doe", "2023-03-13", "Bug", "Open"],
    ["2", "Jane Smith", "2023-03-14", "Feature Request", "Open"],
    ["3", "Bob Johnson", "2023-03-15", "Bug", "In Progress"],
    ["4", "Alice Lee", "2023-03-16", "Feature Request", "Closed"],
  ];

  return (
    <NativeBaseProvider>
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Admin View Tickets</Text>

      {/* Open Tickets */}
      <View>
        <Text style={styles.subtitle}>Open Tickets:</Text>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Ticket List:</Text>

          <Table borderStyle={{ borderWidth: 1 }}>
            <Row
              data={["ID", "User", "Date", "Type", "Status"]}
              style={{ height: 40, backgroundColor: "#f1f8ff" }}
              textStyle={{ margin: 6 }}
            />
            <Rows data={tableData} textStyle={{ margin: 6 }} />
          </Table>
        </View>

        <View style={styles.actionsContainer}>
          <Button style={styles.actionButton}>
            <FontAwesome name="edit" size={16} color="black" />
            <Text style={{ marginLeft: 5 }}>Edit</Text>
          </Button>
          <Button style={styles.actionButton}>
            <FontAwesome name="trash" size={16} color="black" />
            <Text style={{ marginLeft: 5 }}>Delete</Text>
          </Button>
        </View>
      </View>

      {/* Closed Tickets */}
      <View>
        <Text style={styles.subtitle}>Closed Tickets:</Text>

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Ticket List:</Text>

          <Table borderStyle={{ borderWidth: 1 }}>
            <Row
              data={["ID", "User", "Date", "Type", "Status"]}
              style={{ height: 40, backgroundColor: "#f1f8ff" }}
              textStyle={{ margin: 6 }}
            />
            <Rows data={tableData} textStyle={{ margin: 6 }} />
          </Table>
        </View>

        <View style={styles.actionsContainer}>
          <Button style={styles.actionButton}>
            <FontAwesome name="edit" size={16} color="black" />
            <Text style={{ marginLeft: 5 }}>Edit</Text>
          </Button>
          <Button style={styles.actionButton}>
            <FontAwesome name="trash" size={16} color="black" />
            <Text style={{ marginLeft: 5 }}>Delete</Text>
          </Button>
        </View>
      </View>
    </View>
    </NativeBaseProvider>
  );
};


export default AdminViewTicketsScreen;
