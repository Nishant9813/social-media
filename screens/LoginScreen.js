import {
  Button,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const navigation = useNavigation();
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
