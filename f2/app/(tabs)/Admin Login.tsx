import React, { useEffect, useState } from "react";
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
import Toast from 'react-native-toast-message';

import { AppContext } from "../_layout";

import { DefaultService } from "../client";

const AdminSignInScreen = () => {
  
  const { isUser, setIsUser, isAdmin, setIsAdmin } = React.useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const linkTo = useLinkTo();
  
  const showLoginSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Login success',
      visibilityTime: 1000
    });
  }


  const handleSignIn = async () => {
    const res = await DefaultService.adminSigninApiV1AdminSigninPost({admin_email: email, admin_password: password});
    OpenAPI.TOKEN = res.token?.access_token;
    if (res.token?.access_token) {
      showLoginSuccess();
      setEmail("");
      setPassword("");
      setIsAdmin(true);
      linkTo('/AdminTimeDash');
    }

    // TODO error handling
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container} >
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
        <Text style={styles.title}>Admin Login</Text>
        {/* test button */}
        {/* <Button title="Test" onPress={ClientTestFunc} />  */}

        {/* spacer */}
        <View style={{ height: 10 }} />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <Button onPress={handleSignIn} style={styles.button}>
          <Text>Sign In</Text>
        </Button>
        {/* Warnings */}
        <View style={{ height: 10 }} />
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#eee" ,
  },
  input: {
    marginBottom: 10,
    color: "#eee" ,
  },
  button: {
    marginTop: 20,
  },
});

export default AdminSignInScreen;
