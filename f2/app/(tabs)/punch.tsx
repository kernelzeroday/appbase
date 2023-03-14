import { StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Button, Container, NativeBaseProvider } from "native-base";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import React from "react";




export default function PunchScreen() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Clock In and Out</Text>
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
              onPress={() => {
                console.log("Punch in");
              }}
            >
              <Text style={{ fontSize: 20 }}>Punch In</Text>
            </Button>
            <Button
              style={{ width: "45%", height: 100 }}
              onPress={() => {
                console.log("Punch out");
              }}
            >
              <Text style={{ fontSize: 20 }}>Punch Out</Text>
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
