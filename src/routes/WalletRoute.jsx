import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MoneyBalance from "../screens/Wallet/MoneyBalance";
import TlBalance from "../screens/Wallet/TlBalance";
import MyCards from "../screens/Wallet/MyCards";

const Tab = createMaterialTopTabNavigator();
const WalletRoute = () => {
  return (
    <Tab.Navigator
      initialRouteName="MoneyBalance"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#4b4b4b",
          height: 3,
        },
      }}
    >
      <Tab.Screen
        name="MoneyBalance"
        component={MoneyBalance}
        options={{ title: "Paracık Bakiye" }}
      />
      <Tab.Screen
        name="TlBalance"
        component={TlBalance}
        options={{ title: "TL Bakiye" }}
      />
      <Tab.Screen
        name="MyCards"
        component={MyCards}
        options={{ title: "Kartlarım" }}
      />
    </Tab.Navigator>
  );
};

export default WalletRoute;

const styles = StyleSheet.create({});
