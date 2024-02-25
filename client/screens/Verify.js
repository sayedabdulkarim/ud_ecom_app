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
import { showToast } from "../utils/commonHelper";
import { useResetPasswordMutation } from "../apiSlices/userApiSlice";

const Verify = ({ navigation, route }) => {
  //misc
  const loading = false;
  const { useremail } = route.params;
  //state
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  //RTK Query n mutation
  const [resetPassword, { isLoading: isLoadingresetPassword }] =
    useResetPasswordMutation();

  //func
  const handleSubmit = async () => {
    // console.log({
    //   email: useremail,
    //   otp,
    //   password,
    // });
    const payload = {
      email: useremail,
      otp: Number(otp),
      newPassword: password,
    };
    try {
      const user = await resetPassword(payload).unwrap();
      console.log(user, " uswer from resetpassword");
      showToast({
        type: "success",
        text1: user.message,
        duration: 5000,
      });
      navigation.navigate("login");
    } catch (error) {
      console.log({ error }, " err from resetpassword");
      const errorMessage =
        error?.data?.message ??
        "An error occurred. Please check your credentials and try again.";
      showToast({
        type: "error",
        text1: "Reset Failed",
        text2: errorMessage,
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
          <Text style={formHeading}>Reset Password</Text>
        </View>

        <View style={styles.container}>
          <TextInput
            {...inputOptions}
            placeholder="OTP"
            value={otp}
            keyboardType="number-pad"
            onChangeText={setOtp}
          />
          <TextInput
            {...inputOptions}
            placeholder="New Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <Button
            loading={isLoadingresetPassword}
            style={styles.btn}
            textColor={colors.color2}
            disabled={otp === "" || password === ""}
            onPress={() => handleSubmit()}
          >
            Reset
          </Button>
          <Text style={styles.or}>OR</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("forgotpassword")}
          >
            <Text style={styles.link}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default Verify;
