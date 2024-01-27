import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, defaultStyle } from "../styles/common";
import Header from "../component/Header";
import Heading from "../component/Heading";
import { Button } from "react-native-paper";
import CartItem from "../component/CartItem";

const cartItems = [
  {
    name: "whVVIKolzD",
    image: "https://static.thenounproject.com/png/524455-200.png",
    id: "1",
    product: "uMkDyQnkzWDt",
    stock: 8,
    price: 2144,
    quantity: 2,
  },
  {
    name: "TPXzEREgYY",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkXAUltzl1IumAF8kCEgFOGJz5nCSrVEfb-ZiqUQya4Q&s",
    id: "2",
    product: "tgXylUElPoZp",
    stock: 10,
    price: 2553,
    quantity: 1,
  },
  {
    name: "ctzhUcaAvM",
    image: "https://example.com/XoGxVW.jpg",
    id: "3",
    product: "dSppczdDkqjc",
    stock: 8,
    price: 2400,
    quantity: 1,
  },
  {
    name: "vvsqPqkiFW",
    image: "https://example.com/JehNpg.jpg",
    id: "4",
    product: "kjvxQlosJcdP",
    stock: 5,
    price: 4443,
    quantity: 1,
  },
  {
    name: "smxRfCoZcL",
    image: "https://example.com/woBzFP.jpg",
    id: "5",
    product: "WaUGOQSiowfd",
    stock: 8,
    price: 2070,
    quantity: 2,
  },
];

const Cart = () => {
  //misc

  //func
  const handleIncrement = () => {
    console.log("incremented");
  };
  const handleDecrement = () => {
    console.log("Decremented");
  };

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
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems?.map((item, idx) => {
            const { id, name, image, product, stock, price, quantity } = item;
            return (
              <CartItem
                name={name}
                amount={price}
                qty={quantity}
                stock={stock}
                index={idx}
                imgSrc={image}
                id={id}
                decrementHandler={() => handleDecrement()}
                incrementhandler={() => handleIncrement()}
                key={id}
                product={product}
              />
            );
          })}
        </ScrollView>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: "green",
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
          <Text>5 Items</Text>
          <Text>₹ 5 </Text>
        </View>

        <TouchableOpacity>
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
