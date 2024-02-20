import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { colors, defaultStyle } from "../styles/common";
import Header from "../component/Header";
import Heading from "../component/Heading";
import { Button } from "react-native-paper";
import CartItem from "../component/CartItem";
import { decreaseQuantity, increaseQuantity } from "../slices/ordersSlice";
// export const cartItems = [
//   {
//     name: "whVVIKolzD",
//     image: "https://static.thenounproject.com/png/524455-200.png",
//     id: "1",
//     product: "uMkDyQnkzWDt",
//     stock: 8,
//     price: 2144,
//     quantity: 2,
//   },
//   {
//     name: "TPXzEREgYY",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkXAUltzl1IumAF8kCEgFOGJz5nCSrVEfb-ZiqUQya4Q&s",
//     id: "2",
//     product: "tgXylUElPoZp",
//     stock: 10,
//     price: 2553,
//     quantity: 1,
//   },
//   {
//     name: "ctzhUcaAvM",
//     image: "https://example.com/XoGxVW.jpg",
//     id: "3",
//     product: "dSppczdDkqjc",
//     stock: 8,
//     price: 2400,
//     quantity: 1,
//   },
//   {
//     name: "vvsqPqkiFW",
//     image: "https://example.com/JehNpg.jpg",
//     id: "4",
//     product: "kjvxQlosJcdP",
//     stock: 5,
//     price: 4443,
//     quantity: 1,
//   },
//   {
//     name: "smxRfCoZcL",
//     image: "https://example.com/woBzFP.jpg",
//     id: "5",
//     product: "WaUGOQSiowfd",
//     stock: 8,
//     price: 2070,
//     quantity: 2,
//   },
// ];

const Cart = () => {
  //misc
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated, isReload } = useSelector(
    (state) => state.authReducer
  );
  const { cartItems } = useSelector((state) => state.orderReducer);
  //state
  const [totalPrice, setTotalPrice] = useState(0);
  //func
  const handleIncrement = (id) => {
    dispatch(increaseQuantity(id));
  };
  const handleDecrement = (id) => {
    dispatch(decreaseQuantity(id));
  };
  //async
  //async
  useEffect(() => {
    if (cartItems && cartItems?.length) {
      let total = cartItems?.reduce(
        (prev, current) => prev + current.quantity * current.price,
        0
      );
      setTotalPrice(total);
      // itemPrice = total;
    }
  }, [cartItems]);

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      {/* header */}
      <Header emtpyCart={true} back={true} />

      {/* heading */}
      <Heading
        text1="Shopping"
        text2="Cart"
        containerStyles={{
          paddingTop: 80,
          marginLeft: 35,
        }}
      />

      <View
        style={{
          paddingVertical: 20,
          flex: 1,
          marginBottom: 20,
          //   borderWidth: 1,
          //   borderColor: "red",
        }}
      >
        <Text onPress={() => console.log({ userInfo, cartItems }, " cartttt")}>
          USER
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.length ? (
            cartItems?.map((item, idx) => {
              const { _id, name, image, product, stock, price, quantity } =
                item;
              return (
                <CartItem
                  name={name}
                  amount={price}
                  qty={quantity}
                  stock={stock}
                  index={idx}
                  imgSrc={image}
                  id={_id}
                  decrementHandler={handleDecrement}
                  incrementhandler={handleIncrement}
                  key={_id}
                  product={product}
                  navigate={navigation}
                  item={item}
                />
              );
            })
          ) : (
            <Text style={{ textAlign: "center" }}>No Items yet.</Text>
          )}
        </ScrollView>
      </View>

      <View
        style={{
          //   borderWidth: 1,
          //   borderColor: "green",
          //   position: "absolute",
          //   bottom: 0,
          //   left: 0,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 35,
          }}
        >
          {/* <Text>5 Items</Text> */}
          <Text>
            {cartItems?.length} {`${cartItems?.length > 1 ? "Items" : "Item"}`}
          </Text>
          <Text>₹ {totalPrice?.toFixed(2)} </Text>
        </View>

        <TouchableOpacity
          onPress={
            cartItems?.length > 0
              ? () => navigation.navigate("confirmmodal")
              : null
          }
        >
          <Button
            style={{
              backgroundColor: colors.color3,
              borderRadius: 100,
              padding: 5,
              margin: 30,
            }}
            icon={"cart"}
            textColor={colors.color2}
          >
            Checkout
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
