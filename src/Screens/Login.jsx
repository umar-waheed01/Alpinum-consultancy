import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  CheckBox,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../context/slice';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('numan.tariq936@gmail.com');
  const [password, setPassword] = useState('Newflat@007');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and Password are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://alpinum-consulting.vercel.app/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("login++", data.user)

      if (response.ok) {
        dispatch(setUser(data.user));   
        dispatch(setToken(data.token)); 
        await AsyncStorage.setItem('userToken', data.token);
        
        Toast.show({
          type:'success',
          text1:'Success',
          text2: 'Login successful'
        })
        navigation.navigate('DrawerNavigator')
      } else {
        Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: data.message || 'Invalid credentials',
      });
      }
    } catch (error) {
      console.error('Login Error:', error);
      Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Something went wrong. Please try again.',
    });
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      {/* Logo and App Name */}
      <Image source={require('../Images/old-logo.png')} style={styles.logo} />
      <Text style={styles.appName}>Welcome Back</Text>

      {/* Email Field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/* Password Field */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.toggle}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        <Text style={styles.loginButtonText}>
          {loading ? <ActivityIndicator color="#fff" /> : 'Sign In'}
        </Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Not registered yet? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupLink}>SignUp here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // justifyContent: 'center',
    marginTop:"100"
  },
  logo: {
    // width: 150,
    // height: 150,
    // alignSelf: 'center',
    // marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    paddingRight: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  toggle: {
    color: '#f47920',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rememberMeText: {
    marginLeft: 8,
  },
  link: {
    color: '#f47920',
    marginBottom: 20,
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#f47920',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#333',
  },
  signupLink: {
    color: '#f47920',
    fontWeight: 'bold',
  },
});
