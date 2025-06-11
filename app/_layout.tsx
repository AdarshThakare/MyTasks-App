import { Stack, Tabs } from "expo-router";
import { StatusBar } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RootLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#1b2129",
            height: 60,
            paddingBottom: 5,
          },
        }}
      >
        <Tabs.Screen
          name="priority"
          options={{
            title: "Prioritized Tasks",
            tabBarIcon: ({ color }) => (
              <Ionicons name="list" size={24} color={color} />
            ),
            tabBarLabel: "Details",
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "My Tasks",
            tabBarIcon: ({ color }) => (
              <Ionicons name="add-circle" size={24} color={color} />
            ),
            tabBarLabel: "Tasks",
          }}
        />
        <Tabs.Screen
          name="status"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <Ionicons name="stats-chart" size={24} color={color} />
            ),
            tabBarLabel: "Status",
          }}
        />
      </Tabs>
      <StatusBar barStyle="light-content" backgroundColor="#1b2129" />
    </>
  );
}
