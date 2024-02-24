import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, formHeading } from "../../styles/common";
import Header from "../../component/Header";
import Loader from "../../component/Loader";
import ButtonBox from "../../component/ButtonBox";
import ProductListHeading from "../../component/ProductListHeading";
import ProductListItem from "../../component/ProductListItem";
import Chart from "../../component/Chart";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../apiSlices/productApiSlice";
import { showToast } from "../../utils/commonHelper";

const AdminPanel = ({ navigation }) => {
  const loadingDelete = false;

  //misc
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  //state
  const [inStock, setInStock] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);

  //query n mutation
  const {
    data: getAdminProducts,
    isLoading: isLoadingGetAdminProducts,
    isError: isErrorGetAdminProducts,
    refetch,
  } = useGetAdminProductsQuery();

  const [deleteProduct, { isLoading: isLoadingDeleteProduct }] =
    useDeleteProductMutation();

  //func
  const navigationHandler = (text) => {
    switch (text) {
      case "Category":
        navigation.navigate("categories");
        break;
      case "All Orders":
        navigation.navigate("adminorders");
        break;
      case "Product":
        navigation.navigate("newproduct");
        break;

      default:
        navigation.navigate("adminorders");
        break;
    }
  };

  const deleteProductHandler = async (id) => {
    // dispatch(deleteProduct(id));
    console.log({ id });
    try {
      const deleteItem = await deleteProduct({ id });
      console.log({ deleteItem }, "Product created successfully");
      showToast({
        type: "success",
        text1: "Deleted product Successfully!",
        duration: 5000,
      });
      refetch();
    } catch (error) {
      console.log("error", error);
      showToast({
        type: "error",
        text1: "Product Deletion Failed",
        text2: error.data
          ? error.data.message
          : "An error occurred. Please try again.",
        duration: 5000,
      });
    }
  };

  //async
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
    console.log(
      {
        getAdminProducts,
      },
      " getAdminProducts"
    );
  }, [getAdminProducts, isFocused]);

  useEffect(() => {
    if (isFocused && getAdminProducts) {
      const { inStockCount, outOfStockCount } = getAdminProducts;
      setInStock(inStockCount);
      setOutOfStock(outOfStockCount);
      console.log(" callllllllllllllllllllllllll");
    }
  }, [getAdminProducts]);

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      {/* Heading */}
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text
          style={formHeading}
          onPress={() => console.log({ inStock, outOfStock })}
        >
          Admin Panel
        </Text>
      </View>

      {isLoadingGetAdminProducts ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              backgroundColor: colors.color3,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Chart inStock={inStock} outOfStock={outOfStock} />
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-between",
              }}
            >
              <ButtonBox
                icon={"plus"}
                text={"Product"}
                handler={navigationHandler}
              />

              <ButtonBox
                icon={"format-list-bulleted-square"}
                text={"All Orders"}
                handler={navigationHandler}
                reverse={true}
              />
              <ButtonBox
                icon={"plus"}
                text={"Category"}
                handler={navigationHandler}
              />
            </View>
          </View>

          <ProductListHeading />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {!loadingDelete &&
                // products.map((item, index) => (
                getAdminProducts?.products.map((item, index) => (
                  <ProductListItem
                    navigate={navigation}
                    deleteHandler={deleteProductHandler}
                    key={item._id}
                    id={item._id}
                    i={index}
                    price={item.price}
                    stock={item.stock}
                    name={item.name}
                    category={item?.category?.category ?? "N/A"}
                    imgSrc={item?.images[0]?.url}
                  />
                ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AdminPanel;
