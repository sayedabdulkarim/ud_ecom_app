import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../apiSlices/userApiSlice";
import { setAuthenticated, setCredentials } from "..//slices/authSlice";

import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  inputStyling,
  formStyles as styles,
} from "../styles/common";
import { Button, TextInput } from "react-native-paper";
import Footer from "../component/Footer";
import { showToast } from "../utils/commonHelper";

const Login = ({ navigation }) => {
  //misc
  const [localStore, setLocalStore] = useState(null); // Default to 'Login'
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );

  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //func

  const handleSubmit = async () => {
    try {
      const user = await login({ email, password }).unwrap();
      dispatch(setCredentials(user));
      dispatch(setAuthenticated(true));
      showToast({
        type: "success",
        text1: user.message,
        text2: "Login Successful!",
        duration: 5000,
      });

      // Reset the navigation stack and navigate to the profile screen
      navigation.reset({
        index: 0, // Resets the stack to have only one route
        routes: [{ name: "profile" }], // Sets the first (and only) route to be 'profile'
      });
    } catch (error) {
      dispatch(setCredentials(null));
      dispatch(setAuthenticated(false));
      showToast({
        type: "error",
        text1: "Login Failed",
        text2: error.message || "Please check your credentials and try again.",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("@auth_token");
      if (token) {
        // If a token is found, assume the user is logged in and set the initial route to 'Profile' or 'Home'
        setLocalStore(token); // Adjust this as needed
      }
    };

    checkToken();
  }, []);

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        {/* heading  */}
        <Text
          onPress={() => console.log({ userInfo, isAuthenticated, localStore })}
        >
          Hello
        </Text>

        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text style={formHeading}>Login</Text>
        </View>

        <View style={styles.container}>
          <TextInput
            {...inputOptions}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <TextInput
            {...inputOptions}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("forgotpassword")}
          >
            <Text style={styles.forget}>Forget Password?</Text>
          </TouchableOpacity>

          <Button
            loading={isLoading}
            style={styles.btn}
            textColor={colors.color2}
            disabled={email === "" || password === ""}
            onPress={() => handleSubmit()}
          >
            Log In
          </Button>
          <Text style={styles.or}>OR</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("signup")}
          >
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default Login;
