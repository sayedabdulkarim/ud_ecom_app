import { View, Text, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { colors, defaultStyle, formHeading } from "../../styles/common";
import Header from "../../component/Header";
import Loader from "../../component/Loader";
import OrderItem from "../../component/OrderItem";
import { Headline } from "react-native-paper";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../apiSlices/orderApiSlice";
import { useDispatch } from "react-redux";
import { showToast } from "../../utils/commonHelper";

const AdminOrders = ({ navigation }) => {
  //misc
  const isFocused = useIsFocused();
  const { data: orders, isLoading, isError, refetch } = useGetAllOrdersQuery();
  const dispatch = useDispatch();

  //rtq query n mutation
  const [updateOrderStatus, { isLoading: isUpdating, isSuccess }] =
    useUpdateOrderStatusMutation();

  //   const { loading, orders } = useGetOrders(isFocused, true);

  const processOrderLoading = false;
  //   const processOrderLoading = useMessageAndErrorOther(
  //     dispatch,
  //     navigation,
  //     "adminpanel"
  //   );

  const updateStatusHandler = async (id) => {
    console.log(id, " iddd");
    try {
      // Call the mutation with the order ID and the new status
      const response = await updateOrderStatus({ orderid: id }).unwrap();
      refetch();
      // Display a success toast with the response message
      showToast({
        type: "success",
        text1: "Update Successful",
        text2: response.message || "Order status updated successfully!",
        duration: 5000,
      });

      // Here you might want to update local state or refetch data as necessary
    } catch (error) {
      console.error("Failed to update order status", error);
      // Display an error toast with the error message
      const errorMessage =
        error?.data?.message ||
        "Failed to update the order status. Please try again.";
      showToast({
        type: "error",
        text1: "Update Failed",
        text2: errorMessage,
        duration: 5000,
      });
    }
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
        <Text style={formHeading} onPress={() => console.log({ orders })}>
          All Orders
        </Text>
      </View>

      {isLoading || isUpdating ? (
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
                  updateHandler={updateStatusHandler}
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
