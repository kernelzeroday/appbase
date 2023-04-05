import { StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Button, Container, Icon, NativeBaseProvider } from "native-base";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { DefaultService } from "../client";

export default function PunchScreen() {

  const handlePunchIn = async () => {
    const res = await DefaultService.clockinApiV1ClockinPost();
  };

  const handlePunchOut = async () => {
    const res = await DefaultService.clockoutApiV1ClockoutPost();
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
          
          Clock In and Out</Text>
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
              onPress={handlePunchIn}
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
                Punch In</Text>
              </Text>
            </Button>
            <Button
              style={{ width: "45%", height: 100 }}
              onPress={handlePunchOut}
            >
              <Text style={{ fontSize: 20 }}>
                {/* punch out icon */}
                <Icon
                  as={<Ionicons name="time-outline" />}
                  size="lg"
                  color="blue.500"
                  style={{ marginBottom: 10 }}
                />
                {/* seperate */}  
                <Text style={{ marginLeft: 10 }}>

                Punch Out</Text>
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
