import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import Toast from "react-native-toast-message";
import { colors } from "../styles/common";
import Cart from "./Cart";
import ConfirmModal from "./ConfirmModal";
import Payment from "./Payment";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.color1} barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={({}) => ({
            headerShown: false,
          })}
        >
          <Stack.Group>
            <Stack.Screen
              name="home"
              component={Home}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="productdetails"
              component={ProductDetails}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="cart"
              component={Cart}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="confirmmodal"
              component={ConfirmModal}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="payment"
              component={Payment}
              // options={{ headerShown: false }}
            />
          </Stack.Group>
        </Stack.Navigator>
        <Toast position="top" bottomOffset={30} />
      </NavigationContainer>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});

// <View
//   style={{
//     paddingVertical:
//       Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   }}
// >
//   <SafeAreaView>
//     <Text>Index</Text>
//   </SafeAreaView>
// </View>
