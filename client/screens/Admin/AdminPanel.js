import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { colors, defaultStyle, formHeading } from "../../styles/common";
import Header from "../../component/Header";
import Loader from "../../component/Loader";
import ButtonBox from "../../component/ButtonBox";
import ProductListHeading from "../../component/ProductListHeading";
import ProductListItem from "../../component/ProductListItem";
import Chart from "../../component/Chart";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useGetAdminProductsQuery } from "../../apiSlices/productApiSlice";

const AdminPanel = ({ navigation }) => {
  const loading = false;
  const loadingDelete = false;
  const inStock = 90;
  const outOfStock = 10;
  const products = [
    {
      price: 56,
      stock: 33,
      _id: "1",
      name: "Cartoon Item 1",
      images: [
        {
          url: "https://w7.pngwing.com/pngs/768/766/png-transparent-shin-chan-illustration-crayon-shin-chan-drawing-shinnosuke-nohara-desktop-kasukabe-shinchan-love-child-hand.png",
        },
      ],
      category: "one",
    },
    {
      price: 80,
      stock: 13,
      _id: "2",
      name: "Cartoon Item 2",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
      category: "two",
    },
    {
      price: 24,
      stock: 0,
      _id: "3",
      name: "Cartoon Item 3",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
      category: "one",
    },
    {
      price: 40,
      stock: 23,
      _id: "4",
      name: "Cartoon Item 4",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
      category: "two",
    },
    {
      price: 92,
      stock: 32,
      _id: "5",
      name: "Cartoon Item 5",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
      category: "one",
    },
    {
      price: 19,
      stock: 13,
      _id: "6",
      name: "Cartoon Item 6",
      images: [
        {
          url: "https://edtimes.in/wp-content/uploads/2020/09/91bUJjlbJ3L._SL1500_-Copy-1.jpg",
        },
      ],
      category: "two",
    },
    {
      price: 63,
      stock: 23,
      _id: "7",
      name: "Cartoon Item 7",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
      category: "two",
    },
    {
      price: 61,
      stock: 23,
      _id: "8",
      name: "Cartoon Item 8",
      images: [
        {
          url: "https://www.partysuppliesindia.com/cdn/shop/products/A3_49_8577f2d2-bfd1-437a-990a-b607c1c0b7a0.jpg?v=1619169667&width=3840",
        },
      ],
      category: "one",
    },
    {
      price: 90,
      stock: 13,
      _id: "9",
      name: "Cartoon Item 9",
      images: [
        {
          url: "https://edtimes.in/wp-content/uploads/2020/09/91bUJjlbJ3L._SL1500_-Copy-1.jpg",
        },
      ],
      category: "two",
    },
    {
      price: 70,
      stock: 23,
      _id: "10",
      name: "Cartoon Item 10",
      images: [
        {
          url: "https://i.pinimg.com/736x/67/6e/cb/676ecb6b2285efc0fd531383c8567a26.jpg",
        },
      ],
      category: "one",
    },
  ];
  //misc
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  //query n mutation
  const {
    data: getAdminProducts,
    isLoading: isLoadingGetAdminProducts,
    isError: isErrorGetAdminProducts,
    refetch,
  } = useGetAdminProductsQuery();

  //func
  const navigationHandler = (text) => {
    switch (text) {
      case "Category":
        navigation.navigate("categories");
        break;
      case "All Orders":
        navigation.navigate("adminorders");
        break;
      case "Product":
        navigation.navigate("newproduct");
        break;

      default:
        navigation.navigate("adminorders");
        break;
    }
  };

  const deleteProductHandler = (id) => {
    // dispatch(deleteProduct(id));
    console.log({ id });
  };

  //async
  useEffect(() => {
    console.log(
      {
        getAdminProducts,
      },
      " getAdminProducts"
    );
  }, [getAdminProducts]);

  return (
    <View style={defaultStyle}>
      <Header back={true} />
      {/* Heading */}
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text style={formHeading}>Admin Panel</Text>
      </View>

      {isLoadingGetAdminProducts ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              backgroundColor: colors.color3,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Chart inStock={inStock} outOfStock={outOfStock} />
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-between",
              }}
            >
              <ButtonBox
                icon={"plus"}
                text={"Product"}
                handler={navigationHandler}
              />

              <ButtonBox
                icon={"format-list-bulleted-square"}
                text={"All Orders"}
                handler={navigationHandler}
                reverse={true}
              />
              <ButtonBox
                icon={"plus"}
                text={"Category"}
                handler={navigationHandler}
              />
            </View>
          </View>

          <ProductListHeading />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {!loadingDelete &&
                products.map((item, index) => (
                  // getAdminProducts?.products.map((item, index) => (
                  <ProductListItem
                    navigate={navigation}
                    deleteHandler={deleteProductHandler}
                    key={item._id}
                    id={item._id}
                    i={index}
                    price={item.price}
                    stock={item.stock}
                    name={item.name}
                    // category={item.category?.category}
                    category={item.category}
                    imgSrc={item?.images[0]?.url}
                  />
                ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default AdminPanel;
