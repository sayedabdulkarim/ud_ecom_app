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

const Login = ({ navigation }) => {
  //misc
  const loading = false;
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //func
  const handleSubmit = () => {
    alert({
      email,
      password,
    });
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
            loading={loading}
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