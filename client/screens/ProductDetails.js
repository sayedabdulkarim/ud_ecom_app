import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, defaultStyle } from "../styles/common";
import Header from "../component/Header";
import Carousel from "react-native-snap-carousel";
import { Avatar, Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useGetProductDetailsByIdQuery } from "../apiSlices/productApiSlice";
import Loader from "../component/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../slices/ordersSlice";
import { isInCart, quantityInCart } from "../utils/commonHelper";
//
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

const ProductDetails = ({ route: { params } }) => {
  //misc
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated, isReload } = useSelector(
    (state) => state.authReducer
  );
  const { cartItems } = useSelector((state) => state.orderReducer);
  // console.log({ params }, " pppppp");

  //query n mutation
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductDetailsByIdQuery(params.id);

  const name = "Macbook Pro";
  const price = 100;
  let stock = 0;
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit, nisi quis sodales tristique, lorem tortor rhoncus magna, eget faucibus libero felis eget dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed sit amet congue quam. Maecenas maximus, mi ac blandit luctus, metus diam pellentesque urna, sed ultricies leo magna vitae purus. Fusce sit amet odio consectetur, malesuada erat vel, commodo neque. Vivamus sed lacus nunc. Curabitur tempus, massa at aliquam consequat, velit nisi auctor augue, a facilisis velit tortor quis lorem.";
  const isCarousel = useRef(null);
  const images = [
    {
      id: "11",
      url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
    },
    {
      id: "22",
      url: "https://edtimes.in/wp-content/uploads/2020/09/91bUJjlbJ3L._SL1500_-Copy-1.jpg",
    },
    {
      id: "33",
      url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
    },
    {
      id: "44",
      url: "https://edtimes.in/wp-content/uploads/2020/09/91bUJjlbJ3L._SL1500_-Copy-1.jpg",
    },
    {
      id: "55",
      url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
    },
  ];

  //state
  const [quantity, setQuantity] = useState(0);

  //func
  const handleDecrement = (_id) => {
    // if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
    dispatch(decreaseQuantity(_id));
  };
  const handleIncrement = (_id) => {
    // if (stock <= quantity) return;
    console.log(stock, " sss");
    // if (stock <= quantity) return;
    setQuantity((prev) => prev + 1);
    dispatch(increaseQuantity(_id));
  };

  const handleAddToCart = (data) => {
    dispatch(addToCart(data));
    setQuantity(1);
    Toast.show({
      type: "success",
      text1: "Added To Cart.",
    });
    console.log({ quantity }, "added to carttt.");
  };

  //async
  useEffect(() => {
    console.log(
      {
        product,
      },
      " get product by id"
    );
  }, [params, product]);

  // useEffect(() => {
  //   if (cartItems?.length && isInCart(cartItems, product?.product?._id)) {
  //     setQuantity(isInCart(cartItems, product?.product?._id)?.quantity);
  //   }
  // }, [cartItems]);

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        backgroundColor: colors.color1,
      }}
    >
      <Header back={true} />
      {/* <Text onPress={() => console.log(product, " proddd")}>NO DATA</Text> */}

      {/*  */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {product?.product?.images?.length === 0 ? (
            <EmptyImage product={product} />
          ) : (
            <Carousel
              layout="stack"
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              ref={isCarousel}
              data={product?.product?.images}
              // data={images}
              renderItem={CarouselCardItem}
            />
          )}

          <View
            style={{
              backgroundColor: colors.color2,
              padding: 35,
              flex: 1,
              marginTop: -380,
              borderTopLeftRadius: 55,
              borderTopRightRadius: 55,
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                fontSize: 25,
              }}
            >
              {product?.product?.name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
              }}
            >
              {product?.product?.price.toFixed(2)}
            </Text>
            <Text
              style={{
                letterSpacing: 1,
                lineHeight: 20,
                marginVertical: 15,
              }}
              numberOfLines={8}
              onPress={() =>
                console.log(
                  {
                    cartItems,
                    quantity: quantityInCart(cartItems, product.product._id),
                  },
                  " storeee"
                )
              }
            >
              {product?.product?.description}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 5,
                // borderWidth: 1,
                // borderColor: "red",
              }}
            >
              <Text
                style={{
                  color: colors.color3,
                  fontWeight: 300,
                }}
              >
                Quantity
              </Text>
              <View
                style={{
                  width: 80,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {isInCart(cartItems, product?.product?._id) && (
                  <TouchableOpacity
                    onPress={() => handleDecrement(product?.product?._id)}
                  >
                    <Avatar.Icon
                      icon={"minus"}
                      size={20}
                      style={{
                        borderRadius: 5,
                        backgroundColor: colors.color5,
                        height: 25,
                        width: 25,
                      }}
                    />
                  </TouchableOpacity>
                )}
                <Text
                  style={{
                    backgroundColor: colors.color4,
                    height: 25,
                    width: 25,
                    textAlignVertical: "center",
                    textAlign: "center",
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: colors.color5,
                    marginHorizontal: 10,
                  }}
                >
                  {/* {quantity} */}
                  {quantityInCart(cartItems, product.product._id)?.quantity ||
                    0}
                </Text>
                {isInCart(cartItems, product?.product?._id) && (
                  <TouchableOpacity
                    onPress={() => handleIncrement(product?.product?._id)}
                  >
                    <Avatar.Icon
                      icon={"plus"}
                      size={20}
                      style={{
                        borderRadius: 5,
                        backgroundColor: colors.color5,
                        height: 25,
                        width: 25,
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={
                product?.product?.stock === 0 ||
                isInCart(cartItems, product?.product?._id)
              }
              onPress={() => handleAddToCart(product.product)}
            >
              <Button
                style={[
                  styles.btn,
                  product?.product?.stock === 0 ||
                    (isInCart(cartItems, product?.product?._id) &&
                      styles.btnDisabled),
                ]}
                labelStyle={[
                  styles.btnText,
                  product?.product?.stock === 0 && styles.btnTextDisabled,
                ]}
                icon="cart"
              >
                {product?.product?.stock === 0
                  ? "Out Of Stock"
                  : isInCart(cartItems, product?.product?._id)
                  ? "Added to Cart"
                  : "Add To Cart"}
              </Button>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{ uri: item?.url }} style={styles.image} />
    </View>
  );
};

const EmptyImage = ({ product }) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.noimage}
        onPress={() => console.log({ product }, " proddd")}
      >
        NO IMAGES FOUND.
      </Text>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color1,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    // height: 380,
    marginTop: 50,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: 200,
  },
  noimage: {
    textAlign: "center",
    width: ITEM_WIDTH,
    // resizeMode: "contain",
    height: 600,
    // borderWidth: 5,
    // borderColor: "green",
    color: "#fff",
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
    // borderWidth: 1,
    // borderColor: "red",
    // marginTop: 1,
  },
  btnDisabled: {
    // Styles for disabled button, if needed to adjust background etc.
    opacity: 0.5, // Example to make button look disabled
  },
  btnText: {
    color: "#FFFFFF", // Ensuring text is white
  },
  btnTextDisabled: {
    color: "#FFFFFF", // Keeping text white even when disabled
  },
});
