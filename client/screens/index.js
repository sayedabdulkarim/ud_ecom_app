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

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
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
