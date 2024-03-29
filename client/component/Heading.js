import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Heading = ({ text1 = "Our", text2 = "Products", containerStyles }) => {
  return (
    <View style={containerStyles}>
      <Text
        style={{
          fontSize: 25,
        }}
      >
        {text1}
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "900",
        }}
      >
        {text2}
      </Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({});
