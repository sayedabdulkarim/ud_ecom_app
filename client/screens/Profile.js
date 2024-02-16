import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import {
  colors,
  defaultImg,
  defaultStyle,
  formHeading,
} from "../styles/common";
import { Avatar, Button } from "react-native-paper";
import ButtonBox from "../component/ButtonBox";
import Footer from "../component/Footer";
import Loader from "../component/Loader";
import {
  useGetUserProfileQuery,
  useUpdateprofilepicMutation,
} from "../apiSlices/userApiSlice";
import { logOutUser, setIsReload } from "../slices/authSlice";
import { convertImageToBase64, showToast } from "../utils/commonHelper";

const Profile = ({ navigation, route }) => {
  //misc
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const { userInfo, isAuthenticated, isReload } = useSelector(
    (state) => state.authReducer
  );
  //state
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  //query n mutation
  const {
    data: userProfile,
    isLoading,
    isError,
    refetch,
  } = useGetUserProfileQuery();
  const [updateProfilePic, { isLoading: isUpdatingPic }] =
    useUpdateprofilepicMutation();
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

  const handleUpdateProfilePic = useCallback(async (imageUri) => {
    try {
      if (!imageUri) {
        showToast({
          type: "error",
          text1: "No image selected",
        });
        return;
      }

      let base64Avatar = imageUri;

      if (!imageUri.startsWith("data:")) {
        base64Avatar = await convertImageToBase64(imageUri);
      }

      // Call the mutation with the base64 encoded image
      await updateProfilePic({ file: base64Avatar }).unwrap();

      // If successful, refetch the user profile data to update the UI
      refetch();

      showToast({
        type: "success",
        text1: "Profile picture updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile picture:", error);
      showToast({
        type: "error",
        text1: "Failed to update profile picture",
        text2: error.data?.message || "Please try again later.",
      });
    }
  }, []);

  //async
  useEffect(() => {
    if (route.params?.image) setAvatar(route.params.image);
  }, [route.params]);

  useEffect(() => {
    if (userProfile && !isError) {
      const { name, email, avatar } = userProfile?.data;

      setName(name || "");
      setEmail(email || "");
      setAvatar(avatar?.url || defaultImg);
    }
  }, [userProfile, isError]);

  useEffect(() => {
    if (isReload) {
      refetch();
      dispatch(setIsReload(false));
    }
  }, [isReload, refetch]);

  useFocusEffect(
    useCallback(() => {
      console.log(
        {
          params: route.params,
        },
        " checkkkk"
      );
      const updateAndRefetchProfile = async () => {
        if (route.params?.image) {
          try {
            await handleUpdateProfilePic(route.params.image);
          } catch (error) {
            console.error("Failed to update profile picture:", error);
          }
        }
      };

      updateAndRefetchProfile();
    }, [route.params])
  );

  return (
    <>
      <View style={defaultStyle}>
        {/* heading  */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={formHeading}
            onPress={() =>
              console.log(
                {
                  userInfo,
                  params: route.params,
                  state: navigation.getState(),
                },
                " userInfo"
              )
            }
          >
            Profile
          </Text>
          {/* <Text style={formHeading} onPress={() => handleUpdateProfilePic()}>
            TEST
          </Text> */}
          {/* <Text style={formHeading} onPress={() => getJwtToken()}>
            TEST
          </Text> */}
        </View>
        {/* loading */}
        {isLoading || isUpdatingPic ? (
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
                {userInfo?.data?.role === "admin" && (
                  <ButtonBox
                    handler={() => navigateHandler("Admin")}
                    reverse
                    icon={"view-dashboard"}
                    text={"Admin"}
                  />
                )}
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
