import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  inputStyling,
  formStyles as styles,
  defaultImg,
} from "../styles/common";
import { Button, TextInput, Avatar } from "react-native-paper";
import Footer from "../component/Footer";
import { useRegisterUserMutation } from "../apiSlices/userApiSlice";
import { setAuthenticated, setCredentials } from "..//slices/authSlice";
import { convertImageToBase64, showToast } from "../utils/commonHelper";

const Signup = ({ route, navigation }) => {
  //misc
  const [signup, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );
  //state
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  //misc
  const disableBtn =
    !name || !email || !password || !address || !city || !country || !pinCode;
  const loading = false;

  //func
  // const submitHandler = () => {
  //   const myForm = new FormData();

  //   myForm.append("name", name);
  //   myForm.append("email", email);
  //   myForm.append("password", password);
  //   myForm.append("address", address);
  //   myForm.append("city", city);
  //   myForm.append("country", country);
  //   myForm.append("pinCode", pinCode);

  //   if (avatar !== "") {
  //     myForm.append("file", {
  //       uri: avatar,
  //       type: mime.getType(avatar),
  //       name: avatar.split("/").pop(),
  //     });
  //   }
  //   console.log({ myForm });
  // };

  // const submitHandler = async () => {
  //   try {
  //     const myForm = new FormData();

  //     myForm.append("name", name);
  //     myForm.append("email", email);
  //     myForm.append("password", password);
  //     myForm.append("address", address);
  //     myForm.append("city", city);
  //     myForm.append("country", country);
  //     myForm.append("pinCode", pinCode);

  //     const formData = {
  //       name,
  //       email,
  //       password,
  //       address,
  //       city,
  //       country,
  //       pinCode,
  //       avatar, // Make sure your API can handle the avatar format you're sending
  //     };

  //     console.log({ formData });
  //     const user = await signup(formData).unwrap();

  //     dispatch(setCredentials(user));
  //     dispatch(setAuthenticated(true));

  //     showToast({
  //       type: "success",
  //       text1: "Signup Successful!",
  //       text2: "Welcome to the app!",
  //       duration: 5000,
  //     });

  //     // // Reset the navigation stack and navigate to the profile screen
  //     navigation.reset({
  //       index: 0, // Resets the stack to have only one route
  //       routes: [{ name: "profile" }], // Sets the first (and only) route to be 'profile'
  //     });
  //   } catch (error) {
  //     // Handle signup failure
  //     console.error(error);
  //     dispatch(setCredentials(null));
  //     dispatch(setAuthenticated(false));
  //     showToast({
  //       type: "error",
  //       text1: "Signup Failed",
  //       text2: error.data
  //         ? error.data.message
  //         : "An error occurred. Please try again.",
  //       duration: 5000,
  //     });
  //   }
  // };

  const submitHandler = async () => {
    console.log("Called");
    try {
      let base64Avatar = avatar;

      if (avatar && !avatar.startsWith("data:")) {
        base64Avatar = await convertImageToBase64(avatar);
      }

      const avatarData = {
        public_id: `avatar_${Date.now()}`, // Creates a string like "avatar_1615321356259"
        url: base64Avatar,
      };
      // Assuming you are sending JSON to your API
      const formData = {
        name,
        email,
        password,
        address,
        city,
        country,
        pinCode,
        avatar: avatarData, // Now sending the avatar as a base64 string
      };

      console.log({ formData });
      const user = await signup(formData).unwrap();

      dispatch(setCredentials(user));
      dispatch(setAuthenticated(true));

      showToast({
        type: "success",
        text1: "Signup Successful!",
        text2: "Welcome to the app!",
        duration: 5000,
      });

      // // Reset the navigation stack and navigate to the profile screen
      navigation.reset({
        index: 0, // Resets the stack to have only one route
        routes: [{ name: "profile" }], // Sets the first (and only) route to be 'profile'
      });
    } catch (error) {
      // Handle signup failure
      console.error(error);
      dispatch(setCredentials(null));
      dispatch(setAuthenticated(false));
      showToast({
        type: "error",
        text1: "Signup Failed",
        text2: error.data
          ? error.data.message
          : "An error occurred. Please try again.",
        duration: 5000,
      });
    }
  };

  // const loading = useMessageAndErrorUser(navigation, dispatch, "profile");

  useEffect(() => {
    if (route.params?.image) setAvatar(route.params.image);
  }, [route.params]);

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        {/* heading  */}

        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text style={formHeading}>Sign Up</Text>
        </View>

        {/* form  */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
            elevation: 10,
            borderRadius: 10,
            backgroundColor: colors.color3,
          }}
        >
          <View style={{ minHeight: 900 }}>
            <Avatar.Image
              style={{
                alignSelf: "center",
                backgroundColor: colors.color1,
              }}
              size={80}
              source={{
                uri: avatar ? avatar : defaultImg,
              }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("camera")}>
              <Button textColor={colors.color1}>Change Photo</Button>
            </TouchableOpacity>

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
              secureTextEntry={true}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
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
              loading={loading}
              textColor={colors.color2}
              disabled={disableBtn}
              style={styles.btn}
              onPress={submitHandler}
            >
              Sign Up
            </Button>

            <Text style={styles.or}>OR</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={styles.link}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* form  */}
      </View>

      <Footer activeRoute="profile" />
    </>
  );
};

export default Signup;
