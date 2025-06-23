import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dashboard from "../Screens/Dashboard";
import JobPosts from "../Screens/JobPosts";
import Contracts from "../Screens/Contracts";
import CompanyDrawerContent from "../../Components/CompanyDrawerContent";
import ProfileOverview from "../Screens/ProfileOverview";
import EditProfile from "../Screens/EditProfile";
import Contractors from "../Screens/Contractors";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CompanyDrawerContent {...props} />}
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

          return iconName ? <Ionicons name={iconName} size={size} color={color} /> : null;
        },
        drawerActiveTintColor: "#f47920",
        drawerInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
     
      <Drawer.Screen name="ProfileOverview" component={ProfileOverview} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />

      <Drawer.Screen name="JobPosts" component={JobPosts} />
      <Drawer.Screen name="Contractors" component={Contractors} />
      <Drawer.Screen name="Contracts" component={Contracts} />
    </Drawer.Navigator>
  );
};


export default DrawerNavigator;
