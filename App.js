import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BrandHeader } from "./src/components";
import { routes } from "./src/routes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: "#0f1724" },
          headerTintColor: "#e6eef8",
          headerTitleAlign: "left",
          headerTitle: () => <BrandHeader navigation={navigation} />,
          contentStyle: { backgroundColor: "#0f1724" },
        })}
      >
        {routes.map(({ name, component }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={{ title: name }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
