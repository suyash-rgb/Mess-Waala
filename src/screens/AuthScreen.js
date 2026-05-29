import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { authStyles as styles } from '../styles/authStyles';
import Input from '../components/Input';
import Button from '../components/Button';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const validate = () => {
    if (!isLogin) {
      if (name.trim().length === 0) {
        Alert.alert('Invalid Input', 'Please enter your full name.');
        return false;
      }
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        Alert.alert('Invalid Input', 'Name can only contain letters and spaces.');
        return false;
      }
    }

    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      Alert.alert('Invalid Input', 'Please enter a valid 10-digit Indian mobile number starting with 6-9.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Invalid Input', 'Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      if (isLogin) {
        Alert.alert('Success', 'Logged in successfully!');
      } else {
        Alert.alert(
          'Success', 
          'Account created successfully!', 
          [{ text: 'OK', onPress: () => toggleScreen() }]
        );
      }
    }
  };

  const toggleScreen = () => {
    setIsLogin(!isLogin);
    setName('');
    setPhoneNumber('');
    setPassword('');
  };

  return (
    <ImageBackground 
      source={require('../../assets/bg.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.title}>MessWaala</Text>
            <Text style={styles.subtitle}>Taste of home, away from home</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
            
            {!isLogin && (
              <Input
                label="Full Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            )}

            <Input
              label="Mobile Number"
              placeholder="10-digit mobile number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handleSubmit} />

            {isLogin && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={toggleScreen}>
              <Text style={styles.signupLink}>{isLogin ? 'Sign Up' : 'Login'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      <StatusBar style="light" />
    </ImageBackground>
  );
}
