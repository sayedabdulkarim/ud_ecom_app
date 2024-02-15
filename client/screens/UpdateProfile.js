import { View, Text, ScrollView } from "react-native";
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
import { useUpdateUserProfileMutation } from "../apiSlices/userApiSlice";
import { showToast } from "../utils/commonHelper";
import { setCredentials, setIsReload } from "../slices/authSlice";

const UpdateProfile = ({ navigation }) => {
  //misc
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );
  const user = {};

  //state
  const [name, setName] = useState(userInfo?.data?.name);
  const [email, setEmail] = useState(userInfo?.data?.email);
  const [address, setAddress] = useState(userInfo?.data?.address);
  const [city, setCity] = useState(userInfo?.data?.city);
  const [country, setCountry] = useState(userInfo?.data?.country);
  const [pinCode, setPinCode] = useState(userInfo?.data?.pinCode?.toString());

  //query n mutation
  const [updateUserProfile, { isLoading, isSuccess, isError, error }] =
    useUpdateUserProfileMutation();

  //func
  // const submitHandler = () => {
  //   console.log({
  //     name,
  //     email,
  //     address,
  //   });
  // };

  // const handleSubmit = async () => {
  //   try {
  //     // Call the updateUserProfile mutation with the new user information
  //     await updateUserProfile({
  //       name,
  //       email,
  //       address,
  //       city,
  //       country,
  //       pinCode,
  //     }).unwrap();
  //     // Show success feedback
  //     Alert.alert("Success", "Profile updated successfully");
  //     // You may navigate the user away from the profile update screen or perform other actions
  //   } catch (apiError) {
  //     // Handle the API error
  //     Alert.alert(
  //       "Update Failed",
  //       apiError.data?.message || "Could not update profile. Please try again."
  //     );
  //   }
  // };

  const handleSubmit = async () => {
    try {
      // Call the updateUserProfile mutation and pass in the payload
      const updatedUser = await updateUserProfile({
        name,
        email,
        address,
        city,
        country,
        pinCode,
      }).unwrap();
      console.log({ updatedUser }, " updated User");
      // Handle the successful update, for example, by showing a toast message
      showToast({
        type: "success",
        text1: updatedUser?.message,
        text2: "Your profile has been updated successfully!",
        duration: 5000,
      });
      const obj = {
        token: userInfo?.token,
        data: { ...userInfo?.data, ...updatedUser?.data },
      };
      dispatch(setCredentials(obj));
      dispatch(setIsReload(true));
      navigation.navigate("profile");
      // Optionally, navigate the user away from the update profile screen
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "profile" }], // Assuming 'profile' is the route you want to navigate to
      // });
    } catch (error) {
      console.log({ error }, " err from update profile");

      // Handle the error, for example, by showing a toast message
      const errorMessage =
        error?.data?.message ??
        "An error occurred. Please check the details and try again.";
      showToast({
        type: "error",
        text1: "Update Failed",
        text2: errorMessage,
        duration: 5000,
      });
    }
  };

  return (
    <View style={defaultStyle}>
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading} onPress={() => console.log({ userInfo })}>
          Edit Profile
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          padding: 20,
          elevation: 10,
          borderRadius: 10,
          backgroundColor: colors.color3,
        }}
      >
        <View>
          <TextInput
            {...inputOptions}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            {...inputOptions}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            {...inputOptions}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            {...inputOptions}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            {...inputOptions}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
          />

          <TextInput
            {...inputOptions}
            placeholder="Pin Code"
            value={pinCode}
            onChangeText={setPinCode}
          />

          <Button
            loading={isLoading}
            textColor={colors.color2}
            style={styles.btn}
            onPress={handleSubmit}
          >
            Update
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;
