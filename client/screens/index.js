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
import withProtectedRoute from "../utils/withProtectedRoutes";

const Stack = createNativeStackNavigator();

// const ProtectedProfile = withProtectedRoute(Profile);

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
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="productdetails" component={ProductDetails} />
            <Stack.Screen name="cart" component={Cart} />
            <Stack.Screen name="confirmmodal" component={ConfirmModal} />
            <Stack.Screen name="payment" component={Payment} />
            <Stack.Screen name="updateprofile" component={UpdateProfile} />
            <Stack.Screen name="changepassword" component={ChangePassword} />
            <Stack.Screen name="orders" component={Orders} />
            <Stack.Screen name="camera" component={CameraComponent} />

            {/* password resetting route */}
            <Stack.Screen name="forgotpassword" component={Forgotpassword} />
            <Stack.Screen name="verify" component={Verify} />

            {/* admin routes */}
            <Stack.Screen name="adminpanel" component={AdminPanel} />
            <Stack.Screen name="categories" component={Categories} />
            <Stack.Screen name="adminorders" component={AdminOrders} />
            <Stack.Screen name="updateproduct" component={UpdateProduct} />
            <Stack.Screen name="newproduct" component={NewProduct} />
            <Stack.Screen name="productimages" component={ProductImages} />
          </Stack.Group>
        </Stack.Navigator>
        <Toast position="top" bottomOffset={30} />
      </NavigationContainer>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
