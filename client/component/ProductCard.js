import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../styles/common";
import { Button } from "react-native-paper";
const ProductCard = ({
  id,
  idx,
  image,
  stock,
  name,
  price,
  addToCartHandler,
  navigateHandler,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigateHandler.navigate("productdetails", { id })}
    >
      <View
        style={{
          elevation: 5,
          width: 220,
          alignItems: "center",
          justifyContent: "space-between",
          margin: 20,
          borderRadius: 20,
          height: 330,
          backgroundColor: idx % 2 === 0 ? colors.color1 : colors.color2,
        }}
      >
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: "80%",
            height: 200,
            resizeMode: "cover",
            position: "absolute",
            left: 45,
            top: 105,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              color: idx % 2 === 0 ? colors.color2 : colors.color3,
              fontSize: 18,
              fontWeight: 300,
              maxWidth: 100,
            }}
          >
            {name}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: idx % 2 === 0 ? colors.color2 : colors.color3,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            ₹ {price.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: idx % 2 === 0 ? colors.color2 : colors.color3,
            borderRadius: 0,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            width: "100%",
          }}
        >
          <Button
            textColor={idx % 2 === 0 ? colors.color1 : colors.color2}
            onPress={() => addToCartHandler(id, stock)}
          >
            Add To Cart
          </Button>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
