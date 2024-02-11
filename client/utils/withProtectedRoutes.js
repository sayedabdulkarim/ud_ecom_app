// withProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

const withProtectedRoute = (Component) => {
  const WrappedComponent = (props) => {
    const navigation = useNavigation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    React.useEffect(() => {
      if (!isAuthenticated) {
        // Redirect to the login screen if not authenticated
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      }
    }, [isAuthenticated, navigation]);

    return isAuthenticated ? <Component {...props} /> : null;
  };

  return WrappedComponent;
};

export default withProtectedRoute;
