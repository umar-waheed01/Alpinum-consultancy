import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dashboard from "../Screens/Dashboard";
import Resume from "../Screens/Resume";
import Profile from "../Screens/Profile";
import Training from "../Screens/Training";
import CustomDrawerContent from "../../Components/ContractorDrawerContent";
import Offers from "../Screens/Offers";
import JobPosts from "../Screens/JobPosts";
import ProfileOverview from "../Screens/ProfileOverview";
import EditProfile from "../Screens/EditProfile";
import CompanyProfile from "../Screens/CompanyProfile";
import JobDetail from "../Screens/JobDetail";

const Drawer = createDrawerNavigator();

const ContractorNavigator = () => {
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
      <Drawer.Screen name="Resume" component={Resume} />
     
      <Drawer.Screen name="ProfileOverview" component={ProfileOverview} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />

      <Drawer.Screen name="Training" component={Training} />
      <Drawer.Screen name="Offers" component={Offers} />
      <Drawer.Screen name="CompanyProfile" component={CompanyProfile} />
      <Drawer.Screen name="JobPosts" component={JobPosts} />
      <Drawer.Screen name="JobDetail" component={JobDetail} />
    </Drawer.Navigator>
  );
};


export default ContractorNavigator;
