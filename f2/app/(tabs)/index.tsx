import React, { useEffect, useState } from "react";
import { StyleSheet, View} from "react-native";
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

const SignInScreen = () => {

  // image from assets and fix to window width
  const logo = require('../../assets/images/repairlogo.jpg');
  
  const { isUser, setIsUser, isAdmin, setIsAdmin } = React.useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 

  const linkTo = useLinkTo();

  const handleSignIn = async () => {
    const res = await DefaultService.signinApiV1SigninPost({user_name: username, user_password: password});
    OpenAPI.TOKEN = res.token?.access_token;
    setUsername("");
    setPassword("");
    setIsUser(true);
    if (res.token?.access_token) {
      linkTo('/Dashboard');
    }

    // TODO error handling
  };

  return (
    <NativeBaseProvider>
      <Container style={styles.container} >
        {/* logo from assets  */}

        <View style={{ flexDirection: "row", backgroundColor: "#eee", padding: 20 }}>
        <Image source={logo} style={{ width: 200, height: 200 }} />
          {/* padding */}
          <View style={{ width: 20 }} />
        </View>



        {/* Login Section */}
        <Text style={styles.title}>Royal Time Portal - User Login</Text>
        {/* test button */}
        {/* <Button title="Test" onPress={ClientTestFunc} />  */}

        {/* medium text area */}
        <View style={{ width: "70%" }}>
          {/* medium text */}
          {/* center it */}
          <Text style={{ fontSize: 15, textAlign: "center", color: "#eee", marginBottom: 30 }}>
            Please enter your login credentials below to access the Royal Time Portal.
          </Text>
        </View>
        {/* spacer */}
        <View style={{ height: 10 , marginBottom: 30}}>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
          keyboardType="username"
        />
        </View>
        <View style={{ height: 10 }}>
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        </View>
        <Button onPress={handleSignIn} style={styles.button}>
          <Text>Sign In</Text>
        </Button>
        {/* Warnings */}
        <View style={{ height: 10 }} />
        {/* container area, 70% width of screen */}
        <View style={{ width: "70%" }}>
          {/* very small text */}
          <Text style={{ fontSize: 11, color: "#eee"  }}>
          </Text>
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

export default SignInScreen;
