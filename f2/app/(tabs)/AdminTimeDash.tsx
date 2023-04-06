import { StyleSheet, ScrollView } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import {
  Button,
  Container,
  Icon,
  NativeBaseProvider,
  Text,
  View,
} from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { OpenAPI } from '../client/core/OpenAPI';

import { useFocusEffect } from '@react-navigation/native';

import type { AdminFileDownloadResponseModel } from '../client/models/AdminFileDownloadResponseModel';
import type { AdminTimesheetResponseModelAllUsers } from '../client/models/AdminTimesheetResponseModelAllUsers';
import { DefaultService } from "../client";

const TableComponent = () => {
  const [timecardData, setTimecardData] = useState<AdminTimesheetResponseModelAllUsers>([]);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    const res = await DefaultService.getTimecardApiV1AdminTimecardGet();
    if (res && res.response) {
      setTimecardData(res.response as AdminTimesheetResponseModelAllUsers[]);
    }
  };

  const makeTableData = (data) => {
    // group timecard data by user and date
    const groupedData = data.reduce((acc, curr) => {
      const key = curr.user_id + '-' + curr.first_name + '-' + curr.last_name;
      if (!acc[key]) {
        acc[key] = {
          user_id: curr.user_id,
          name: curr.first_name + ' ' + curr.last_name,
          data: {}
        };
      }
      if (!acc[key].data[curr.date]) {
        acc[key].data[curr.date] = {
          clock_in_times: [],
          clock_out_times: [],
          total_hours: 0
        };
      }
      acc[key].data[curr.date].clock_in_times.push(...curr.clock_in_times);
      acc[key].data[curr.date].clock_out_times.push(...curr.clock_out_times);
      acc[key].data[curr.date].total_hours += curr.total_hours;
      return acc;
    }, {});

    // get all unique dates from the timecard data and sort them in ascending order
    const dates = Object.values(groupedData)
      .flatMap(user => Object.keys(user.data))
      .filter((date, i, arr) => arr.indexOf(date) === i)
      .sort();

    // create a new array with one element for each user and their timecard data for each date
    const tableData = [];
    Object.values(groupedData).forEach((user) => {
      const userRowData = [user.name];
      const rowData = [];
      dates.forEach((date) => {
        const timecard = user.data[date];
        if (timecard) {
          timecard.clock_in_times.forEach((time, i) => {
            rowData.push(
              "",
              time,
              timecard.clock_out_times[i],
              timecard.total_hours
            );
          });
        } else {
          rowData.push("", "", "", "");
        }
      });
      tableData.push([...userRowData, ...rowData]);
    });

    // add the table head
    const tableHead = [
      "Name",
      ...dates.flatMap(date => ["", new Date(date).toDateString(), "", "Total Hours"]),
    ];

    return { tableHead, tableData };
  };

// this function is called when the download button is clicked and it will download the timecard data as an excel file
// its a work in progress and needs to be refactored

  const downloadFile = async () => {
    const token = JSON.parse(sessionStorage.getItem('token')); // Retrieve access_token from session
    console.log('token', token);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await fetch('http://localhost:8000/v1/admin/timecard/download', { headers }); // Use fetch to call the API with the token
    const blob = await response.blob(); // Create a Blob from the API response
    const url = window.URL.createObjectURL(blob);
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in ISO format (e.g. "2023-03-30")
    const fileName = `${currentDate}.xlsx`; // Set file name to current date + ".xlsx"
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
  };
  
  


const { tableHead, tableData } = makeTableData(timecardData);

return (
  <View style={styles.table}>
    <Table borderStyle={{ borderWidth: 1, borderColor: "white" }}>
      <Row
        data={tableHead}
        style={styles.head}
        textStyle={styles.headText}
      />
      <Rows
        data={tableData}
        textStyle={styles.text}
      />
    </Table>
    <Button onPress={downloadFile} style={styles.button}>
      Download Timecard
    </Button>
  </View>
);
};

export default function TimecardScreen() {
  return (
  <NativeBaseProvider>
    <Container>
      <TableComponent />
      </Container>
      </NativeBaseProvider>
      );
    }

const styles = StyleSheet.create({
button: {
  backgroundColor: "green",
  color: "white",
  height: 50,
  justifyContent: "center",
  borderRadius: 10,
},
container: {
flex: 1,
alignItems: "center",
justifyContent: "center",
backgroundColor: "orange",
},
title: {
fontSize: 20,
fontWeight: "bold",
},
separator: {
marginVertical: 30,
height: 100,
},
head: {
height: 85,
backgroundColor: "#595959",
},
headText: {
height: 40,
color: "white",
},
text: {
margin: 6,
backgroundColor: "green",
color: "white",
},
row: {
height: 60,
backgroundColor: "blue",
},
table: {
  flex: 1,
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 200,
  marginRight: 0, 
  backgroundColor: "#808080",
  width: "100%",
  justifyContent: 'center',
},
cell: { width: 20, height: 40, backgroundColor: "red" },
});