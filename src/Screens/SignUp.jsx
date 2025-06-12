import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function SignUp({ navigation }) {
  const [activeTab, setActiveTab] = useState('Contractor');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!agreeTerms) {
      Toast.show({
      type: 'error',
      text1: 'Terms Required',
      text2: 'You must agree to the Terms of User',
    });
      return;
    }

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      Toast.show({
      type: 'error',
      text1: 'Missing Fields',
      text2: 'Please fill all required fields.',
    });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Toast.show({
      type: 'error',
      text1: 'Password Mismatch',
      text2: 'Passwords do not match.',
    });
      return;
    }

    setLoading(true);

    try {
      let userRole = "";
    let payload = {};
    console.log("payload++++", payload)

    if (activeTab === "Contractor") {
      userRole = "CONTRACTOR";
      payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userRole,
      };
    } else if (activeTab === "Company") {
      userRole = "COMPANY";
      payload = {
        companyName: formData.companyName,
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userRole,
      };
    }
      const res = await fetch('https://alpinum-consulting.vercel.app/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("data+++",data)

      if (res.ok) {
        Toast.show({
        type: 'success',
        text1: 'Welcome',
        text2: 'Account Created Successfully!',
      });
        navigation.navigate('Login');
      } else {
        Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: data.message || 'Signup failed.',
      });
      }
    } catch (err) {
      console.error(err);
      Toast.show({
      type: 'error',
      text1: 'Network Error',
      text2: 'Please try again later.',
    });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../Images/old-logo.png')} style={styles.logo} />
        
      <Text style={styles.title}>Create An Account</Text>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        {['Contractor', 'Company'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Form Fields */}
      {activeTab === 'Contractor' ? (
        <>
          <TextInput
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(val) =>
              setFormData({ ...formData, firstName: val })
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(val) =>
              setFormData({ ...formData, lastName: val })
            }
            style={styles.input}
          />
        </>
      ) : (
        <TextInput
          placeholder="Company Name"
          value={formData.companyName}
          onChangeText={(val) =>
            setFormData({ ...formData, companyName: val })
          }
          style={styles.input}
        />
      )}

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(val) => setFormData({ ...formData, email: val })}
        style={styles.input}
      />

      {/* Password */}
      <View style={styles.passwordGroup}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPass}
          value={formData.password}
          onChangeText={(val) => setFormData({ ...formData, password: val })}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Text style={styles.toggle}>{showPass ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.passwordGroup}>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={!showConfirm}
          value={formData.confirmPassword}
          onChangeText={(val) =>
            setFormData({ ...formData, confirmPassword: val })
          }
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Text style={styles.toggle}>{showConfirm ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      {/* Terms Checkbox (simplified) */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAgreeTerms(!agreeTerms)}
      >
        <Text style={styles.checkboxText}>
          {agreeTerms ? '☑' : '☐'} I agree to the Terms of User
        </Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.signInText}>
        Already have an account?{' '}
        <Text
          style={styles.signInLink}
          onPress={() => navigation.navigate('Login')}
        >
          Sign In here
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 10,
  },
  activeTab: {
    borderBottomColor: '#f47920',
  },
  tabText: {
    color: '#555',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#f47920',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  passwordGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggle: {
    color: '#f47920',
    paddingLeft: 10,
  },
  checkboxContainer: {
    marginVertical: 10,
  },
  checkboxText: {
    color: '#333',
  },
  button: {
    backgroundColor: '#f47920',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signInText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  signInLink: {
    color: '#f47920',
    fontWeight: 'bold',
  },
});
