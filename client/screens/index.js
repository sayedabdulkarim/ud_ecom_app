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
import Login from "./Login";
import Forgotpassword from "./Forgotpassword";
import Verify from "./Verify";
import Signup from "./Signup";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";
import Orders from "./Orders";
import AdminPanel from "./Admin/AdminPanel";
import Categories from "./Admin/Categories";
import AdminOrders from "./Admin/AdminOrders";
import UpdateProduct from "./Admin/UpdateProduct";
import NewProduct from "./Admin/NewProduct";
import ProductImages from "./Admin/ProductImages";
import CameraComponent from "./Camera";

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
            <Stack.Screen
              name="login"
              component={Login}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup"
              component={Signup}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile"
              component={Profile}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updateprofile"
              component={UpdateProfile}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="changepassword"
              component={ChangePassword}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="orders"
              component={Orders}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="camera"
              component={CameraComponent}
              // options={{ headerShown: false }}
            />

            {/* password resetting route */}
            <Stack.Screen
              name="forgotpassword"
              component={Forgotpassword}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="verify"
              component={Verify}
              // options={{ headerShown: false }}
            />

            {/* admin routes */}
            <Stack.Screen
              name="adminpanel"
              component={AdminPanel}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="categories"
              component={Categories}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="adminorders"
              component={AdminOrders}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updateproduct"
              component={UpdateProduct}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="newproduct"
              component={NewProduct}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="productimages"
              component={ProductImages}
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
