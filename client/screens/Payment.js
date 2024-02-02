import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle } from "../styles/common";
import Header from "../component/Header";
import Heading from "../component/Heading";
import { Button, RadioButton } from "react-native-paper";

const Payment = ({ navigation, route }) => {
  //misc
  const isAuthenticated = false;
  //state
  const [paymentMethod, setPaymentMethod] = useState("COD");
  //func
  const redirectToLogin = () => {
    navigation.navigate("login");
  };
  const handleCODPayment = () => {};
  const handleOnlinePayment = () => {};

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <Heading
        text1="Payment"
        text2="Method"
        containerStyles={{
          paddingTop: 70,
        }}
      />
      <View style={styles.container}>
        <RadioButton.Group
          value={paymentMethod}
          onValueChange={setPaymentMethod}
        >
          <View style={styles.radioStyle}>
            <Text style={styles.radioStyleText}>Cash On Delivery</Text>
            <RadioButton color={colors.color1} value="COD" />
          </View>
          <View style={styles.radioStyle}>
            <Text style={styles.radioStyleText}>ONLINE</Text>
            <RadioButton color={colors.color1} value="ONLINE" />
          </View>
        </RadioButton.Group>
      </View>

      {/*  */}
      <TouchableOpacity
        onPress={
          !isAuthenticated
            ? redirectToLogin
            : paymentMethod === "COD"
            ? handleCODPayment
            : handleOnlinePayment
        }
      >
        <Button
          style={styles.btn}
          textColor={colors.color2}
          icon={
            paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"
          }
        >
          {paymentMethod === "COD" ? "Place Order " : "Pay"}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    flex: 1,
    justifyContent: "center",
  },

  radioStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  radioStyleText: {
    fontWeight: "600",
    fontSize: 18,
    textTransform: "uppercase",
    color: colors.color2,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    margin: 10,
    padding: 5,
  },
});