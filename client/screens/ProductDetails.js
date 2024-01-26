import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../styles/common";
import Header from "../component/Header";

const ProductDetails = ({ route: { params } }) => {
  console.log({ params }, " pppppp");

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        backgroundColor: colors.color1,
      }}
    >
      <Header back={true} />
      <Text>ProductDetails</Text>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
