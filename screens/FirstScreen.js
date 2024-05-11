import React from "react";
import {
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

const FirstScreen = () => {
  const colorScheme = 'dark';
    
  const colors = {
    background: colorScheme == "dark" ? "#171717" : "white",
    text: colorScheme === "dark" ? "white" : "#171717",
    textInput: colorScheme === "dark" ? "#171717" : "white",
    inputBackground: colorScheme === "dark" ? "white" : "#7BBADE",
    buttonBackground: colorScheme === "dark" ? "white" : "#7BBADE",
    buttonTextColor: colorScheme === "dark" ? "#171717" : "white",
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
              placeholderTextColor="#171717"
              style={[styles.inputField, { color: colors.textInput }]}
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
              placeholderTextColor="#171717"
              style={[styles.inputField, { color: colors.textInput }]}
            />
          </View>
          <Pressable
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
