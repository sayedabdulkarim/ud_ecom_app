import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../styles/common";
import Header from "../../component/Header";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetallcategoriesQuery,
} from "../../apiSlices/productApiSlice";
import Loader from "../../component/Loader";
import { showToast } from "../../utils/commonHelper";

const data = [
  {
    name: "Laptop",
    _id: "sdfvb",
  },
  {
    name: "Book",
    _id: "asdx",
  },
  {
    name: "Shoes",
    _id: "oiuytf",
  },
];

const Categories = ({ navigation }) => {
  //misc
  const loading = false;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  //state
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // RTK Query
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
    refetch: refetchCategoriesData,
  } = useGetallcategoriesQuery();

  const [addCategory, { isLoading: addCategoryLoading }] =
    useAddCategoryMutation();

  const [deleteCategory, { isLoading: deleteCategoryLoading }] =
    useDeleteCategoryMutation();

  //func

  const deleteHandler = async (id) => {
    console.log(id, " ii");
    try {
      const deletedCategory = await deleteCategory({ id }).unwrap();
      showToast({
        type: "success",
        text1: deletedCategory.message,
        text2: "Category Successfully deleted.",
        duration: 5000,
      });
      refetchCategoriesData();
    } catch (error) {
      console.log({ error }, " err from login");
      const errorMessage =
        error?.data?.message ??
        "An error occurred. Please check your credentials and try again.";
      showToast({
        type: "error",
        text1: "Deleting Category Failed",
        text2: errorMessage,
        duration: 5000,
      });
    }
    //   dispatch(deleteCategory(id));
  };

  const submitHandler = async () => {
    try {
      const newCategory = await addCategory({ category }).unwrap();
      showToast({
        type: "success",
        text1: newCategory.message,
        text2: "Category Successfully added.",
        duration: 5000,
      });
      setCategory("");
      refetchCategoriesData();
    } catch (error) {
      console.log({ error }, " err from login");
      const errorMessage =
        error?.data?.message ??
        "An error occurred. Please check your credentials and try again.";
      showToast({
        type: "error",
        text1: "Adding Category Failed",
        text2: errorMessage,
        duration: 5000,
      });
    }
  };

  //async
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData?.categories);
    }
  }, [categoriesData, categoriesError, categoriesLoading]);

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true} />

      {/* Heading */}
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={formHeading}>Categories</Text>
      </View>

      {categoriesLoading || addCategoryLoading ? (
        <Loader />
      ) : categories.length > 0 ? (
        <ScrollView style={{ marginBottom: 20 }}>
          <View
            style={{
              backgroundColor: colors.color2,
              padding: 20,
              minHeight: 400,
            }}
          >
            {categories.map((i) => (
              <CategoryCard
                name={i.category}
                id={i._id}
                key={i._id}
                deleteHandler={deleteHandler}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 20,
            minHeight: 200,
            alignItems: "center", // Adjusted for center alignment
            justifyContent: "center", // Adjusted for center alignment
          }}
        >
          <Text>No categories, please add.</Text>
        </View>
      )}

      <View style={styles.container}>
        <TextInput
          {...inputOptions}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />

        <Button
          textColor={colors.color2}
          style={{
            backgroundColor: colors.color1,
            margin: 20,
            padding: 6,
          }}
          loading={addCategoryLoading}
          disabled={!category}
          onPress={submitHandler}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

const CategoryCard = ({ name, id, deleteHandler }) => (
  <View style={styles.cardContainer}>
    <Text style={styles.cardText}>{name}</Text>
    <TouchableOpacity onPress={() => deleteHandler(id)}>
      <Avatar.Icon
        icon={"delete"}
        size={30}
        style={{
          backgroundColor: colors.color1,
        }}
      />
    </TouchableOpacity>
  </View>
);

export default Categories;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: colors.color3,
  },

  cardContainer: {
    backgroundColor: colors.color2,
    elevation: 5,
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  cardText: {
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
