import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dashboard from "../Screens/Dashboard";
import Resume from "../Screens/Resume";
import Profile from "../Screens/Profile";
import Training from "../Screens/Training";
import CustomDrawerContent from "../Components/CustomDrawerContent";
import Offers from "../Screens/Offers";
import JobPosts from "../Screens/JobPosts";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, size, color }) => {
          let iconName;
          switch (route.name) {
            case "Dashboard":
              iconName = focused ? "speedometer" : "speedometer-outline";
              break;
            case "Resume":
              iconName = focused ? "document-text" : "document-text-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Training":
              iconName = focused ? "school" : "school-outline";
              break;
            case "Offers":
              iconName = focused ? "pricetags" : "pricetags-outline";
              break;
            case "JobPosts":
              iconName = focused ? "briefcase" : "briefcase-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        drawerActiveTintColor: "#f47920",
        drawerInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Resume" component={Resume} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Training" component={Training} />
      <Drawer.Screen name="Offers" component={Offers} />
      <Drawer.Screen name="JobPosts" component={JobPosts} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
