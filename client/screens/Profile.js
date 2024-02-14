import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { colors, defaultStyle, formHeading } from "../styles/common";
import { Avatar, Button } from "react-native-paper";
import ButtonBox from "../component/ButtonBox";
import Footer from "../component/Footer";
import Loader from "../component/Loader";
import { useGetUserProfileQuery } from "../apiSlices/userApiSlice";
import { logOutUser } from "../slices/authSlice";
import { showToast } from "../utils/commonHelper";

const user = {
  name: "Abdul",
  email: "hello@gmail.com",
};

const Profile = ({ navigation, route }) => {
  //misc
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );
  //state
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //query n mutation
  const { data: userProfile, isLoading, isError } = useGetUserProfileQuery();
  //fnc
  const handleLogout = () => {
    dispatch(logOutUser());
    showToast({
      type: "success",
      text1: "Logged out successfully.",
      duration: 3000,
    });
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });

    // console.log({ userInfo, userProfile, isAuthenticated }, "signing out.");
  };

  const navigateHandler = (text) => {
    switch (text) {
      case "Admin":
        navigation.navigate("adminpanel");
        break;
      case "Orders":
        navigation.navigate("orders");
        break;
      case "Profile":
        navigation.navigate("updateprofile");
        break;
      case "Password":
        navigation.navigate("changepassword");
        break;
      case "Sign Out":
        handleLogout();
        break;

      default:
        navigation.navigate("orders");
        break;
    }
  };

  //async
  useEffect(() => {
    if (route.params?.image) setAvatar(route.params.image);
  }, [route.params]);

  useEffect(() => {
    // When the user profile data is loaded and not an error
    if (userProfile && !isError) {
      const { name, email, avatar } = userProfile?.data;
      console.log({ userProfile: userProfile?.data });

      setName(name || "");
      setEmail(email || "");
      setAvatar(avatar?.url || "");
    }
  }, [userProfile, isError]);

  return (
    <>
      <View style={defaultStyle}>
        {/* heading  */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Profile</Text>
        </View>
        {/* loading */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.container}>
              <Avatar.Image
                size={100}
                style={{ backgroundColor: colors.color1 }}
                source={{
                  uri: avatar,
                }}
              />

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("camera", { updateProfile: true })
                }
              >
                <Button textColor={colors.color1}>Change Photo</Button>
              </TouchableOpacity>

              <Text style={styles.name}>{name}</Text>
              <Text
                style={{
                  fontWeight: "300",
                  color: colors.color2,
                }}
              >
                {email}
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-between",
                }}
              >
                <ButtonBox
                  handler={() => navigateHandler("Orders")}
                  text={"Orders"}
                  icon={"format-list-bulleted-square"}
                />
                <ButtonBox
                  handler={() => navigateHandler("Admin")}
                  reverse
                  icon={"view-dashboard"}
                  text={"Admin"}
                />
                <ButtonBox
                  handler={() => navigateHandler("Profile")}
                  text={"Profile"}
                  icon={"pencil"}
                />
              </View>
              {/*  */}
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  justifyContent: "space-evenly",
                }}
              >
                <ButtonBox
                  handler={() => navigateHandler("Password")}
                  text={"Password"}
                  icon={"pencil"}
                />
                <ButtonBox
                  handler={() => navigateHandler("Sign Out")}
                  text={"Sign Out"}
                  icon={"exit-to-app"}
                />
              </View>
            </View>
          </>
        )}

        {/*  */}
      </View>
      {/*  */}
      <Footer />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    color: colors.color2,
  },
});
