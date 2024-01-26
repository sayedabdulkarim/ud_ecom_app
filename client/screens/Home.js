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
  const products = [];
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
