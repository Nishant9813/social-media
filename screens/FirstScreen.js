import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const FirstScreen = () => {
  const colorScheme = "light";

  const colors = {
    background: colorScheme == "dark" ? "white" : "black",
    text: colorScheme === "dark" ? "#3F384C" : "white",
    textInput: colorScheme === "dark" ? "white" : "#3F384C",
    inputBackground: colorScheme === "dark" ? "#7BBADE" : "white",
    buttonBackground: colorScheme === "dark" ? "#7BBADE" : "white",
    buttonTextColor: colorScheme === "dark" ? "white" : "#3F384C",
  };

  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("TabsHome");
        } else {
          //token not found it show the login screen itself
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLoginStatus();
  }, []);

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
        navigation.navigate("TabsHome");
      })
      .catch(error => {
        if (error.response) {
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{ position: "absolute", top: 50, left: 10 }}
        >
          <FontAwesome5 name="backward" size={24} color="white" />
        </Pressable>
        <View style={styles.header}>
          <Text style={[styles.headerText, { color: colors.text }]}>Event</Text>
          <Text style={[styles.subHeaderText, { color: colors.text }]}>
            Stay in the know
          </Text>
        </View>
        <Text style={[styles.infoText, { color: colors.text }]}>
          All Event Notifications at one place
        </Text>

        <View>
          <Image
            source={require("../assets/FirstS.png")}
            style={styles.image}
          />
        </View>

        <View>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <Ionicons name="mail" size={24} color={"#0063AD"} />
            <TextInput
              placeholder="Enter your Registration no."
              placeholderTextColor="#3F384C"
              style={[styles.inputField, { color: colors.textInput }]}
              value={email}
              onChangeText={(text)=>setEmail(text)}
            />
          </View>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: colors.inputBackground },
            ]}
          >
            <Fontisto name="locked" size={24} color={"#0063AD"} />
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#3F384C"
              style={[styles.inputField, { color: colors.textInput }]}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <Pressable
          onPress={handleLogin}
            style={[
              styles.button,
              { backgroundColor: colors.buttonBackground },
            ]}
          >
            <Text
              style={[styles.buttonText, { color: colors.buttonTextColor }]}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 0,
    alignItems: "center",
  },
  headerText: {
    fontSize: 55,
    fontWeight: "500",
  },
  subHeaderText: {
    fontSize: 16,
  },
  infoText: {
    marginTop: 20,
  },
  image: {
    width: 224,
    height: 255,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5,
    paddingHorizontal: 15,
    width: 300,
    gap: 10,
  },
  inputField: {
    flex: 1,
    height: 51,
    fontSize: 16,
  },
  button: {
    width: 150,
    padding: 10,
    margin: 40,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
  },
});
