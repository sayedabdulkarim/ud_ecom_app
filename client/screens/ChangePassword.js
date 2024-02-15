import { View, Text, Alert } from "react-native"; // Import Alert for feedback
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
import { useDispatch } from "react-redux";
import { useChangepasswordMutation } from "../apiSlices/userApiSlice";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // Removed dispatch if not used elsewhere, ensure to remove unused imports to keep your code clean.
  // const dispatch = useDispatch();

  // Destructure the mutate function from useChangepasswordMutation hook
  const [changepassword, { isLoading, isSuccess, isError, error }] =
    useChangepasswordMutation();

  const submitHandler = async () => {
    if (oldPassword && newPassword) {
      try {
        // Call the changepassword mutation with the old and new password
        const response = await changepassword({
          oldPassword,
          newPassword,
        }).unwrap();
        console.log({ response }, " res from change passwoed");
        // Display the success message from the server
        Alert.alert(
          "Success",
          response.message || "Password changed successfully"
        );
        // Optionally reset password fields
        setOldPassword("");
        setNewPassword("");
      } catch (err) {
        console.log({ err }, " err from change passwoed");
        // Display the error message from the server
        Alert.alert("Error", err.data ? err.data.message : "An error occurred");
      }
    }
  };

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>Change Password</Text>
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
