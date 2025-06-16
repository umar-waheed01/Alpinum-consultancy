import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../context/slice";
import Toast from "react-native-toast-message";

const TopHeader = ({ title }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async (e) => {
    try {
      const res = await fetch(
        "https://alpinum-consulting.vercel.app/api/auth/sign-out",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();
      console.log("++++++++++++++", result);

      if (!res.ok) {
        Toast.show({
          type: "error",
          text1: "Logout Failed",
          text2: result.error || "Something went wrong.",
        });
        return;
      }

      if (res.status === 200) {
        Toast.show({
          type: "success",
          text1: "Logged Out",
          text2: result.message || "You have been logged out.",
        });

        dispatch(setToken(null));
        dispatch(setUser(null));
        console.log(dispatch(setToken(null)));
        console.log(dispatch(setUser(null)));

      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Something went wrong.",
      });
    }
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Image source={require("../Images/old-logo.png")} style={styles.logo} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <Menu>
        <MenuTrigger>
          <Ionicons name="person-outline" size={28} color="#000" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={handleChangePassword} text="Change Password" />
          <MenuOption onSelect={handleLogout} text="Logout" />
        </MenuOptions>
      </Menu>
      <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="menu" size={30} color="#f47920" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
});

export default TopHeader;
