import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "react-native-vector-icons";
import Home from "../screens/Home";
import Giveaways from "../screens/Giveaways";
import Detail from "../screens/Detail";
import Saved from "../screens/Saved";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();
const GiveawaysStack = createNativeStackNavigator();

const GiveawaysNavigator = () => {
  return (
    <GiveawaysStack.Navigator>
      <GiveawaysStack.Screen
        name="GiveawaysList"
        component={Giveaways}
        options={{ headerShown: false }}
      />
      <GiveawaysStack.Screen
        name="Detail"
        component={Detail}
        options={({ route }) => ({
          title: route.params?.title || "Giveaway Details",
          headerBackTitle: "Back",
        })}
      />
    </GiveawaysStack.Navigator>
  );
};

const Root = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Giveaways") {
              iconName = focused
                ? "game-controller"
                : "game-controller-outline";
            } else if (route.name === "Saved") {
              iconName = focused ? "heart" : "heart-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Giveaways" component={GiveawaysNavigator} />
        <Tab.Screen name="Saved" component={Saved} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Root;
