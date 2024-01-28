import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle, inputStyling } from "../styles/common";
import { Button, TextInput } from "react-native-paper";
import Footer from "../component/Footer";

const Login = ({ navigation }) => {
  //misc
  const loading = false;
  const inputStyle = {
    style: inputStyling,
    mode: "outlined",
    activeOutlineColor: colors.color1,
  };

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
          <Text style={styles.heading}>Login</Text>
        </View>

        <View style={styles.container}>
          <TextInput
            {...inputStyle}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <TextInput
            {...inputStyle}
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

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: colors.color3,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color3,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 10,
  },
  forget: {
    color: colors.color2,
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: "flex-end",
    fontWeight: "100",
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 6,
  },
  or: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "100",
    color: colors.color2,
  },
  link: {
    alignSelf: "center",
    fontSize: 18,
    color: colors.color2,
    textTransform: "uppercase",
    marginVertical: 10,
    marginVertical: 20,
    // fontWeight: "100",
  },
});
