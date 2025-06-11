import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TopHeader = ({ title }) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Logged out');
    navigation.replace('Login');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
            <Image source={require('../Images/old-logo.png')} style={styles.logo} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom:20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});

export default TopHeader;

