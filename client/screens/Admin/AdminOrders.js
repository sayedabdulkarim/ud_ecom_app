import { View, Text, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { colors, defaultStyle, formHeading } from "../../styles/common";
import Header from "../../component/Header";
import Loader from "../../component/Loader";
import OrderItem from "../../component/OrderItem";
import { Headline } from "react-native-paper";
import { useGetAllOrdersQuery } from "../../apiSlices/orderApiSlice";
// import { useGetOrders, useMessageAndErrorOther } from "../../utils/hooks";
// import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
// import { processOrder } from "../../redux/actions/otherAction";

const AdminOrders = ({ navigation }) => {
  //misc
  const isFocused = useIsFocused();
  const { data: orders, isLoading, isError, refetch } = useGetAllOrdersQuery();
  const dispatch = useDispatch();

  //   const { loading, orders } = useGetOrders(isFocused, true);

  const processOrderLoading = false;
  //   const processOrderLoading = useMessageAndErrorOther(
  //     dispatch,
  //     navigation,
  //     "adminpanel"
  //   );

  const updateHandler = (id) => {
    console.log(id, " iddd");
  };

  //async
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
        <Text style={formHeading}>All Orders</Text>
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
              orders?.orders.map((item, index) => (
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
