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

const Forgotpassword = ({ navigation }) => {
  //misc
  const loading = false;
  //state
  const [email, setEmail] = useState("");

  //func
  const handleSubmit = () => {
    alert({
      email,
    });
    navigation.navigate("verify");
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
            loading={loading}
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
