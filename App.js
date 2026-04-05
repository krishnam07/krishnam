import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BrandHeader } from "./src/components";
import { routes } from "./src/routes";
import { theme } from "./src/styles";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.surface,
          headerTitleAlign: "left",
          headerTitle: () => <BrandHeader navigation={navigation} />,
          headerTitleContainerStyle: { left: 0, right: 0 },
          contentStyle: { backgroundColor: theme.colors.surface },
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
