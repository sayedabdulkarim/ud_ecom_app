import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
//
import Main from "./screens";

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
