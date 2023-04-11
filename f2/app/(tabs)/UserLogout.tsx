import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Button,
  Input,
  Text,
  NativeBaseProvider,
  Image,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { OpenAPI } from '../client/core/OpenAPI';
import { useLinkTo } from "@react-navigation/native";

import { AppContext } from "../_layout";

import { DefaultService } from "../client";

const SignOutScreen = () => {
  
  const { isUser, setIsUser, isAdmin, setIsAdmin } = React.useContext(AppContext);

  const linkTo = useLinkTo();

  const handleSignOut = async () => {
    try {
      // Call the API to sign out the user
      await DefaultService.UserSignoutApiV1SignoutPost();
      setIsAdmin(false);
      setIsUser(false);
      OpenAPI.TOKEN = "";
      // Display the sign out message
      alert("You have been signed out");
      // Redirect to the home page
      linkTo('/');
    } catch (error) {
      // Handle any errors that occur during the sign out process
      console.error(error);
    }
  };
  

  return (
    <NativeBaseProvider>
      <Container style={styles.container} >
        {/* logo from assets  */}
        {/* <Image
            source={require("../../assets/images/logo.jpg")}
            style={{ width: 200, height: 200 }}
            /> */}
        {/* vector logo from font awesome */}
        {/* <FontAwesome name="user-circle" size={200} color="black" /> */}

        <View
          style={{ flexDirection: "row", backgroundColor: "#eee", padding: 20 }}
        >
          <FontAwesome name="clock-o" size={100} color="black" />
          {/* padding */}
            <View style={{ width: 20 }} />
          <FontAwesome name="vcard" size={100} color="black" />
        </View>

        {/* Login Section */}
        <Text style={styles.title}>Royal Time Portal - User Log Out</Text>
        {/* test button */}
        {/* <Button title="Test" onPress={ClientTestFunc} />  */}

        {/* medium text area */}
        <View style={{ width: "70%" }}>
          {/* medium text */}
          {/* center it */}
        </View>
        {/* spacer */}
        <View style={{ height: 10 , marginBottom: 30}}>
        <Button onPress={handleSignOut} style={styles.button}>
          <Text>Sign Out</Text>
        </Button>
        </View>
        </Container>
    </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      alignSelf: "center",
      width: "90%",
      maxWidth: 500,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: "white" ,
    },
    input: {
      color: "white" ,
      backgroundColor: "gray",
      overflow: "hidden",
      borderRadius: 0,
      borderWidth: 0,
    },
    button: {
      marginTop: 30,
    },
  });

export default SignOutScreen;