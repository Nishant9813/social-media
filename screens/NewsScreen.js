import React, { useEffect, useState, useCallback } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import {
  SimpleLineIcons,
  AntDesign,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import moment from "moment";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const screenDimensions = Dimensions.get("screen");

const NewsScreen = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

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
      fetchAllPosts();
    }
  }, [userId]);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.111:4000/profile/${userId}`
      );
      const userData = response.data.user;
      setUser(userData);
    } catch (error) {
      console.log("Error fetching user profile", error);
    }
  }, [userId]);

  const fetchAllPosts = useCallback(async () => {
    try {
      const response = await axios.get("http://192.168.0.111:4000/all");
      const reversedPosts = response.data.posts.reverse();
      const postsWithLikes = reversedPosts.map((post) => ({
        ...post,
        isLiked: post.likes.some((like) => like.user === userId),
      }));
      setPosts(postsWithLikes);
    } catch (error) {
      console.log("Error Fetching Posts", error);
    }
  }, [userId]);

  const MAX_LINES = 2;
  const [showfullText, setShowfullText] = useState(false);

  const toggleShowFullText = useCallback(() => {
    setShowfullText((prevState) => !prevState);
  }, []);

  const handleLikePost = useCallback(
    async (postId) => {
      try {
        const response = await axios.post(
          `http://192.168.0.111:4000/like/${postId}/${userId}`
        );
        if (response.status === 200) {
          const updatedPost = response.data.post;
          const updatedPosts = posts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                isLiked: updatedPost.likes.some((like) => like.user === userId),
                likesCount: updatedPost.likes.length,
              };
            }
            return post;
          });
          setPosts(updatedPosts);
        }
      } catch (error) {
        console.log("Error liking/unliking the post", error);
      }
    },
    [userId, posts]
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchAllPosts();
    } catch (error) {
      console.log("Error Fetching Posts", error);
    }
    setRefreshing(false);
  }, [fetchAllPosts]);

  return (
    <View style={styles.fullbody}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#0072b1"]}
              tintColor={"#0072b1"}
            />
          }
        >
          <View>
            {posts.map((item, index) => (
              <View key={index} style={styles.postContainer}>
                <View style={styles.userInfo}>
                  <Image
                    style={styles.userAvatar}
                    source={{ uri: item?.user?.profileImage }}
                  />
                  <View style={styles.userInfoText}>
                    <Text style={styles.userName}>{item?.user?.name}</Text>
                    <Text style={styles.userDescription}>
                      Engineer Graduate | LinkedIn Member
                    </Text>
                    <Text style={styles.postDate}>
                      {moment(item.createdAt).format("MMMM Do YYYY")}
                    </Text>
                  </View>
                </View>
                <View style={styles.postContent}>
                  <Text
                    style={[
                      styles.postDescription,
                      showfullText && { maxHeight: "100%" },
                    ]}
                    numberOfLines={showfullText ? undefined : MAX_LINES}
                  >
                    {item?.description}
                  </Text>
                  {!showfullText && (
                    <Pressable onPress={toggleShowFullText}>
                      <Text style={styles.readMore}>See more</Text>
                    </Pressable>
                  )}
                </View>
                <Image
                  style={styles.postImage}
                  source={{ uri: item?.imageUrl }}
                />
                {posts.length > 0 && item?.likesCount > 0 && (
                  <View style={styles.likesContainer}>
                    <SimpleLineIcons name="like" size={16} color="#0072b1" />
                    <Text style={styles.likesCount}>{item?.likesCount}</Text>
                  </View>
                )}

                <View style={styles.actionsContainer}>
                  <Pressable onPress={() => handleLikePost(item?._id)}>
                    <AntDesign
                      name="like2"
                      size={28}
                      color={item?.isLiked ? "#0072b1" : "gray"}
                    />
                    <Text
                      style={[
                        styles.actionText,
                        { color: item?.isLiked ? "white" : "gray" },
                      ]}
                    >
                      Like
                    </Text>
                  </Pressable>
                  <Pressable style={{ alignItems: "center" }}>
                    <FontAwesome name="comment-o" size={28} color="gray" />
                    <Text style={styles.actionText}>Comment</Text>
                  </Pressable>
                  <Pressable>
                    <Feather name="send" size={28} color="gray" />
                    <Text style={styles.actionText}>Send</Text>
                  </Pressable>
                </View>
                <View
                  style={{ height: 1, backgroundColor: "gray", marginTop: 10 }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullbody: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 10,
  },
  container: {
    height: screenDimensions.height - 180,
    backgroundColor: "black",
  },
  scrollView: {
    marginHorizontal: 18,
  },
  postContainer: {
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfoText: {
    flexDirection: "column",
    marginLeft: 10,
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
  userDescription: {
    width: 230,
    color: "gray",
    fontSize: 15,
    fontWeight: "400",
  },
  postDate: {
    color: "gray",
  },
  postContent: {
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 15,
    color: "white",
    lineHeight: 20,
  },
  readMore: {
    color: "blue",
    marginTop: 5,
  },
  postImage: {
    width: "100%",
    height: 240,
    marginBottom: 10,
    borderRadius: 10,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  likesCount: {
    color: "gray",
    marginLeft: 5,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  actionText: {
    color: "gray",
    textAlign: "center",
    marginTop: 2,
    fontSize: 12,
  },
});

export default NewsScreen;
