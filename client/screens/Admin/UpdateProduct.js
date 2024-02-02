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
// import { useMessageAndErrorOther, useSetCategories } from "../../utils/hooks";
// import { useIsFocused } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { getProductDetails } from "../../redux/actions/productAction";
// import { updateProduct } from "../../redux/actions/otherAction";

const images = [
  {
    url: "https://static.thenounproject.com/png/524455-200.png",
    _id: "1",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkXAUltzl1IumAF8kCEgFOGJz5nCSrVEfb-ZiqUQya4Q&s",
    _id: "2",
  },
  {
    url: "https://static.thenounproject.com/png/524455-200.png",
    _id: "1",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkXAUltzl1IumAF8kCEgFOGJz5nCSrVEfb-ZiqUQya4Q&s",
    _id: "2",
  },
];

const UpdateProduct = ({ navigation, route }) => {
  //   const isFocused = useIsFocused();
  //   const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const product = [];
  const loading = false;
  //   const { product, loading } = useSelector((state) => state.product);

  const [id] = useState(route.params.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([
    { _id: "asd", category: "Laptop" },
    { _id: "assfd", category: "Footwear" },
    { _id: "assxd", category: "TopWear" },
  ]);
  console.log({ id });
  //   useSetCategories(setCategories, isFocused);

  const submitHandler = () => {
    console.log({
      id,
      name,
      description,
      price,
      stock,
      categoryID,
    });
    // dispatch(updateProduct(id, name, description, price, stock, categoryID));
  };
  const loadingOther = false;
  //   const loadingOther = useMessageAndErrorOther(
  //     dispatch,
  //     navigation,
  //     "adminpanel"
  //   );

  //   useEffect(() => {
  //     dispatch(getProductDetails(id));
  //   }, [dispatch, id, isFocused]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setCategory(product.category?.category);
      setCategoryID(product.category?._id);
    }
  }, [product]);

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

        {loading ? (
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