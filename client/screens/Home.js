import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import { colors, defaultStyle } from "../styles/common";
import Header from "../component/Header";
import { Avatar } from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import SearchModal from "../component/SearchModal";
import ProductCard from "../component/ProductCard";
import Footer from "../component/Footer";
import Heading from "../component/Heading";
import {
  useGetAllProductsQuery,
  useGetallcategoriesQuery,
} from "../apiSlices/productApiSlice";
import Loader from "../component/Loader";
import { debounce } from "../utils/commonHelper";
import { addToCart } from "../slices/ordersSlice";

const Home = () => {
  //misc
  const isFocused = useIsFocused();
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const products = [];
  const { cartItems } = useSelector((state) => state.orderReducer);

  //state
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const debouncedSetSearch = useCallback(
    debounce((query) => {
      setDebouncedSearchQuery(query);
    }, 500),
    []
  );

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    debouncedSetSearch(query);
  };
  // RTK Query
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetallcategoriesQuery();

  // Prepare query parameters for getAllProducts
  const queryParams = {};
  if (selectedCategory) queryParams.category = selectedCategory;
  if (debouncedSearchQuery) queryParams.keyword = debouncedSearchQuery;

  const {
    data: getAllProducts,
    error: getAllProductsError,
    isLoading: getAllProductsLoading,
    refetch: getAllProductsRefetch,
  } = useGetAllProductsQuery(queryParams);

  //func
  const handleCategory = (val) => {
    console.log(val);
    setSelectedCategory(val);
  };

  const addToCartHandler = (data) => {
    dispatch(addToCart(data));
    Toast.show({
      type: "success",
      text1: "Added To Cart.",
    });
  };

  //async
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData?.categories);
    }
  }, [categoriesData, categoriesError, categoriesLoading]);

  useEffect(() => {
    setAllProducts([]);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (getAllProducts) {
      setAllProducts(getAllProducts?.products || []);
    }
  }, [getAllProducts]);

  // Use yet another useEffect for error handling
  useEffect(() => {
    if (getAllProductsError) {
      setAllProducts([]);
    }
  }, [getAllProductsError]);

  useEffect(() => {
    if (isFocused) {
      getAllProductsRefetch();
    }
  }, [isFocused]);

  // console.log(getAllProductsLoading, " querypppp");
  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          activeSearch={activeSearch}
          setActiveSearch={setActiveSearch}
          products={allProducts}
          selectedCategory={selectedCategory}
        />
      )}

      <View style={defaultStyle}>
        <Text onPress={() => console.log({ getAllProducts, allProducts })}>
          TEST
        </Text>
        <Text onPress={() => setSelectedCategory(null)}>CLEAR Category</Text>
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
                      onPress={() =>
                        selectedCategory === _id
                          ? setSelectedCategory(null)
                          : handleCategory(_id)
                      }
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
                      {selectedCategory === _id && (
                        <View style={styles.crossIconContainer}>
                          <Avatar.Icon
                            icon="close"
                            color="white"
                            size={24}
                            backgroundColor={"black"}
                            style={styles.crossIcon}
                          />
                        </View>
                      )}
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
                      item={item}
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
    justifyContent: "center",
    padding: 10,
  },
  buttonText: {
    fontSize: 12,
    color: "gray",
  },
  crossIconContainer: {
    position: "absolute",
    right: -9,
    top: -10,
  },
});
