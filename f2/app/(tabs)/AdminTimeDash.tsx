import { StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Button, Container, Icon, NativeBaseProvider } from "native-base";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { DefaultService } from "../client";

import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function AdminTimeScreen() {
  const handleTimeSheetDownload = async () => {
    try {
      const res = await DefaultService.getAdminAllTimecardApiV1TimecardGet();
      
      const date = new Date().toISOString().split('T')[0];
      const fileName = `timesheet_${date}.xlsx`;
      
      const fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, res.data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await FileSystem.getContentUriAsync(fileUri).then((contentUri) => {
        Sharing.shareAsync(contentUri);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>
          {/* time icon */}
          <Icon
            as={<Ionicons name="time-outline" />}
            size="lg"
            color="blue.500"
            style={{ marginBottom: 10 }}
          />
          {/* seperate */}
          
          TimeSheet View</Text>
        {/* Separator */}
        <View
          style={styles.separator} 
        />
        {/* set up table boundry */}
        <View style={{ width: "85%" }}>
          {/* Punch in button on left and punch out button on the right, both large */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              style={{ width: "45%", height: 100 }}
              onPress={handleTimeSheetDownload}
            >
              <Text style={{ fontSize: 20 }}>
                {/* card icon */}
                <Icon
                  as={<Ionicons name="time-outline" />}
                  size="lg"
                  color="blue.500"
                  style={{ marginBottom: 10 }}
                />
                {/* seperate */}
                <Text style={{ marginLeft: 10 }}>
                Download</Text>
              </Text>
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
});
