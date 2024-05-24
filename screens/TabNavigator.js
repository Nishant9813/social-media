import React from "react";
import { StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
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
import { AntDesign } from "@expo/vector-icons";
import PostScreen from "./PostScreen";




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "black",
            height: Platform.OS === "ios" ? 80 : 60, // Adjust height for iOS
            borderTopWidth: 0, // Remove top border on Android
          },
          tabBarIconStyle: {
            marginTop: Platform.OS === "ios" ? 20 : 0, // Adjust icon margin top for iOS
          },
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
    </KeyboardAvoidingView>
  );
};

const AppNavigator = () => {
  return (
    <>
  
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{
          headerTitle: "logo",
          headerTitleAlign: "left",
          headerRight: () => (
            <AntDesign
              name="message1"
              size={24}
              color="white"
              style={{ marginRight: 20}}
            />
          ),
          headerStyle : {backgroundColor:"black"},
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
    
    </>
   
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
