import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/common";
import { Headline } from "react-native-paper";

const SearchItem = ({ key, imgSrc, name, price, handler }) => {
  return (
    <TouchableOpacity onPress={handler}>
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: colors.color2,
          elevation: 5,
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "row",
          marginVertical: 30,
        }}
      >
        <Image
          source={{
            uri: imgSrc,
          }}
          style={{
            width: 80,
            height: 80,
            position: "absolute",
            top: -15,
            left: 10,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            resizeMode: "contain",
          }}
        />

        <View
          style={{
            width: "80%",
            paddingHorizontal: 30,
          }}
        >
          <Text numberOfLines={1}>{name}</Text>
          <Headline
            numberOfLines={1}
            style={{
              fontWeight: "900",
            }}
          >
            ₹ {price.toFixed(2)}
          </Headline>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;

const styles = StyleSheet.create({});
