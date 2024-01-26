import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, defaultStyle } from "../styles/common";
import Header from "../component/Header";
import { Avatar } from "react-native-paper";
import { useState } from "react";
import SearchModal from "../component/SearchModal";

const Home = () => {
  //misc
  const categories = [
    { category: "One", id: 1 },
    { category: "Two", id: 2 },
    { category: "Three", id: 3 },
    { category: "Four", id: 4 },
    { category: "Five", id: 5 },
    { category: "Six", id: 6 },
    { category: "Seven", id: 7 },
    { category: "Eight", id: 8 },
  ];
  const products = [
    {
      price: 56,
      _id: "1",
      name: "Cartoon Item 1",
      images: [
        {
          url: "https://w7.pngwing.com/pngs/768/766/png-transparent-shin-chan-illustration-crayon-shin-chan-drawing-shinnosuke-nohara-desktop-kasukabe-shinchan-love-child-hand.png",
        },
      ],
    },
    {
      price: 80,
      _id: "2",
      name: "Cartoon Item 2",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
    },
    {
      price: 24,
      _id: "3",
      name: "Cartoon Item 3",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
    },
    {
      price: 40,
      _id: "4",
      name: "Cartoon Item 4",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
    },
    {
      price: 92,
      _id: "5",
      name: "Cartoon Item 5",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
    },
    {
      price: 19,
      _id: "6",
      name: "Cartoon Item 6",
      images: [
        {
          url: "https://edtimes.in/wp-content/uploads/2020/09/91bUJjlbJ3L._SL1500_-Copy-1.jpg",
        },
      ],
    },
    {
      price: 63,
      _id: "7",
      name: "Cartoon Item 7",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
    },
    {
      price: 61,
      _id: "8",
      name: "Cartoon Item 8",
      images: [
        {
          url: "https://www.partysuppliesindia.com/cdn/shop/products/A3_49_8577f2d2-bfd1-437a-990a-b607c1c0b7a0.jpg?v=1619169667&width=3840",
        },
      ],
    },
    {
      price: 90,
      _id: "9",
      name: "Cartoon Item 9",
      images: [
        {
          url: "https://edtimes.in/wp-content/uploads/2020/09/91bUJjlbJ3L._SL1500_-Copy-1.jpg",
        },
      ],
    },
    {
      price: 70,
      _id: "10",
      name: "Cartoon Item 10",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
    },
  ];
  //state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  //func
  const handleCategory = (val) => {
    console.log(val);
    setSelectedCategory(val);
  };

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
          <View>
            <Text style={{ fontSize: 25 }}>Our</Text>
            <Text style={{ fontSize: 25, fontWeight: "900" }}> Products</Text>
          </View>

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
                        selectedCategory === id ? colors.color1 : colors.color5,
                    },
                  ]}
                  onPress={() => handleCategory(id)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: selectedCategory === id ? colors.color2 : "gray",
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
      </View>
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
