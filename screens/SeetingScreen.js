import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SeetingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:'white'}}>SeetingScreen</Text>
    </View>
  )
}

export default SeetingScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#121111',
    justifyContent:'center',
    alignItems: 'center'
  }
})