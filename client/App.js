import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import { StripeProvider } from "@stripe/stripe-react-native";
//
import Main from "./screens";

const App = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_51OhzemSHnmO0j1PfdDuo2bWXh23UyShl2IhoJheT8xpN9S0tCifRms0XgyD9BvKmRDaIQqD4yOiBvrdaorSpnRiu00UBtW9gxv"
      merchantIdentifier="helloworld"
      threeDSecureParams={{
        backgroundColor: "#fff",
        timeout: 5,
      }}
    >
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
