import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { useSelector, useDispatch } from "react-redux";
import { colors, defaultStyle } from "../styles/common";
import Header from "../component/Header";
import Heading from "../component/Heading";
import { Button, RadioButton } from "react-native-paper";
import {
  useCreateOrderMutation,
  useProcessPaymentMutation,
} from "../apiSlices/orderApiSlice";
import { showToast } from "../utils/commonHelper";
import { clearCart } from "../slices/ordersSlice";
import Loader from "../component/Loader";

const Payment = ({ navigation, route }) => {
  //misc
  const stripe = useStripe();
  const { itemPrice, shippingCharges, tax, totalAmount } = route.params;
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated, isReload } = useSelector(
    (state) => state.authReducer
  );
  const { cartItems } = useSelector((state) => state.orderReducer);

  //state
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loaderLoading, setLoaderLoading] = useState(false);
  //RTQ query n mutation
  const [createOrder, { isLoadingCreateOrder }] = useCreateOrderMutation();
  const [processPayment, { isLoadingProcessPayment }] =
    useProcessPaymentMutation();
  //func
  const redirectToLogin = () => {
    navigation.navigate("login");
  };
  const handleCODPayment = async () => {
    const { _id: userId, address, city, country, pinCode } = userInfo?.data;

    const newOrderItems = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.images[0] || "default_image_url",
      product: item._id,
    }));

    const payload = {
      shippingInfo: {
        address,
        city,
        country,
        pinCode,
      },
      orderItems: newOrderItems,
      userType: userId,
      paymentMethod,
      itemPrice: itemPrice,
      taxPrice: tax,
      shippingCharges,
      totalAmount,
    };
    console.log({ payload, userInfo }, "cod");

    try {
      const order = await createOrder(payload).unwrap();
      console.log(order, " order succcesss");
      showToast({
        type: "success",
        text1: "Order Successful",
        text2: "Your order has been placed!",
        duration: 5000,
      });
      dispatch(clearCart());
      navigation.navigate("home");
    } catch (error) {
      console.log({ error }, "error from create order");
      const errorMessage =
        error?.data?.message ??
        "An error occurred while placing your order. Please try again.";
      showToast({
        type: "error",
        text1: "Order Failed",
        text2: errorMessage,
        duration: 5000,
      });
    }
  };

  const handleOnlinePayment = async () => {
    const { _id: userId, address, city, country, pinCode } = userInfo?.data;

    const newOrderItems = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.images[0] || "default_image_url",
      product: item._id,
    }));

    const payload = {
      shippingInfo: {
        address,
        city,
        country,
        pinCode,
      },
      orderItems: newOrderItems,
      userType: userId,
      paymentMethod: "ONLINE",
      itemPrice: itemPrice,
      taxPrice: tax,
      shippingCharges,
      totalAmount,
    };

    try {
      const amountInSmallestUnit = Math.round((totalAmount * 100).toFixed(2));

      const paymentResponse = await processPayment({
        totalAmount: amountInSmallestUnit,
      }).unwrap();
      const client_secret = paymentResponse.client_secret;
      console.log({ paymentResponse, totalAmount }, " payyyy");
      ///
      const init = await stripe.initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: "nativeecom",
      });

      if (init.error) {
        showToast({
          type: "error",
          text1: init.error.message,
          duration: 5000,
        });
      }
      ///
      const presentSheet = await stripe.presentPaymentSheet();
      setLoaderLoading(true);
      if (presentSheet.error) {
        setLoaderLoading(false);
        showToast({
          type: "error",
          text1: presentSheet.error.message,
          duration: 5000,
        });
      }

      /////
      const { paymentIntent, error: retrieveError } =
        await stripe.retrievePaymentIntent(client_secret);

      if (paymentIntent.status === "Succeeded") {
        console.log({ paymentIntent });
        const order = await createOrder(payload).unwrap();
        console.log({
          paymentResponse,
          order,
        });
        showToast({
          type: "success",
          text1: "Payment Successful",
          text2: "Your order has been placed!",
          duration: 5000,
        });
        dispatch(clearCart());

        // handleCODPayment({})
        // showToast({
        //   type: "error",
        //   text1: "Payment Confirmation Failed",
        //   text2: retrieveError.message,
        //   duration: 5000,
        // });
      }
    } catch (error) {
      console.log({ error, totalAmount }, " errror from payment");
      const errorMessage =
        error?.data?.message ??
        "An error occurred while processing your payment. Please try again.";
      showToast({
        type: "error",
        text1: "Payment Processing Failed",
        text2: errorMessage,
        duration: 5000,
      });
    }
  };

  console.log(loaderLoading, " lllll");

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
      {/* <Loader /> */}
      {isLoadingCreateOrder ? (
        <Loader />
      ) : (
        <>
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
                paymentMethod === "COD"
                  ? "check-circle"
                  : "circle-multiple-outline"
              }
            >
              {paymentMethod === "COD" ? "Place Order " : "Pay"}
            </Button>
          </TouchableOpacity>
        </>
      )}
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
