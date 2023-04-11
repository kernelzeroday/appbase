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
import moment from 'moment-timezone';
import { useFocusEffect } from '@react-navigation/native';

import type { TimesheetResponseModel } from '../client/models/TimesheetResponseModel';
import { DefaultService } from "../client";

// there is an auth bug that doesnt fully log the user out. not sure where its at but will find it!
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
      acc[key].data[curr.date].user_timezone = curr.user_timezone;
      return acc;
    }, {});
  
    // get all unique dates from the timecard data and sort them in ascending order
    const dates = Object.values(groupedData)
      .flatMap(user => Object.keys(user.data))
      .filter((date, i, arr) => arr.indexOf(date) === i)
      .sort();
  
    // create a new array with the timecard data for each date
    const tableData = [];
    Object.values(groupedData).forEach((user) => {
      const rowData = ["Week Data"]; // Add the "Time Information" text to match the heading
      dates.forEach((date) => {
        const timecard = user.data[date];
        if (timecard) {
          const timezone = timecard.user_timezone;
          const formattedDate = moment.tz(date, timezone).format("ddd MMM DD YYYY");
          rowData.push(
            timecard.clock_in_times.join("\n"),
            timecard.clock_out_times.join("\n"),
            timecard.total_hours
          );
        } else {
          rowData.push("", "", "");
        }
      });
      tableData.push([...rowData]);
    });
  
    // add the table head
    const tableHead = [    "",    ...dates.flatMap(date => {      const timezone = Object.values(groupedData)[0].data[date].user_timezone;
        return [moment.tz(date, timezone).format("ddd MMM DD YYYY"), "", "Total Hours"];
      }),
    ];
  
    return { tableHead, tableData };
  };
  
  
  
  
  
  //test

  
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
    backgroundColor: "black",
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
