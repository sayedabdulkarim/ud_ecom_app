import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors, defaultStyle } from "../styles/common";
import Header from "../component/Header";
import { Avatar } from "react-native-paper";
import { useEffect, useState } from "react";
import SearchModal from "../component/SearchModal";
import ProductCard from "../component/ProductCard";
import Footer from "../component/Footer";
import Heading from "../component/Heading";
import {
  useGetAllProductsQuery,
  useGetallcategoriesQuery,
} from "../apiSlices/productApiSlice";
import Loader from "../component/Loader";

const Home = () => {
  //misc
  const navigate = useNavigation();
  const products = [];

  //state
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // RTK Query
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetallcategoriesQuery();

  const {
    data: getAllProducts,
    error: getAllProductsError,
    isLoading: getAllProductsLoading,
  } = useGetAllProductsQuery();

  //func
  const handleCategory = (val) => {
    console.log(val);
    setSelectedCategory(val);
  };

  const addToCartHandler = (id) => {
    console.log({ id });
  };

  //async
  useEffect(() => {
    if (categoriesData) {
      // console.log(
      //   { categoriesData, categoriesError, categoriesLoading },
      //   " get categoriesss"
      // );
      setCategories(categoriesData?.categories);
    }
  }, [categoriesData, categoriesError, categoriesLoading]);

  useEffect(() => {
    if (getAllProducts) {
      console.log(
        {
          allProducts,
        },
        " allProduct"
      );
      setAllProducts(getAllProducts?.products);
    }
  }, [getAllProducts, getAllProductsError, getAllProductsLoading]);

  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeSearch={searchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}

      <View style={defaultStyle}>
        {/* <Text onPress={() => console.log({ categories: categoriesData })}>
          TEST
        </Text> */}
        <Header back={false} />

        {/* heading row */}
        <View
          style={{
            paddingTop: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Heading />

          {/* searchbar */}
          <View>
            <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
              <Avatar.Icon
                icon={"magnify"}
                color="gray"
                size={50}
                style={{ backgroundColor: colors.color2, elevation: 12 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {categoriesLoading || getAllProductsLoading ? (
          <Loader />
        ) : (
          <>
            {/* categories */}
            <View
              style={{
                flexDirection: "row",
                height: 80,
              }}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                }}
              >
                {categories.map((item) => {
                  const { category, _id } = item;
                  return (
                    <TouchableOpacity
                      key={_id}
                      style={[
                        styles.button,
                        {
                          backgroundColor:
                            selectedCategory === _id
                              ? colors.color1
                              : colors.color5,
                        },
                      ]}
                      onPress={() => handleCategory(_id)}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          {
                            color:
                              selectedCategory === _id ? colors.color2 : "gray",
                          },
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* products */}
            <View style={{ flex: 1 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {allProducts?.map((item, idx) => {
                  const { price, _id, name, images } = item;
                  [0].url;
                  return (
                    <ProductCard
                      key={_id}
                      id={_id}
                      image={
                        images[0]?.url ??
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM_yg0XL4wIxYUOBwpNjp_dWR53-RmRvLJDDgzDzqp6w&s"
                      }
                      stock={5}
                      name={name}
                      price={price}
                      addToCartHandler={addToCartHandler}
                      navigateHandler={navigate}
                      idx={idx}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </>
        )}
      </View>
      <Footer activeRoute="home" />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.color5,
    borderRadius: 100,
    margin: 5,
    alignItems: "center",
    padding: 10, // Adjust as needed
  },
  buttonText: {
    fontSize: 12,
    color: "gray",
  },
});
