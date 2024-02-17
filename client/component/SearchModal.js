import {
  BackHandler,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles/common";
import { Searchbar } from "react-native-paper";
import { useEffect } from "react";
import SearchItem from "./SearchItem";

const SearchModal = ({
  searchQuery,
  setSearchQuery,
  activeSearch,
  setActiveSearch,
  products = [],
  selectedCategory,
}) => {
  //misc
  const navigate = useNavigation();

  //func
  const handleBack = () => {
    setSearchQuery("");
    setActiveSearch(false);
    return true;
  };

  //async
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        zIndex: 100,
        backgroundColor: colors.color2,
        padding: 35,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Text
        onPress={() =>
          console.log({ searchQuery, selectedCategory }, " searchhh")
        }
      >
        Hello
      </Text>
      <SafeAreaView>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          //   autoFocus={true}
          style={{
            marginTop: 20,
          }}
        />
        <ScrollView>
          <View style={{ paddingVertical: 40, paddingHorizontal: 10 }}>
            {products?.map((item) => {
              const { category, _id, name, price } = item;
              return (
                <SearchItem
                  key={_id}
                  imgSrc={item?.images[0]?.url}
                  name={name}
                  price={price}
                  handler={() =>
                    navigate.navigate("productdetails", { id: _id })
                  }
                />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SearchModal;

const styles = StyleSheet.create({});
