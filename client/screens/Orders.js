import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { colors, defaultStyle, formHeading } from "../styles/common";
import Loader from "../component/Loader";
import { Headline } from "react-native-paper";
import OrderItem from "../component/OrderItem";
// import { useGetOrders } from "../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import Header from "../component/Header";
import { useGetAllOrdersQuery } from "../apiSlices/orderApiSlice";

const Orders = () => {
  const isFocused = useIsFocused();
  const { data: orders, isLoading, isError, refetch } = useGetAllOrdersQuery();
  const dummy = [
    {
      _id: "sdfgb",
      shippingInfo: {
        address: "123 Apple Street",
        city: "Mumbai",
        country: "India",
        pinCode: "400001",
      },
      createdAt: new Date(),
      orderStatus: "processing",
      paymentMethod: "COD",
      totalAmount: 2000,
    },
    {
      _id: "abcde",
      shippingInfo: {
        address: "456 Orange Avenue",
        city: "Delhi",
        country: "India",
        pinCode: "110001",
      },
      createdAt: new Date(),
      orderStatus: "shipped",
      paymentMethod: "Online",
      totalAmount: 1500,
    },
    {
      _id: "fghij",
      shippingInfo: {
        address: "789 Banana Blvd",
        city: "Bangalore",
        country: "India",
        pinCode: "560001",
      },
      createdAt: new Date(),
      orderStatus: "delivered",
      paymentMethod: "COD",
      totalAmount: 2500,
    },
  ];

  useEffect(() => {
    refetch();
    console.log({ orders }, " orderss");
  }, [isFocused]);

  return (
    <View
      style={{
        ...defaultStyle,
        backgroundColor: colors.color5,
      }}
    >
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading} onPress={() => console.log({ orders })}>
          Orders
        </Text>
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <View
          style={{
            padding: 10,
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders?.orders.length > 0 ? (
              // {dummy.length > 0 ? (
              //   <Text>Hello</Text>
              // dummy.map((item, index) => (
              orders?.orders?.map((item, index) => (
                <OrderItem
                  key={item._id}
                  id={item._id}
                  i={index}
                  price={item.totalAmount}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  //   orderedOn={item.createdAt.split("T")[0]}
                  orderedOn={
                    new Date(item.createdAt).toISOString().split("T")[0]
                  }
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`}
                />
              ))
            ) : (
              <Headline style={{ textAlign: "center" }}>No Orders Yet</Headline>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Orders;
