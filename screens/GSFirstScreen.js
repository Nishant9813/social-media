import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GSFirstScreen = () => {

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Home");
        } else {
          //token not found it show the login screen itself
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLoginStatus();
  }, []);  


  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const renderDot = (index) => (
    <Entypo
      key={index}
      name="dot-single"
      size={40}
      color={index === currentIndex ? "blue" : "white"}
    />
  );

  return (
    <Swiper
      style={styles.container}
      loop={false}
      onIndexChanged={handleIndexChanged}
      showsButtons={true}
    >
      {/* First Slide */}
      {currentIndex === 0 && (
        <View style={styles.slide}>
          <Image source={require("../assets/gs1.png")} style={styles.image} />
          <Text style={styles.title}>Welcome to our app!</Text>
          <Text style={styles.text}>
            Groups for students and faculties to stay informed about events and news
          </Text>
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => renderDot(index))}
          </View>
          <Pressable onPress={() => handleIndexChanged(currentIndex + 1)}>
            <Ionicons name="arrow-forward-circle" size={58} color="white" />
          </Pressable>
        </View>
      )}

      {/* Second Slide */}
      {currentIndex === 1 && (
        <View style={styles.slide}>
          <Pressable onPress={() => setCurrentIndex(currentIndex - 1)} style={styles.backButton}>
            <Ionicons name="arrow-back-circle-sharp" size={44} color="white" />
          </Pressable>
          <Image source={require("../assets/gs2.png")} style={styles.image} />
          <Text style={styles.title}>#Tagline</Text>
          <Text style={styles.text}>
            Secure and trustable app. You can give us feedback of any sort whenever you want
          </Text>
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => renderDot(index))}
          </View>
          <Pressable onPress={() => handleIndexChanged(currentIndex + 1)}>
            <Ionicons name="arrow-forward-circle" size={58} color="white" />
          </Pressable>
        </View>
      )}

      {/* Third Slide */}
      {currentIndex === 2 && (
        <View style={styles.slide}>
            <Pressable onPress={() => setCurrentIndex(currentIndex - 1)} style={styles.backButton}>
            <Ionicons name="arrow-back-circle-sharp" size={44} color="white" />
          </Pressable>
          <Image source={require("../assets/gs3.png")} style={styles.image} />
          <Text style={styles.title}>Welcome to our app!</Text>
          <Text style={styles.text}>
            You can like and share event posts. Platform to know about events happening in college
          </Text>
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => renderDot(index))}
          </View>
          <Pressable onPress={() => navigation.navigate("FirstScreen")}>
            <Ionicons name="arrow-forward-circle" size={58} color="white" />
          </Pressable>
        </View>
      )}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F384C",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    position: 'relative',
  },
  image: {
    width: 429,
    height: 429,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    color: "white",
    paddingHorizontal: 40,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 26,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 25,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 1, 
  },
});

export default GSFirstScreen;
