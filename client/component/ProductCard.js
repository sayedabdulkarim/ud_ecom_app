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
import { useSelector, useDispatch } from "react-redux";
import { isInCart } from "../utils/commonHelper";

const ProductCard = ({
  id,
  idx,
  image,
  stock,
  name,
  price,
  addToCartHandler,
  navigateHandler,
  item,
}) => {
  const { cartItems } = useSelector((state) => state.orderReducer);
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
          // disabled
          disabled={item?.stock === 0 || isInCart(cartItems, id)}
          onPress={() => addToCartHandler(item)}
        >
          <Button
            textColor={idx % 2 === 0 ? colors.color1 : colors.color2}
            // onPress={() => addToCartHandler(id, stock)}
            style={[
              styles.btn,
              item?.stock === 0 ||
                (isInCart(cartItems, item?._id) && styles.btnDisabled),
            ]}
            labelStyle={[
              styles.btnText,
              item?.stock === 0 && styles.btnTextDisabled,
            ]}
          >
            {item?.stock === 0
              ? "Out Of Stock"
              : isInCart(cartItems, id)
              ? "Added to Cart"
              : "Add To Cart"}
          </Button>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  btn: {
    // backgroundColor: colors.color3,
    // borderRadius: 100,
    // padding: 5,
    // marginVertical: 35,
    // borderWidth: 1,
    // borderColor: "red",
    // marginTop: 1,
  },
  btnDisabled: {
    // Styles for disabled button, if needed to adjust background etc.
    opacity: 0.5, // Example to make button look disabled
  },
  btnText: {
    // color: "#FFFFFF", // Ensuring text is white
  },
  btnTextDisabled: {
    // color: "#FFFFFF", // Keeping text white even when disabled
  },
});
