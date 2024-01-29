import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle, formHeading } from "../styles/common";
import { Avatar, Button } from "react-native-paper";
import ButtonBox from "../component/ButtonBox";
import Footer from "../component/Footer";

const user = {
  name: "Abdul",
  email: "hello@gmail.com",
};

const Profile = ({ navigation }) => {
  //misc
  const loading = false;
  //state
  const [avatar, setAvater] = useState(null);
  //fnc
  const navigateHandler = () => {
    console.log(" called");
  };
  return (
    <>
      <View style={defaultStyle}>
        {/* heading  */}
        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Profile</Text>
        </View>
        {/* loading */}
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

          <Text style={styles.name}>{user?.name}</Text>
          <Text
            style={{
              fontWeight: "300",
              color: colors.color2,
            }}
          >
            {user?.email}
          </Text>
        </View>

        {/*  */}
        <View>
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "space-between",
            }}
          >
            <ButtonBox
              handler={navigateHandler}
              text={"Orders"}
              icon={"format-list-bulleted-square"}
            />
            <ButtonBox
              handler={navigateHandler}
              reverse
              icon={"view-dashboard"}
              text={"Admin"}
            />
            <ButtonBox
              handler={navigateHandler}
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
              handler={navigateHandler}
              text={"Password"}
              icon={"pencil"}
            />
            <ButtonBox
              handler={navigateHandler}
              text={"Sign Out"}
              icon={"exit-to-app"}
            />
          </View>
        </View>
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
