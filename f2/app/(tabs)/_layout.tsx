import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import React from "react";

import {AppContext} from "../_layout"


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}


export default function TabLayout() {

  const { isUser, isAdmin } = React.useContext(AppContext);

  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={ isUser !== null && !isUser && isAdmin !== null && !isAdmin ? {
          title: "Login",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // login icon
              name="user-circle"
              color={color}
            />
          ),
          headerRight: () => (
            <Link href="/Admin%20Login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="gear"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }
        : { href: null }}
      />
      {/* admin time dashboard */}
      <Tabs.Screen
        name="AdminTimeDash"
        options={isAdmin ? {
          title: "Admin Time Dashboard",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // admin time dashboard icon
              name="dashboard"
              color={color}
            />
          ),
        }
        : { href: null }}
      />
      {/* user time dashboard */}
      <Tabs.Screen
        name="Dashboard"
        options={isUser !== null && isUser ? {
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // dashboard icon
              name="home"
              color={color}
            />
          ),
        }
        : { href: null }}
      />
      {/* punch tab */}
      <Tabs.Screen
        name="punch"
        options={isUser !== null && isUser ? {
          title: "Punch",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // punch icon
              name="clock-o"
              color={color}
            />
          ),
        }
        : { href: null }}
      />
      {/* AdminCreateUser tab */}
      <Tabs.Screen
        name="AdminCreateUser"
        options={isAdmin ? {
          title: "Create User",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // wrench icon
              name="user-plus"
              color={color}
            />            
          ),
        }
        : { href: null }}
      />
      {/* AdminModifyUser tab */}
      <Tabs.Screen
        name="AdminModifyUser"
        options={isAdmin ? {
          title: "Modify User",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // wrench icon
              name="wrench"
              color={color}
            />
          ),
        }
        : { href: null }}
      />

      {/* new admin */}
      <Tabs.Screen
        name="NewAdmin"
        options={isAdmin ? {
          title: "New Admin",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // admin icon
              name="user-secret"
              color={color}
            />
          ),
        }
        : { href: null }}
      />
      {/* about */}
      <Tabs.Screen 
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // about icon
              name="info-circle"
              color={color}
            />
          ),
        }}
      />

      {/* contact */}
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // contact icon
              name="envelope"
              color={color}
            />
          ),
        }}
      />
      {/* helpticket */}
      <Tabs.Screen
        name="helpticket"
        options={{
          title: "Help Ticket",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // help ticket icon
              name="ticket"
              color={color}
            />
          ),
        }}
      />
      {/* adminviewticket */}
      <Tabs.Screen
        name="adminviewticket"
        options={isAdmin ? {
          title: "Admin View Ticket",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // admin view ticket icon
              name="ticket"
              color={color}
            />
          ),
        }
        : { href: null }}
      />
      {/* report */}
      <Tabs.Screen
        name="report"
        options={isAdmin ? {
          title: "Report",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // report icon
              name="file-text"
              color={color}
            />
          ),
        }
        : { href: null }}
      />
            {/* report */}
            <Tabs.Screen
        name="Admin Login"
        options={{ href: null }}
      />
      

    </Tabs>
  );
}
