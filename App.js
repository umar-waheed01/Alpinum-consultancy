import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./src/context/store.jsx";
import { MenuProvider } from "react-native-popup-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

// Redux slice actions

// Screens
import Login from "./src/Screens/Login";
import SignUp from "./src/Screens/SignUp";
import ForgotPassword from "./src/Screens/ForgotPassword";
import BottomTabs from "./src/BottomNavigation/BottomTabs";
import ChangePassword from "./src/Components/ChnagePassword";
import ResumeDetail from "./src/Screens/ResumeDetail";
import { setToken } from "./src/context/slice.jsx";

const Stack = createNativeStackNavigator();

// 🔁 Inner app with access to Redux
function MainApp() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        if (storedToken) {
          dispatch(setToken(storedToken));
        }
      } catch (error) {
        console.error("Error reading token", error);
      } finally {
        setLoading(false);
      }
    };
    checkStoredToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="ResumeDetail" component={ResumeDetail} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      )}
    </Stack.Navigator>
  );
}

// 🔁 Top-level app
export default function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer>
          <MainApp />
          <Toast />
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
}
