import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import EventScreen from "./EventScreen";
import NewsScreen from "./NewsScreen";
import SeetingScreen from "./SeetingScreen";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import PostScreen from "./PostScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#3F384C",
          position: "absolute",
          bottom: 25,
          left: 10,
          right: 10,
          elevation: 0,
          borderRadius: 15,
          height: 60,
          borderColor:"black"
        },
        tabBarLabelStyle: { padding: 10 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="home"
              size={20}
              color={focused ? "#5BDBF3" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="calendar"
              size={20}
              color={focused ? "#5BDBF3" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={PostScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="users"
              size={20}
              color={focused ? "#5BDBF3" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="send-o"
              size={20}
              color={focused ? "#5BDBF3" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SeetingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-outline"
              size={20}
              color={focused ? "#5BDBF3" : "white"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ 
          headerTitle: "logo",
          headerTitleAlign: "left",
          headerRight: () => (
            <AntDesign name="message1" size={24} color="white" style={{marginRight: 20}}/>
          ),
          headerStyle: {
            backgroundColor: "#3F384C",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
