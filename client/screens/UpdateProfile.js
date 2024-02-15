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

const UpdateProfile = ({ navigation }) => {
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.authReducer
  );
  const user = {};

  const [name, setName] = useState(userInfo?.data?.name);
  const [email, setEmail] = useState(userInfo?.data?.email);
  const [address, setAddress] = useState(userInfo?.data?.address);
  const [city, setCity] = useState(userInfo?.data?.city);
  const [country, setCountry] = useState(userInfo?.data?.country);
  const [pinCode, setPinCode] = useState(userInfo?.data?.pinCode?.toString());

  //   const dispatch = useDispatch();

  //   const loading = useMessageAndErrorOther(dispatch, navigation, "profile");
  const loading = false;

  const submitHandler = () => {
    console.log({
      name,
      email,
      address,
    });
    // dispatch(updateProfile(name, email, address, city, country, pinCode));
  };
  return (
    <View style={defaultStyle}>
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>Edit Profile</Text>
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
            loading={loading}
            textColor={colors.color2}
            style={styles.btn}
            onPress={submitHandler}
          >
            Update
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;
