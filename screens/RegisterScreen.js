import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();

  const handleChoosePhoto = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 75,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#0063AD", fontSize: 25, fontWeight: 'bold' }}>
            Register
          </Text>

          <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 8 }}>
            Register To Your Account
          </Text>
        </View>
        <View style={{justifyContent:'center',alignItems:'center',marginTop:14}}>
          <Pressable onPress={handleChoosePhoto}>
            {photo ? (
              <Image source={{ uri: photo }} style={{width:100,height:100,borderRadius:40}} />
            ) : (
              <Text>Photo not upload</Text>
            )}
          </Pressable>
        </View>
        <View style={{ marginTop: 25 }}>
          <View>
            <Text style={{ fontSize: 16, color: "#e36607" }}>Name</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                width: 300,
                borderBottomColor: "grey",
                marginVertical: 7,
              }}
              placeholder="enter your name"
              placeholderTextColor={"black"}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16, color: "#e36607", marginTop: 10 }}>
              Email
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                width: 300,
                borderBottomColor: "grey",
                marginVertical: 7,
              }}
              placeholder="enter your email"
              placeholderTextColor={"black"}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16, color: "#e36607", marginTop: 10 }}>
              Password
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                width: 300,
                borderBottomColor: "grey",
                marginVertical: 7,
              }}
              placeholder="password"
              placeholderTextColor={"black"}
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
            <Text style={{ color: "white" , fontSize: 18,textAlign:'center'}}>Register</Text>
          </Pressable>
          
          <Pressable style={{marginTop:20}} onPress={()=>navigation.goBack()}>
            <Text style={{textAlign:"center",fontSize:16,fontWeight:'bold'}}>Already Have Account? <Text style={{color: '#0063AD'}}>Sign In</Text></Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
  },
});