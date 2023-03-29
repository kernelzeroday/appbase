import { StyleSheet } from "react-native";
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

import type { TimesheetResponseModel } from '../client/models/TimesheetResponseModel';
import { DefaultService } from "../client";


const TableComponent = () => {
  const [timecardData, setTimecardData] = useState<TimesheetResponseModel>([]);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    const res = await DefaultService.getTimecardApiV1TimecardGet();
    if (res && res.response) {
      setTimecardData(res.response as TimesheetResponseModel[]);
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
  

  
  const { tableHead, tableData } = makeTableData(timecardData);

  return (
    <View style={styles.table}>
      <Table borderStyle={{ borderWidth: 20, borderColor: "white" }}>
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
  headText: {
    height: 40,
    backgroundColor: "#f1f8ff",
    color: "black",
  },
  text: {
    margin: 6,
    textAlign: "center",
    backgroundColor: "#f1f8ff",
    color: "white",
  },
  row: {
    height: 60,
    backgroundColor: "#f1f8ff",
  },
  table: { flex: 1, marginTop: 20 },
  cell: { width: 100, height: 40, backgroundColor: "#f1f8ff" },
});
