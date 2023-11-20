import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons,FontAwesome5 } from "@expo/vector-icons";
import SearchScreen from "../../features/hiking/screens/search.screen";
import { Text } from "react-native";

// import SettingScreen from "../../features/setting/screens/setting.screen";
import { HikingNavigator } from "./hiking.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Hiking: "hiking",
  Search: "ios-search",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  
  const IconComponent = route.name === 'Search' ? Ionicons : FontAwesome5;

  return {
    tabBarIcon: ({ size, color }) => (
      <IconComponent name={iconName} size={size} color={color} />
    ),
  }; 
};

export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "green",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Hiking"
        component={HikingNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);
