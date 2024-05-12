import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EventScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{color : 'white'}}>EventScreen</Text>
    </View>
  )
}

export default EventScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#121111',
    justifyContent:'center',
    alignItems: 'center'
  }
})