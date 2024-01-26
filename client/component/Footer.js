import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles/common";
import { Avatar } from "react-native-paper";

const Footer = ({ activeRoute = "home" }) => {
  //misc
  const navigation = useNavigation();
  const loading = false;
  const isAuthenticated = false;
  //func
  const navigationHandler = (key) => {
    switch (key) {
      case 0:
        navigation.navigate("home");
        break;
      case 1:
        navigation.navigate("cart");
        break;
      case 2:
        isAuthenticated
          ? navigation.navigate("profile")
          : navigation.navigate("login");
        break;

      default:
        navigation.navigate("home");
        break;
    }
  };

  return (
    loading === false && (
      <View
        style={{
          backgroundColor: colors.color1,
          borderTopLeftRadius: 120,
          borderTopRightRadius: 120,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigationHandler(1)}
          >
            <Avatar.Icon
              icon={activeRoute === "cart" ? "shopping" : "shopping-outline"}
              color={colors.color2}
              size={50}
              style={{
                backgroundColor: colors.color1,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigationHandler(2)}
          >
            <Avatar.Icon
              icon={activeRoute === "profile" ? "account" : "account-outline"}
              color={colors.color2}
              size={50}
              style={{
                backgroundColor: colors.color1,
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",
            width: 80,
            height: 80,
            backgroundColor: colors.color2,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            top: -50,
            alignSelf: "center",
            elevation: 50,
          }}
        >
          <View
            style={{
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigationHandler(0)}
            >
              <Avatar.Icon
                icon={activeRoute === "home" ? "home" : "home-outline"}
                color={colors.color2}
                size={50}
                style={{
                  backgroundColor: colors.color1,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  );
};

export default Footer;

const styles = StyleSheet.create({});
