import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from '../Screens/Dashboard';
import Resume from '../Screens/Resume';
import Profile from '../Screens/Profile';
import Training from '../Screens/Training';

const Tab = createBottomTabNavigator();


const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'speedometer' : 'speedometer-outline';
              break;
            case 'Resume':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Training':
              iconName = focused ? 'school' : 'school-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f47920',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}} />
      <Tab.Screen name="Resume" component={Resume} options={{headerShown: false}} />
      <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}} />
      <Tab.Screen name="Training" component={Training} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
