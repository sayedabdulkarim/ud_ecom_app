import { View, Text } from "react-native";
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
// import { useDispatch } from "react-redux";
// import { updatePassword } from "../redux/actions/otherAction";
// import { useMessageAndErrorOther } from "../utils/hooks";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  //   const dispatch = useDispatch();
  //   const loading = useMessageAndErrorOther(dispatch);
  const loading = false;

  const submitHandler = () => {
    console.log({
      oldPassword,
      newPassword,
    });
    // dispatch(updatePassword(oldPassword, newPassword));
    // setOldPassword("");
    // setNewPassword("");
  };
  return (
    <View style={defaultStyle}>
      <Header back={true} />
      {/* Heading */}
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
          loading={loading}
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
