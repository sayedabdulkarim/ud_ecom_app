import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
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
import { useForgotPasswordMutation } from "../apiSlices/userApiSlice";
import { showToast } from "../utils/commonHelper";

const Forgotpassword = ({ navigation }) => {
  //misc
  const loading = false;
  //state
  const [email, setEmail] = useState("");

  //RTK Query n mutation
  const [forgotPassword, { isLoading: isLoadingforgotPassword }] =
    useForgotPasswordMutation();

  //func
  const handleSubmit = async () => {
    console.log({ email });
    try {
      const user = await forgotPassword({ email }).unwrap();
      console.log(user, " uswer from forgotpassword");
      showToast({
        type: "success",
        text1: user.messageOne,
        text2: user.messageTwo,
        duration: 5000,
      });
      navigation.navigate("verify", {
        useremail: email,
      });
    } catch (error) {
      console.log({ error }, " err from login");
      const errorMessage =
        error?.data?.message ??
        "An error occurred. Please check your credentials and try again.";
      showToast({
        type: "error",
        text1: errorMessage,
        duration: 5000,
      });
    }
  };

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        {/* heading  */}

        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text style={formHeading}>Forgot Password</Text>
        </View>

        <View style={styles.container}>
          <TextInput
            {...inputOptions}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <Button
            loading={isLoadingforgotPassword}
            style={styles.btn}
            textColor={colors.color2}
            disabled={email === ""}
            onPress={() => handleSubmit()}
          >
            Send OTP
          </Button>
          <Text style={styles.or}>OR</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.link}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default Forgotpassword;
