import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BrandHeader } from "./src/components";
import { routes } from "./src/routes";
import { theme } from "./src/styles";

import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) return null;

  // ✅ Apply AFTER fonts load
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = {
    fontFamily: "Montserrat_400Regular",
  };

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
