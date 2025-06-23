import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function ForgotPassword({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleForgotSubmit = async (e) => {
    setIsLoading(true);

    try {
      const response = await fetch("https://alpinum-consulting.vercel.app/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
       Toast.show({
        type: 'error',
        text1: 'Error',
        text2: result?.error || 'Something went wrong',
      });
       return
      }

      Toast.show({
      type: 'success',
      text1: 'Success',
      text2: result.message || 'Check your email.',
    });
    } catch (err) {
      console.error("err", err);
      Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err.message || 'Something went wrong during password reset',
    });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../src/Images/old-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address below and we'll send you instructions to reset your password.
      </Text>

      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(val) => setFormData({ ...formData, email: val })}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleForgotSubmit} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send Email</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.linkText}>
        Sign in again?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Sign In Here
        </Text>
      </Text>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#f47920',
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#444',
  },
  link: {
    color: '#f47920',
    fontWeight: 'bold',
  },
});
