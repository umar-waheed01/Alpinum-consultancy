import 'react-native-gesture-handler';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/context/store'; 
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';

// Screens
import Login from './src/Screens/Login';
import SignUp from './src/Screens/SignUp';
import ForgotPassword from './src/Screens/ForgotPassword';
import ChangePassword from './src/Components/ChnagePassword';
import ResumeDetail from './src/Screens/ResumeDetail';
import ProfileOverview from './src/Screens/ProfileOverview';
import EditProfile from './src/Screens/EditProfile';
import DrawerNavigator from './src/Navigations/DrawerNavigator';
import CompanyProfile from './src/Screens/CompanyProfile';
import JobDetail from './src/Screens/JobDetail';

const Stack = createNativeStackNavigator();

function MainApp() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="ResumeDetail" component={ResumeDetail} />
          <Stack.Screen name="ProfileOverview" component={ProfileOverview} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
          <Stack.Screen name="JobDetail" component={JobDetail} />
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

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        }
        persistor={persistor}
      >
        <MenuProvider>
          <NavigationContainer>
            <MainApp />
            <Toast />
          </NavigationContainer>
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
}
