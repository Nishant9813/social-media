import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FirstScreen from './screens/FirstScreen'
import HomeScreen from './screens/HomeScreen'
import GSFirstScreen from './screens/GSFirstScreen'
import TabNavigator from './screens/TabNavigator'

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="GSFirstscreen" component={GSFirstScreen} options={{headerShown: false}}/>
            <Stack.Screen name="FirstScreen" component={FirstScreen} options={{headerShown: false}}/>
            <Stack.Screen name="TabsHome" component={TabNavigator} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})