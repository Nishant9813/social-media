import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(()=>{
    const checkLoginStatus = async()=>{
      try{
        const token = await AsyncStorage.getItem("authToken");
        if(token){
          navigation.replace("Home");
        }else{
          //token not found it show the login screen itself
        }
      }catch(error){
        console.log(error);
      }
    }

    checkLoginStatus()
  },[])

  const handleLogin = () => {
    const user = {
      email: email,
      password: pass
    };
  
    axios.post("http://192.168.0.111:4000/login", user)
      .then(res => {
        console.log(res);
        const token = res.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.navigate("Home");
      })
      .catch(error => {
        if (error.response) {
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          Alert.alert("Login Error", error.response.data.message);
        } else if (error.request) {
          console.log(error.request);
          Alert.alert("Login Error", "No response received from server");
        } else {
          console.log("Error", error.message);
          Alert.alert("Login Error", "An error occurred while processing your request");
        }
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#0063AD", fontSize: 25, fontWeight: 700 }}>
            Sign In
          </Text>

          <Text style={{ fontSize: 25, fontWeight: 700, marginTop: 15 }}>
            Sign In to Your Account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, color: "#e36607" }}>Email</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                width: 300,
                borderBottomColor: "grey",
                marginVertical: 10,
                // heigh: 40 ye bhi de sakte h mvertically ki jagah
              }}
              placeholder="enter your email"
              placeholderTextColor={"black"}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View>
            <Text style={{ fontSize: 18, color: "#e36607", marginTop: 15 }}>
              Password
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                width: 300,
                borderBottomColor: "grey",
                marginVertical: 10,
                // heigh: 40 ye bhi de sakte h mvertically ki jagah
              }}
              placeholder="password"
              placeholderTextColor={"black"}
              secureTextEntry={true}
              value={pass}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#0063AD",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 10
            }}
          >
            <Text style={{ color: "white" , fontSize: 18,textAlign:'center'}}>Login</Text>
          </Pressable>
          
          <Pressable style={{marginTop:20}} onPress={()=>navigation.navigate("Register")}>
          <Text style={{textAlign:"center",fontSize:16,fontWeight:700}}>Dont Have a Account? <Text style={{color: 'blue'}}>Sign Up</Text></Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
  },
});
