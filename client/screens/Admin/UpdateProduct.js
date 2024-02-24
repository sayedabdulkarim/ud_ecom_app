import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  inputStyling,
} from "../../styles/common";
import Loader from "../../component/Loader";
import { Button, TextInput } from "react-native-paper";
import SelectComponent from "../../component/SelectComponent";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProductDetailsByIdQuery,
  useGetallcategoriesQuery,
  useUpdateProductMutation,
} from "../../apiSlices/productApiSlice";
import { showToast } from "../../utils/commonHelper";

// const images = [
//   {
//     url: "https://static.thenounproject.com/png/524455-200.png",
//     _id: "1",
//   },
//   {
//     url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkXAUltzl1IumAF8kCEgFOGJz5nCSrVEfb-ZiqUQya4Q&s",
//     _id: "2",
//   },
//   {
//     url: "https://static.thenounproject.com/png/524455-200.png",
//     _id: "1",
//   },
//   {
//     url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkXAUltzl1IumAF8kCEgFOGJz5nCSrVEfb-ZiqUQya4Q&s",
//     _id: "2",
//   },
// ];

const UpdateProduct = ({ navigation, route }) => {
  //misc
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  // const product = [];
  const loading = false;
  const loadingOther = false;

  //state
  const [visible, setVisible] = useState(false);
  const [id] = useState(route.params.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [productId, setProductId] = useState("");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  //query n mutation
  const {
    data: product,
    error,
    isLoading: isLoadingGetProductDetails,
    refetch: productRefetch,
  } = useGetProductDetailsByIdQuery(route.params.id);

  const [updateProduct, { isLoading: isLoadingUpdateProduct }] =
    useUpdateProductMutation();

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetallcategoriesQuery();

  //func
  const submitHandler = async () => {
    const payload = { name, description, stock, category: categoryID, price };

    console.log(
      {
        payload,
      },
      " update"
    );

    try {
      console.log({ payload }, " payload");

      const product = await updateProduct({ id: productId, data: payload });
      console.log({ product }, "Product created successfully");
      showToast({
        type: "success",
        text1: "Updated product Successfully!",
        duration: 5000,
      });
      navigation.navigate("adminpanel");
    } catch (error) {
      console.log("error", error);
      showToast({
        type: "error",
        text1: "Product Update Failed",
        text2: error.data
          ? error.data.message
          : "An error occurred. Please try again.",
        duration: 5000,
      });
    }
  };

  //async
  useEffect(() => {
    if (product) {
      const { _id, category, description, images, name, price, stock } =
        product.product;
      console.log(
        {
          _id,
          category,
          description,
          images,
          name,
          price,
          stock,
        },
        " prod details"
      );
      setName(name);
      setDescription(description);
      setPrice(String(price));
      setStock(String(stock));
      setCategory(category?.category);
      setCategoryID(category?._id);
      setProductId(_id);
      setImages(images);
    }
  }, [product]);

  useEffect(() => {
    if (isFocused) {
      productRefetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData?.categories);
    }
  }, [categoriesData, categoriesError, categoriesLoading]);

  return (
    <>
      <View
        style={{
          ...defaultStyle,
          backgroundColor: colors.color5,
        }}
      >
        <Header back={true} />

        {/* Heading */}
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={formHeading}>Update Product</Text>
        </View>

        {isLoadingGetProductDetails ? (
          <Loader />
        ) : (
          <ScrollView
            style={{
              padding: 20,
              elevation: 10,
              borderRadius: 10,
              backgroundColor: colors.color3,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                // height: 650,
              }}
            >
              <Button
                onPress={() =>
                  navigation.navigate("productimages", {
                    id,
                    // images: product.images,
                    images,
                  })
                }
                textColor={colors.color1}
              >
                Manage Images
              </Button>

              <TextInput
                {...inputOptions}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                {...inputOptions}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />

              <TextInput
                {...inputOptions}
                placeholder="Price"
                keyboardType="number-pad"
                value={price}
                onChangeText={setPrice}
              />
              <TextInput
                {...inputOptions}
                placeholder="Stock"
                value={stock}
                keyboardType="number-pad"
                onChangeText={setStock}
              />

              <Text
                style={{
                  ...inputStyling,
                  textAlign: "center",
                  textAlignVertical: "center",
                  borderRadius: 3,
                  color: category ? "black" : "gray",
                }}
                onPress={() => setVisible(true)}
                placeholder="Select Category"
              >
                {category ? category : "Select Category"}
                {/* {category} */}
              </Text>

              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                }}
                onPress={submitHandler}
                loading={loadingOther}
                disabled={loadingOther}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        )}
      </View>

      <SelectComponent
        categories={categories}
        setCategoryID={setCategoryID}
        setCategory={setCategory}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default UpdateProduct;
