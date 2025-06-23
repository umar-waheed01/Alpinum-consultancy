import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CompanyDrawerContent = (props) => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const activeRoute = props.state.routeNames[props.state.index];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.logoContainer}>
        <TouchableOpacity>
          <Image
            source={require('../Images/old-logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>

      {/* Dashboard */}
      <DrawerItem
        label="Dashboard"
        icon={({ size }) => (
          <Ionicons
            name="speedometer-outline"
            size={size}
            color={activeRoute === 'Dashboard' ? '#fff' : 'gray'}
          />
        )}
        onPress={() => props.navigation.navigate('Dashboard')}
        style={[
          styles.drawerItem,
          activeRoute === 'Dashboard' && styles.activeItem,
        ]}
        labelStyle={[
          styles.label,
          activeRoute === 'Dashboard' && styles.activeLabel,
        ]}
      />

      {/* Profile Expandable */}
      <TouchableOpacity
        style={styles.profileToggle}
        onPress={() => setShowProfileOptions(!showProfileOptions)}
      >
        <Ionicons name="person-outline" size={22} color="gray" />
        <Text style={styles.profileLabel}>Profile</Text>
        <Ionicons
          name={showProfileOptions ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="gray"
          style={{ marginLeft: 'auto' }}
        />
      </TouchableOpacity>

      {showProfileOptions && (
        <View style={{ paddingLeft: 40 }}>
          <DrawerItem
            label="Profile Overview"
            onPress={() => props.navigation.navigate('ProfileOverview')}
            style={[
              styles.drawerItem,
              activeRoute === 'ProfileOverview' && styles.activeItem,
            ]}
            labelStyle={[
              styles.subItem,
              activeRoute === 'ProfileOverview' && styles.activeLabel,
            ]}
          />
          <DrawerItem
            label="Edit Profile"
            onPress={() => props.navigation.navigate('EditProfile')}
            style={[
              styles.drawerItem,
              activeRoute === 'EditProfile' && styles.activeItem,
            ]}
            labelStyle={[
              styles.subItem,
              activeRoute === 'EditProfile' && styles.activeLabel,
            ]}
          />
        </View>
      )}

      {/* Training */}
      <DrawerItem
        label="Job Posts"
        icon={({ size }) => (
          <Ionicons
            name="school-outline"
            size={size}
            color={activeRoute === 'Training' ? '#fff' : 'gray'}
          />
        )}
        onPress={() => props.navigation.navigate('JobPosts')}
        style={[
          styles.drawerItem,
          activeRoute === 'JobPosts' && styles.activeItem,
        ]}
        labelStyle={[
          styles.label,
          activeRoute === 'JobPosts' && styles.activeLabel,
        ]}
      />

      {/* Offers */}
      <DrawerItem
        label="Contractors"
        icon={({ size }) => (
          <Ionicons
            name="pricetags-outline"
            size={size}
            color={activeRoute === 'Contractors' ? '#fff' : 'gray'}
          />
        )}
        onPress={() => props.navigation.navigate('Contractors')}
        style={[
          styles.drawerItem,
          activeRoute === 'Contractors' && styles.activeItem,
        ]}
        labelStyle={[
          styles.label,
          activeRoute === 'Contractors' && styles.activeLabel,
        ]}
      />

      {/* Contracts */}
      <DrawerItem
        label="Contracts"
        icon={({ size }) => (
          <Ionicons
            name="briefcase-outline"
            size={size}
            color={activeRoute === 'Contracts' ? '#fff' : 'gray'}
          />
        )}
        onPress={() => props.navigation.navigate('Contracts')}
        style={[
          styles.drawerItem,
          activeRoute === 'Contracts' && styles.activeItem,
        ]}
        labelStyle={[
          styles.label,
          activeRoute === 'Contracts' && styles.activeLabel,
        ]}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
  profileToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  profileLabel: {
    fontSize: 16,
    marginLeft: 30,
    color: 'gray',
  },
  drawerItem: {
    borderRadius: 0,
    marginHorizontal: 10,
  },
  activeItem: {
    backgroundColor: '#f47920',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    color: 'gray',
  },
  activeLabel: {
    color: '#fff',
  },
  subItem: {
    fontSize: 15,
    marginLeft: -10,
    color: 'gray',
  },
});

export default CompanyDrawerContent;
