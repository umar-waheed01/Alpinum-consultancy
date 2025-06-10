import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screens/Login';
import ForgotPassword from './src/Screens/ForgotPassword';
import SignUp from './src/Screens/SignUp';
import BottomTabs from './src/BottomNavigation/BottomTabs.jsx'
import { Provider } from 'react-redux';
import store from './src/context/store.jsx';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="BottomTabs" component={BottomTabs}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
