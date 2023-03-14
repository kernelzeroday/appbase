import { StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Button, Container, NativeBaseProvider } from "native-base";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import React from "react";

const TableComponent = () => {
  const data = [
    {
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
    },
    {
      user_id: 2,
      first_name: "Jane",
      last_name: "Doe",
      email: "jane.doe@example.com",
      date: "2023-03-14",
      clock_in_times: ["08:00:00"],
      clock_out_times: ["16:30:00"],
      total_hours: 8.5,
      week_number: 11,
      week_total_hours: 16.5,
      month_name: "March",
      month_total_hours: 16.5,
    },
    {
      user_id: 3,
      first_name: "Bob",
      last_name: "Smith",
      email: "bob.smith@example.com",
      date: "2023-03-15",
      clock_in_times: ["08:30:00", "12:00:00"],
      clock_out_times: ["12:00:00", "16:30:00"],
      total_hours: 8.0,
      week_number: 11,
      week_total_hours: 24.5,
      month_name: "March",
      month_total_hours: 24.5,
    },
    {
      user_id: 4,
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice.johnson@example.com",
      date: "2023-03-16",
      clock_in_times: ["09:00:00", "12:30:00"],
      clock_out_times: ["12:00:00", "17:00:00"],
      total_hours: 8.5,
      week_number: 11,
      week_total_hours: 33.0,
      month_name: "March",
      month_total_hours: 33.0,
    },
  ];
  
  
  const tableHead = [
    "Name",
    "Date",
    "Clock In",
    "Clock Out",
    "Total Hours",
    "Week Number",
    "Week Total",
    "Month",
    "Month Total",
  ];

  const tableData = data.map((item) => [
    `${item.first_name} ${item.last_name}`,
    item.date,
    item.clock_in_times.join(", "),
    item.clock_out_times.join(", "),
    item.total_hours,
    item.week_number,
    item.week_total_hours,
    item.month_name,
    item.month_total_hours,
  ]);

  return (
    <Table style={styles.table}>
      <Row data={tableHead} style={styles.head} textStyle={styles.text} />
      <Rows data={tableData} style={styles.row} textStyle={styles.text} />
    </Table>
  );
};

export default function Dashboard() {
  const tableHead = [
    "User Name",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Total Hours",
  ];
  const tableData = [
    [
      "User 1",
      "8:00 AM\n12:00 PM\n1:00 PM",
      "9:00 AM\n1:00 PM\n2:00 PM",
      "8:30 AM\n12:30 PM\n1:30 PM",
      "9:15 AM\n1:15 PM\n2:15 PM",
      "8:45 AM\n12:45 PM\n1:45 PM",
      "34:30",
    ],
    [
      "User 2",
      "9:00 AM\n12:30 PM\n1:30 PM",
      "8:00 AM\n12:15 PM\n1:15 PM",
      "8:30 AM\n12:45 PM\n2:15 PM",
      "9:15 AM\n1:30 PM\n1:30 PM",
      "8:45 AM\n1:00 PM\n2:30 PM",
      "34:30",
    ],
    [
      "User 3",
      "8:30 AM\n12:15 PM\n1:45 PM",
      "9:00 AM\n12:45 PM\n1:15 PM",
      "9:30 AM\n1:30 PM\n2:15 PM",
      "8:15 AM\n12:30 PM\n1:30 PM",
      "8:45 AM\n1:15 PM\n2:30 PM",
      "35:00",
    ],
    [
      "User 4",
      "9:00 AM\n12:30 PM\n1:30 PM",
      "8:30 AM\n12:45 PM\n1:15 PM",
      "8:45 AM\n12:15 PM\n2:00 PM",
      "9:15 AM\n1:30 PM\n2:15 PM",
      "8:00 AM\n1:00 PM\n2:30 PM",
      "34:30",
    ],
  ];

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Time Card</Text>
        {/* Separator */}
        <View style={styles.separator} />
        {/* set up table boundry */}
        <View style={{ width: "85%" }}>
          {/* commenent old mock */}

          {/* <Table
            borderStyle={{
              // thick border
              borderWidth: 3,
              // border color blue
              borderColor: "#c8e1ff",
            }}
          >
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows data={tableData} style={styles.row} textStyle={styles.text} />
          </Table> */}

          {/* new mock */}

          <TableComponent />
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
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
  },
  text: {
    margin: 6,
    textAlign: "center",
  },
  row: {
    height: 60,
  },
  table: { flex: 1, marginTop: 20 },
});
