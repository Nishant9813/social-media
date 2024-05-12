import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen';
import EventScreen from './EventScreen';
import UserScreen from './UserScreen';
import NewsScreen from './NewsScreen';
import SeetingScreen from './SeetingScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name= "Home" component={HomeScreen}/>
        <Tab.Screen name= "Event" component={EventScreen}/>
        <Tab.Screen name= "User" component={UserScreen}/>
        <Tab.Screen name= "News" component={NewsScreen}/>
        <Tab.Screen name= "Setting" component={SeetingScreen}/>
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})