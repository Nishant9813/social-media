import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";
import axios from "axios";

const screenDimensions = Dimensions.get("screen");
const PostScreen = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          console.log("Authentication token not found");
          // Handle the case when the token is not available, e.g., navigate to login screen
          return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      } catch (error) {
        console.log("Error decoding token:", error);
        // Handle the error, e.g., display an error message to the user
      }
    };

    fetchUser();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const creatPost = async () => {
    try {
      try {
        const uploadedUrl = await uploadFile();

        const postData = {
          description: description,
          imageUrl: uploadedUrl,
          userId: userId,
        };

        const response = await axios.post(
          "http://192.168.0.111:4000/create",
          postData
        );

        console.log("post created", response.data);
        if (response.status === 201) {
          navigation.navigate("Home");
        }
      } catch (error) {
        console.log("error creating post", error);
      }
    } catch (error) {
      console.log("Error creating post", error);
    }
  };

  const uploadFile = async () => {
    try {
      // Ensure that 'image' contains a valid file URI
      console.log("Image URI:", image);

      const { uri } = await FileSystem.getInfoAsync(image);

      if (!uri) {
        throw new Error("Invalid file URI");
      }

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf("/") + 1);

      const ref = firebase.storage().ref().child(filename);
      await ref.put(blob);

      const downloadURL = await ref.getDownloadURL();
      // setUrl(downloadURL);
      return downloadURL;
      // Alert.alert("Photo uploaded");
    } catch (error) {
      console.log("Error:", error);
      // Handle the error or display a user-friendly message
    }
  };
  return (
   
    <View style={styles.fullbody}>
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 12,
          marginHorizontal: 10,
          // gap:100,
          borderRadius: 15,
          backgroundColor: "#212121",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://media.licdn.com/dms/image/D5603AQFf4WjxZavq-A/profile-displayphoto-shrink_800_800/0/1714369989019?e=1721260800&v=beta&t=P9-t227uop_cvkxiAQk4QHUG7Id6bZJeMtrxW_Ic2gQ",
              }}
            />
            <Text style={{ color: "white", fontWeight: 500 }}>Anyone</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Entypo name="back-in-time" size={24} color="white" />
          <Pressable
            onPress={creatPost}
            style={{
              padding: 10,
              backgroundColor: "#0072b1",
              borderRadius: 20,
              width: 80,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Post
            </Text>
          </Pressable>
        </View>
      </View>

      <TextInput
        placeholder="What do you want to talk about"
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholderTextColor={"white"}
        style={{
          margin: 15,
          padding: 10,
          fontSize: 16,
          color: "white",
          backgroundColor: "#212121",
          borderRadius: 10,
          maxHeight:300
        }}
        multiline={true}
        numberOfLines={5}
        textAlignVertical={"top"}
      />

      <View style={{alignItems:"center",justifyContent:"center"}}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: "90%", height: 240, marginVertical: 20,borderRadius:15 }}
          />
        )}
      </View>

      <Pressable
        style={{
          flexDirection: "coloumn",
          marginHorizontal: "auto",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#212121",
          width: 70,
          height:70,
          borderRadius:50,
          marginTop: 10
        }}
      >
        <Pressable
          onPress={pickImage}
          style={{
            width: 40,
            height: 40,
            // marginTop: 15,
            backgroundColor: "E0E0E0",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="perm-media" size={24} color="white" />
        </Pressable>
        <Text style={{ color: "white" }}>Media</Text>
      </Pressable>
    </ScrollView>
    </SafeAreaView>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  fullbody: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    height: screenDimensions.height - 180,
    paddingTop: StatusBar.currentHeight - 15,
    backgroundColor: "black",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
