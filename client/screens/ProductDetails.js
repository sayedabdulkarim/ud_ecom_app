import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors, defaultStyle } from "../styles/common";
import Header from "../component/Header";
import Carousel from "react-native-snap-carousel";
import { Avatar } from "react-native-paper";

//
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

const ProductDetails = ({ route: { params } }) => {
  console.log({ params }, " pppppp");
  //misc
  const name = "Macbook Pro";
  const price = 100;
  const stock = 5;
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
  const [quantity, setQuantity] = useState(10);

  //func
  const handleDecrement = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };
  const handleIncrement = () => {
    if (stock <= quantity) return;
    setQuantity((prev) => prev + 1);
  };

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        backgroundColor: colors.color1,
      }}
    >
      <Header back={true} />
      {/*  */}
      <Carousel
        layout="stack"
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        ref={isCarousel}
        data={images}
        renderItem={CarouselCardItem}
      />

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
          {name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "900",
          }}
        >
          {price.toFixed(2)}
        </Text>
        <Text
          style={{
            letterSpacing: 1,
            lineHeight: 20,
            marginVertical: 15,
          }}
          numberOfLines={8}
        >
          {description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
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
            <TouchableOpacity onPress={() => handleDecrement()}>
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
              {quantity}
            </Text>
            <TouchableOpacity onPress={() => handleIncrement()}>
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
          </View>
        </View>
      </View>
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

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color1,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    height: 380,
    marginTop: 50,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: 250,
  },
});
