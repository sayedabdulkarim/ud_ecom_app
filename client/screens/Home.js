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
import { useGetallcategoriesQuery } from "../apiSlices/productApiSlice";
import Loader from "../component/Loader";

const Home = () => {
  //misc
  const navigate = useNavigation();
  const products = [];

  //state
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // RTK Query
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetallcategoriesQuery();

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
        <Text onPress={() => console.log({ categories: categoriesData })}>
          TEST
        </Text>
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

        {categoriesLoading ? (
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
                  const { category, id } = item;
                  return (
                    <TouchableOpacity
                      key={id}
                      style={[
                        styles.button,
                        {
                          backgroundColor:
                            selectedCategory === id
                              ? colors.color1
                              : colors.color5,
                        },
                      ]}
                      onPress={() => handleCategory(id)}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          {
                            color:
                              selectedCategory === id ? colors.color2 : "gray",
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
                {products?.map((item, idx) => {
                  const { price, _id, name, images } = item;
                  [0].url;
                  return (
                    <ProductCard
                      key={_id}
                      id={_id}
                      image={images[0].url}
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
