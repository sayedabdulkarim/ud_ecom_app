import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
  inputStyling,
} from "../../styles/common";
import { Avatar, Button, TextInput } from "react-native-paper";
import SelectComponent from "../../component/SelectComponent";
// import { useSetCategories, useMessageAndErrorOther } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  useCreateproductMutation,
  useGetallcategoriesQuery,
} from "../../apiSlices/productApiSlice";
import {
  convertImageToBase64,
  generateRandomId,
  showToast,
} from "../../utils/commonHelper";
import Loader from "../../component/Loader";

const NewProduct = ({ navigation, route }) => {
  //misc
  const loading = false;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  //state
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Choose Category");
  const [categoryID, setCategoryID] = useState(undefined);
  const [categories, setCategories] = useState([]);

  const disableBtnCondition =
    !name || !description || !price || !stock || !image;

  // RTK Query
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
    refetch: refetchCategoriesData,
  } = useGetallcategoriesQuery();

  const [createProduct, { isLoading: isLoadingCreateProduct }] =
    useCreateproductMutation();

  //func
  const submitHandler = async () => {
    try {
      let base64Avatar = image;

      if (image && !image.startsWith("data:")) {
        base64Avatar = await convertImageToBase64(image);
      }
      const publicId = generateRandomId();

      const formData = {
        name,
        description,
        stock,
        price,
        category: categoryID,
        images: [
          {
            public_id: publicId,
            url: base64Avatar,
          },
        ],
      };

      console.log({ formData }, " formData");

      const product = await createProduct(formData);
      console.log({ product }, "Product created successfully");
      showToast({
        type: "success",
        text1: "Added product Successfully!",
        // text2: "Welcome to the app!",
        duration: 5000,
      });
      navigation.navigate("adminpanel");
    } catch (error) {
      console.log("error", error);
      showToast({
        type: "error",
        text1: "Product Creation Failed",
        text2: error.data
          ? error.data.message
          : "An error occurred. Please try again.",
        duration: 5000,
      });
    }
  };

  //async

  useEffect(() => {
    if (route.params?.image) setImage(route.params.image);
  }, [route.params]);

  //async
  useEffect(() => {
    if (categoriesData) {
      console.log(categoriesData, " ccccccccccccccccc");
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
          <Text
            style={formHeading}
            onPress={() =>
              console.log({
                categories,
                categoryID,
              })
            }
          >
            New Product
          </Text>
        </View>

        {isLoadingCreateProduct ? (
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
                height: 650,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: "center",
                  marginBottom: 20,
                }}
              >
                <Avatar.Image
                  size={80}
                  style={{
                    backgroundColor: colors.color1,
                  }}
                  source={{
                    uri: image ? image : null,
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("camera", { newProduct: true })
                  }
                >
                  <Avatar.Icon
                    icon={"camera"}
                    size={30}
                    color={colors.color3}
                    style={{
                      backgroundColor: colors.color2,
                      position: "absolute",
                      bottom: 0,
                      right: -5,
                    }}
                  />
                </TouchableOpacity>
              </View>

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
                keyboardType="number-pad"
                placeholder="Stock"
                value={stock}
                onChangeText={setStock}
              />

              <Text
                style={{
                  ...inputStyling,
                  textAlign: "center",
                  textAlignVertical: "center",
                  borderRadius: 3,
                }}
                onPress={() => setVisible(true)}
              >
                {category}
              </Text>

              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                }}
                onPress={submitHandler}
                loading={isLoadingCreateProduct}
                disabled={disableBtnCondition || isLoadingCreateProduct}
              >
                Create
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

export default NewProduct;
