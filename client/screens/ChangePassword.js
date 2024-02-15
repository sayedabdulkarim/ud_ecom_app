import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  formStyles as styles,
} from "../styles/common";
import { Button, TextInput } from "react-native-paper";
import Header from "../component/Header";
import { useDispatch, useSelector } from "react-redux";
import { useChangepasswordMutation } from "../apiSlices/userApiSlice";
import { showToast } from "../utils/commonHelper";

const ChangePassword = ({ navigation }) => {
  //misc
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );
  //state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //query n mutation
  const [changepassword, { isLoading, isSuccess, isError, error }] =
    useChangepasswordMutation();

  const getJwtToken = async () => {
    try {
      const token = await AsyncStorage.getItem("@auth_token");
      const userDetails = await AsyncStorage.getItem("@user_details");
      console.log({ token, userDetails }, " fro, api slice");
      // return token || "";
    } catch (e) {
      console.error("Failed to fetch token:", e);
      // return "";
    }
  };

  const submitHandler = async () => {
    if (oldPassword && newPassword) {
      try {
        const response = await changepassword({
          oldPassword,
          newPassword,
        }).unwrap();
        console.log({ response }, " res from change passwoed");
        showToast({
          type: "success",
          text1: "Updated succesfully.",
          text2: response.message
            ? response.message
            : "Password changed successfully",
          duration: 5000,
        });
        setOldPassword("");
        setNewPassword("");
        navigation.navigate("profile");
      } catch (err) {
        console.log({ err }, " err from change passwoed");
        showToast({
          type: "error",
          text1: err.data ? error?.data?.message : "An error occurred",
          text2: "Password changing failed.",
          duration: 5000,
        });
      }
    }
  };

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text
          style={formHeading}
          onPress={() => {
            console.log({ userInfo }, " console");
          }}
        >
          Change Password
        </Text>
        <Text style={formHeading} onPress={() => getJwtToken()}>
          localStore
        </Text>
      </View>

      <View style={styles.container}>
        <TextInput
          {...inputOptions}
          placeholder="Old Password"
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          {...inputOptions}
          placeholder="New Password"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Button
          loading={isLoading}
          textColor={colors.color2}
          disabled={oldPassword === "" || newPassword === ""}
          style={styles.btn}
          onPress={submitHandler}
        >
          Change
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;
