import { View, Text, ScrollView } from "react-native";
import React from "react";
import { colors, defaultStyle, formHeading } from "../../styles/common";
import Header from "../../component/Header";
import Loader from "../../component/Loader";
import OrderItem from "../../component/OrderItem";
import { Headline } from "react-native-paper";
// import { useGetOrders, useMessageAndErrorOther } from "../../utils/hooks";
// import { useIsFocused } from "@react-navigation/native";
// import { useDispatch } from "react-redux";
// import { processOrder } from "../../redux/actions/otherAction";

const AdminOrders = ({ navigation }) => {
  //   const isFocused = useIsFocused();
  //   const dispatch = useDispatch();

  const loading = false;
  //   const orders = [];
  const orders = [
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
    {
      _id: "klmno",
      shippingInfo: {
        address: "101 Pineapple Place",
        city: "Chennai",
        country: "India",
        pinCode: "600001",
      },
      createdAt: new Date(),
      orderStatus: "processing",
      paymentMethod: "Online",
      totalAmount: 3000,
    },
    {
      _id: "pqrst",
      shippingInfo: {
        address: "202 Mango Lane",
        city: "Kolkata",
        country: "India",
        pinCode: "700001",
      },
      createdAt: new Date(),
      orderStatus: "cancelled",
      paymentMethod: "COD",
      totalAmount: 1000,
    },
  ];
  //   const { loading, orders } = useGetOrders(isFocused, true);

  const processOrderLoading = false;
  //   const processOrderLoading = useMessageAndErrorOther(
  //     dispatch,
  //     navigation,
  //     "adminpanel"
  //   );

  const updateHandler = (id) => {
    // dispatch(processOrder(id));
  };
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
        <Text style={formHeading}>All Orders</Text>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            padding: 10,
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.length > 0 ? (
              orders.map((item, index) => (
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
                  admin={true}
                  updateHandler={updateHandler}
                  loading={processOrderLoading}
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

export default AdminOrders;
