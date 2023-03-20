import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import React from "react";

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
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
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
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // dashboard icon
              name="home"
              color={color}
            />
          ),
        }}
      />
      {/* punch tab */}
      <Tabs.Screen
        name="punch"
        options={{
          title: "Punch",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // punch icon
              name="clock-o"
              color={color}
            />
          ),
        }}
      />
      {/* account tab */}
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // account icon
              name="user"
              color={color}
            />
          ),
        }}
      />
      {/* AdminCreateUser tab */}
      <Tabs.Screen
        name="AdminCreateUser"
        options={{
          title: "Create User",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // wrench icon
              name="user-plus"
              color={color}
            />            
          ),
        }}
      />
      {/* AdminModifyUser tab */}
      <Tabs.Screen
        name="AdminModifyUser"
        options={{
          title: "Modify User",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // wrench icon
              name="wrench"
              color={color}
            />
          ),
        }}
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

      {/* new admin */}
      <Tabs.Screen
        name="NewAdmin"
        options={{
          title: "New Admin",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // admin icon
              name="user-secret"
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
        options={{
          title: "Admin View Ticket",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // admin view ticket icon
              name="ticket"
              color={color}
            />
          ),
        }}
      />
      {/* admin time dashboard */}
      <Tabs.Screen
        name="AdminTimeDash"
        options={{
          title: "Admin Time Dashboard",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // admin time dashboard icon
              name="dashboard"
              color={color}
            />
          ),
        }}
      />
      
      {/* login2 */}
      <Tabs.Screen
        name="login2"
        options={{
          title: "Login2",
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
        name="report"
        options={{
          title: "Report",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              // report icon
              name="file-text"
              color={color}
            />
          ),
        }}
      />
      
      

    </Tabs>
  );
}
