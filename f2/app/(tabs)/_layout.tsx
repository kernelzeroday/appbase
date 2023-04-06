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

  const { isUser, setIsUser, isAdmin, setIsAdmin } = React.useContext(AppContext);

  const colorScheme = useColorScheme();

  const activeTintColor = colorScheme === "dark" ? "black" : "black";
  const inactiveTintColor = colorScheme === "dark" ? "white" : "gray";
  const backgroundColor = colorScheme === "dark" ? "#121212" : "#121212";

  console.log(isUser);
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: activeTintColor,
      tabBarInactiveTintColor: inactiveTintColor,
      tabBarStyle: { backgroundColor: backgroundColor },
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // login icon
              name="user-circle"
              color={color}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      {/* tab two */}
      <Tabs.Screen
        name="Dashboard"
        options={isUser !== null && isUser ? {
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // punch icon
              name="home"
              color={color}
            />
          ),
        }
        : { href: null }}
      />
      {/* punch tab */}
      <Tabs.Screen
        name="Punch"
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
      {/* account tab */}
      <Tabs.Screen
        name="Account"
        options={isUser !== null && isUser ? {
          title: "Account",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // account icon
              name="user"
              color={color}
            />
          ),
        }
        : { href: null }}
      />
      {/* AdminCreateUser tab */}
      <Tabs.Screen
        name="AdminCreateUser"
        options={isAdmin !== null && isAdmin ? {
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
        options={isAdmin !== null && isAdmin ? {
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
      {/* about */}
      <Tabs.Screen 
        name="About"
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

      {/* new admin */}
      <Tabs.Screen
        name="NewAdmin"
        options={isAdmin !== null && isAdmin ? {
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
      {/* contact */}
      <Tabs.Screen
        name="Contact"
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
        name="HelpTicket"
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
        options={isAdmin !== null && isAdmin ? {
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
      {/* Admin Time Dashboard */}
      <Tabs.Screen
        name="AdminTimeDash"
        options={isAdmin !== null && isAdmin ? {
          title: "Manager Dashboard",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // punch icon
              name="home"
              color={color}
            />
          ),
        }
        : { href: null }}
      />
      
      {/* Admin Login */}
      <Tabs.Screen
        name="AdminLogin"
        options={{
          title: "Admin Login",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // login icon
              name="user-circle"
              color={color}
            />
          ),
        }}
      />
      {/* report */}
      <Tabs.Screen
        name="Report"
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
      
      

    </Tabs>
  );
}
