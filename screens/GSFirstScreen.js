import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const GSFirstScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
  const navigation = useNavigation();

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
          <Pressable onPress={()=>handleIndexChanged(currentIndex+1)}>
          <AntDesign name="arrowright" size={48} color="white" />
        </Pressable>
        </View>
      )}

      {/* Second Slide */}
      {currentIndex === 1 && (
        <View style={styles.slide}>
          <Image source={require("../assets/gs2.png")} style={styles.image} />
          <Text style={styles.title}>#Tagline</Text>
          <Text style={styles.text}>
            Secure and trustable app. You can give us feedback of any sort whenever you want
          </Text>
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => renderDot(index))}
          </View>
          <Pressable onPress={()=>handleIndexChanged(currentIndex+1)}>
          <AntDesign name="arrowright" size={48} color="white" />
        </Pressable>
        </View>
      )}

      {/* Third Slide */}
      {currentIndex === 2 && (
        <View style={styles.slide}>
          <Image source={require("../assets/gs3.png")} style={styles.image} />
          <Text style={styles.title}>Welcome to our app!</Text>
          <Text style={styles.text}>
            You can like and share event posts. Platform to know about events happening in college
          </Text>
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => renderDot(index))}
          </View>
          <Pressable onPress={()=> navigation.navigate("FirstScreen")}>
          <AntDesign name="arrowright" size={48} color="white" />
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
});

export default GSFirstScreen;