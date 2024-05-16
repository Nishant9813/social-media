import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import 'react-native-get-random-values';


const screenDimensions = Dimensions.get("screen");

const HomeScreen = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          console.log("Authentication token not found");
          return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get("http://192.168.0.111:4000/all");
        setPosts(response.data.posts);
      } catch (error) {
        console.log("Error Fetching Posts", error);
      }
    };
    fetchAllPosts();
  }, []); // Fetch posts only once on component mount

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.111:4000/profile/${userId}`
      );
      const userData = response.data.user;
      setUser(userData);
    } catch (error) {
      console.log("Error fetching user profile", error);
    }
  };

  return (
    <View style={styles.fullbody}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Events</Text>
          <View style={styles.horizontalScroll}>
            <ScrollView horizontal={true} style={styles.scrollView2}>
              <Pressable
                style={{
                  backgroundColor: "white",
                  width: 200,
                  borderRadius: 20,
                  marginHorizontal: 3,
                  marginTop: 8,
                }}
              >
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    Ideathon
                  </Text>
                  <Image
                    source={{
                      uri: "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg",
                    }}
                    style={{
                      width: "100%",
                      height: 150,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 15,
                      gap: 5,
                    }}
                  >
                    <MaterialIcons
                      name="event-available"
                      size={24}
                      color="black"
                    />
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                        flexWrap: "nowrap",
                        gap: 0,
                      }}
                    >
                      <Text>11:30 AM - 12-30 PM</Text>
                      <Text>Mon, 17 Sept 2024</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </ScrollView>
          </View>

          <Text style={styles.title2}>News</Text>
          <Pressable
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              marginHorizontal: 3,
              marginTop: 8,
              flex: 1,
              maxWidth: "96%",
            alignItems:"center",
            }}
          >
            <View style={{height:100}}>
              <Text>News Post</Text>
            </View>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

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
  scrollView: {
    marginHorizontal: 18,
  },
  title: {
    color: "white",
    fontWeight: "700",
    fontSize: 25,
  },
  title2: {
    color: "white",
    fontWeight: "700",
    fontSize: 25,
    marginTop: 10,
  },
  horizontalScroll: {
    height: screenDimensions.height - 540,
  },
  scrollView2: {},
});
