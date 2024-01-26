import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { colors } from "../styles/common";
import { useNavigation, useRoute } from "@react-navigation/native";

const Header = ({ back, emtpyCart = false }) => {
  //misc
  const route = useRoute();
  const navigate = useNavigation();
  //func
  const handeEmptyCart = () => {
    console.log("Ëmpty Cart");
  };

  return (
    <>
      {back && (
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 20,
            top: 40,
            zIndex: 10,
          }}
          onPress={() => navigate.goBack()}
        >
          <Avatar.Icon
            style={{ backgroundColor: colors.color4 }}
            icon={"arrow-left"}
            color={
              route.name === "productdetails" ? colors.color2 : colors.color3
            }
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          top: 40,
          zIndex: 10,
        }}
        onPress={emtpyCart ? handeEmptyCart : navigate.navigate("cart")}
      >
        <Avatar.Icon
          style={{ backgroundColor: colors.color4 }}
          icon={emtpyCart ? "delete-outline" : "cart-outline"}
          color={
            route.name === "productdetails" ? colors.color2 : colors.color3
          }
        />
      </TouchableOpacity>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({});
