    import {
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    } from "react-native";
    import React from "react";
    import { AntDesign, Entypo } from "@expo/vector-icons";
    import { useNavigation } from "@react-navigation/native";

    const GSThirdScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#3F384C" }}>
        <Image
            source={require("../assets/gs3.png")}
            style={{ width: 429, height: 429, marginTop: 50 }}
        />
        <Text
            style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 20,
            color: "white",
            }}
        >
            Welcome to our app!
        </Text>
        <Text
            style={{
            fontSize: 20,
            marginTop: 10,
            color: "white",
            paddingHorizontal: 40,
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: 26,
            }}
        >
            You can like and share event post
            <Text> Platform to know about events </Text>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
            happening in college
            </Text>
        </Text>

        <Text style={{ marginTop: 25 }}>
            <Entypo name="dot-single" size={40} color="white" />
            <Entypo name="dot-single" size={40} color="white" />
            <Entypo name="dot-single" size={40} color="blue" />
        </Text>

        <View style={styles.arrowRContainer}>
            <Pressable onPress={() => navigation.navigate("FirstScreen")}>
            <AntDesign name="arrowright" size={48} color="white" />
            </Pressable>
        </View>
        <View style={styles.arrowLContainer}>
            <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={48} color="white" />
            </Pressable>
        </View>
        </View>
    );
    };

    export default GSThirdScreen;

    const styles = StyleSheet.create({
    arrowRContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    arrowLContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
    },
    });
