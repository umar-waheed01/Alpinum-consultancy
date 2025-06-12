import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import TopHeader from '../Components/TopHeader';
import { useSelector } from 'react-redux';

export default function ChangePassword({ navigation }) {
  const token = useSelector((state) => state.auth.token);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://alpinum-consulting.vercel.app/api/auth/change-password', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.status === 201) {
        Alert.alert('Success', result.message || 'Password changed');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Change Password Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TopHeader title="Change Password" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Current Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrent}
            placeholder="Enter current password"
          />
          <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)} style={styles.toggleButton}>
            <Text>{showCurrent ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNew}
            placeholder="Enter new password"
          />
          <TouchableOpacity onPress={() => setShowNew(!showNew)} style={styles.toggleButton}>
            <Text>{showNew ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirm}
            placeholder="Confirm new password"
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.toggleButton}>
            <Text>{showConfirm ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Update Password</Text>}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingRight: 10,
  },
  toggleButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#f47920',
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
