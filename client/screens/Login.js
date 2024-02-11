import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../apiSlices/userApiSlice";
import { setAuthenticated, setCredentials } from "..//slices/authSlice";
// import { handleShowAlert } from "../../utils/commonHelper";
// import { setPropertiesList } from "../../slices/propertySlice";

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
      console.log({ user });
      navigation.navigate("profile");
      dispatch(setCredentials(user));
      dispatch(setAuthenticated(true));
      showToast({
        type: "success",
        text1: user.message,
        text2: "Login Successful!",
        duration: 5000,
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

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigation.navigate("profile");
  //   }
  // }, [isAuthenticated, navigation]);

  // useFocusEffect(() => {
  //   if (isAuthenticated) {
  //     // If the user becomes authenticated, reset the stack to the 'Profile' screen
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: "Profile" }],
  //       })
  //     );
  //   } else {
  //     // If the user is not authenticated, reset the stack to the 'Login' screen
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: "Login" }],
  //       })
  //     );
  //   }
  // }, [isAuthenticated, navigation, dispatch]);

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        {/* heading  */}
        <Text onPress={() => console.log({ userInfo, isAuthenticated })}>
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
