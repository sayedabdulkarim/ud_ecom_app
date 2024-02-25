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

const Verify = ({ navigation }) => {
  //misc
  const loading = false;
  //state
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  //func
  const handleSubmit = () => {
    // alert({
    //   otp,
    //   password,
    // });
    console.log({
      otp,
      password,
    });
    // navigation.navigate("login");
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
            loading={loading}
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
