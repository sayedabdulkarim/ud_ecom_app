import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ConfirmOrderItem = ({ price, quantity, image, name }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: 50,
          height: 50,
          resizeMode: "contain",
        }}
      />

      <Text
        style={{ maxWidth: 100, flexShrink: 1 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text>{quantity}</Text>
        <Text
          style={{
            marginHorizontal: 10,
          }}
        >
          {"X"}
        </Text>
        <Text>₹ {price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default ConfirmOrderItem;

const styles = StyleSheet.create({});
