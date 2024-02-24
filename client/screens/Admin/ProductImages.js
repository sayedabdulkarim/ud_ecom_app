import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, formHeading } from "../../styles/common";
import Header from "../../component/Header";
import ImageCard from "../../component/ImageCard";
import { Avatar, Button } from "react-native-paper";
import {
  convertImageToBase64,
  generateRandomId,
  showToast,
} from "../../utils/commonHelper";
import { useUpdateProductMutation } from "../../apiSlices/productApiSlice";
import Loader from "../../component/Loader";

const ProductImages = ({ navigation, route }) => {
  //state
  const [images] = useState(route.params.images);
  const [productId] = useState(route.params.id);
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  const loading = false;

  //queries n mutation
  const [updateProduct, { isLoading: isLoadingUpdateProduct }] =
    useUpdateProductMutation();

  //func
  const deleteHandler = (imageId) => {
    // dispatch(deleteProductImage(productId, imageId));
  };

  const submitHandler = async () => {
    // console.log({ images, image }, " from prodct images ");

    try {
      let base64Avatar = image;

      if (image && !image.startsWith("data:")) {
        base64Avatar = await convertImageToBase64(image);
      }
      const publicId = generateRandomId();

      const payload = {
        images: [
          ...images,
          {
            public_id: publicId,
            url: base64Avatar,
          },
        ],
      };
      console.log({ payload, productId });

      const product = await updateProduct({ id: productId, data: payload });
      console.log({ product }, "Product created successfully");
      showToast({
        type: "success",
        text1: "Updated product Successfully!",
        duration: 5000,
      });
      navigation.navigate("adminpanel");
    } catch (error) {
      console.log("error", error);
      showToast({
        type: "error",
        text1: "Product Update Failed",
        text2: error.data
          ? error.data.message
          : "An error occurred. Please try again.",
        duration: 5000,
      });
    }
  };

  //async
  useEffect(() => {
    if (route.params?.image) {
      // console.log(params, " ppppppppppppppppppppppp");
      setImage(route.params.image);
      setImageChanged(true);
    }
  }, [route.params]);

  return (
    <View
      style={{
        ...defaultStyle,
        backgroundColor: colors.color5,
      }}
    >
      <Header back={true} />
      {isLoadingUpdateProduct ? (
        <Loader />
      ) : (
        <>
          {/* Heading */}
          <View style={{ marginBottom: 20, paddingTop: 70 }}>
            <Text style={formHeading}>Images</Text>
          </View>

          <ScrollView
            style={{
              marginBottom: 20,
            }}
          >
            <View
              style={{
                backgroundColor: colors.color2,
                padding: 40,
                minHeight: 400,
              }}
            >
              {images?.map((i) => (
                <ImageCard
                  key={i._id}
                  src={i.url}
                  id={i._id}
                  deleteHandler={deleteHandler}
                />
              ))}
            </View>
          </ScrollView>

          <View
            style={{
              padding: 20,
              borderRadius: 10,
              backgroundColor: colors.color3,
            }}
          >
            <Image
              style={{
                backgroundColor: colors.color2,
                width: 100,
                height: 100,
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("camera", { updateProduct: true })
                }
              >
                <Avatar.Icon
                  icon={"camera"}
                  style={{
                    backgroundColor: colors.color2,
                    margin: 10,
                  }}
                  size={30}
                  color={colors.color3}
                />
              </TouchableOpacity>
            </View>

            <Button
              style={{
                backgroundColor: colors.color1,
                padding: 6,
              }}
              textColor={colors.color2}
              loading={loading}
              onPress={submitHandler}
              disabled={!imageChanged}
            >
              Add
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default ProductImages;
