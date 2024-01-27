import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { cartItems } from "./Cart";
import { colors, defaultStyle } from "../styles/common";
import Header from "../component/Header";
import Heading from "../component/Heading";
import ConfirmOrderItem from "../component/ConfirmOrderItem";
import { Button } from "react-native-paper";

const ConfirmModal = () => {
  //misc
  const itemPrice = 4000;
  const shippingCharges = 200;
  const tax = 0.18 * itemPrice;
  const totalAmount = itemPrice + shippingCharges + tax;
  const navigation = useNavigation();

  return (
    <View
      style={{
        ...defaultStyle,
      }}
    >
      <Header back={true} />
      {/* heading */}
      <Heading
        text1="Confirm"
        text2="Order"
        containerStyles={{
          paddingTop: 70,
        }}
      />
      <View style={{ paddingVertical: 20, flex: 1 }}>
        <ScrollView>
          {cartItems?.map((item) => {
            const { name, image, id, product, stock, price, quantity } = item;
            return (
              <ConfirmOrderItem
                key={id}
                image={image}
                name={name}
                price={price}
                quantity={quantity}
              />
            );
          })}
        </ScrollView>
      </View>
      <PriceTag heading={"Subtotal"} value={itemPrice} />
      <PriceTag heading={"Shipping"} value={shippingCharges} />
      <PriceTag heading={"Tax"} value={tax} />
      <PriceTag heading={"Total"} value={totalAmount} />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("payment", {
            itemPrice,
            shippingCharges,
            tax,
            totalAmount,
          })
        }
      >
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 10,
          }}
          textColor={colors.color2}
          icon={"chevron-right"}
        >
          Payment
        </Button>
      </TouchableOpacity>
    </View>
  );
};

//
const PriceTag = ({ heading, value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
      }}
    >
      <Text style={{ fontWeight: "800" }}>{heading}</Text>
      <Text>
        <Text style={{ fontWeight: "900" }}>₹</Text> {value}
      </Text>
    </View>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({});
