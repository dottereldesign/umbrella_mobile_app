// src/navigation/AppNavigator.tsx
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import NewsletterScreen from "../screens/NewsletterScreen";
import AccountScreen from "../screens/AccountScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "react-native-vector-icons";
import { RootStackParamList } from "./types";

const Tab = createBottomTabNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Newsletter") {
              iconName = "mail-outline";
            } else if (route.name === "Account") {
              iconName = "person-outline";
            } else if (route.name === "Settings") {
              iconName = "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Newsletter" component={NewsletterScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
