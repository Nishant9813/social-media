import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import FirstScreen from './screens/FirstScreen'
import HomeScreen from './screens/HomeScreen'
import GSFirstScreen from './screens/GSFirstScreen'
import GSSecondScreen from './screens/GSSecondScreen'
import GSThirdScreen from './screens/GSThirdScreen'

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="GSFirstscreen" component={GSFirstScreen} options={{headerShown: false}}/>
            <Stack.Screen name="GSSecondscreen" component={GSSecondScreen} options={{headerShown: false}}/>
            <Stack.Screen name="GSThirdScreen" component={GSThirdScreen} options={{headerShown: false}}/>
            <Stack.Screen name="FirstScreen" component={FirstScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})