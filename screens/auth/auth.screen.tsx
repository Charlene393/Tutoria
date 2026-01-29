 
import { ForgotPassword } from '@/components/auth/forgotpassword';
import { AuthInput } from '@/components/auth/input';
import { windowHeight, windowWidth } from '@/themes/app.constant';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import SignUpScreen from './signup.screen';

 
export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [loginAttempted, setLoginAttempted] = React.useState(false);

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setupEmail(newEmail: string) {
    setEmail(newEmail);
    if (!isValidEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  }

  function isStrongPassword(pw: string) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pw);
  }

  function handleLogin() {
    setLoginAttempted(true);
    let valid = true;
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }
    if (!isStrongPassword(password)) {
      setPasswordError("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!valid) return;
    // Proceed with login logic here
  }
  const [signUpModalVisible, setSignUpModalVisible] = React.useState(false);
  function SignUpHandle() {
    setSignUpModalVisible(true);
  }

  return (
    <>
    <View style={{ alignItems: 'center', marginTop: 32 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' , marginBottom:12}}>
        <FontAwesome
          name="graduation-cap"
          size={40}
          color="#000080"
        />
        <Text style={{
          fontSize: 26,
          fontWeight: 'bold',
          marginLeft: 12,
          color: '#222',
        }}>
          Tutoria
        </Text>
      </View>
      
        <Text style={{
            fontSize: 16,
            textAlign: 'center',
            marginTop: 19,
            color: '#555',
            marginBottom: 24,
        }}>
            Sign in to your account to continue
        </Text>
        <AuthInput
          value={email}
          onChangeText={setupEmail}
          placeholder="you@example.com"
          label="Email address"
        />
        {emailError && (loginAttempted || email.length > 0) && (
          <Text style={{
            color: 'red',
            marginBottom: 8,
            alignSelf: 'flex-start',
            paddingLeft: 8,
          }}>{emailError}</Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 4, paddingHorizontal: 24}}>
          <Text style={{
            fontSize: 16,
            fontWeight: '500',
            color: '#222',
          }}>
            Password
          </Text>
          <View style={{ flex: 1 }} />
          <ForgotPassword onPress={() => {}} />
        </View>
        <AuthInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        {passwordError && (loginAttempted || password.length > 0) && (
          <Text style={{
            color: 'red',
            marginBottom: 8,
            alignSelf: 'flex-start',
            paddingLeft: 8,
          }}>{passwordError}</Text>
        )}
        
      <Text
        onPress={handleLogin}
        style={{
          backgroundColor: '#000080',
          color: '#fff',
          paddingVertical: 12,
          width: windowWidth(350),
          borderRadius: 8,
          textAlign: 'center',
          marginTop: 24,
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        Log In
      </Text>
      <Pressable style={{ marginTop: 16 }}>
        <Text style={{ color: '#555' }}>
          Don&apos;t have an account?{' '}
          <Text
            style={{ color: '#000080', fontWeight: 'bold' }}
            onPress={SignUpHandle}
          >
            Sign Up
          </Text>
        </Text>
      </Pressable>
    </View>
    <Modal
      animationType="fade"
      transparent={true}
      visible={signUpModalVisible}
      onRequestClose={() => setSignUpModalVisible(false)}
    >
      <Pressable style={{ flex: 1 }} onPress={() => setSignUpModalVisible(false)}>
        <BlurView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Pressable
            style={{
              width: windowWidth(420),
                height: windowHeight (520),
                marginHorizontal: windowWidth(50),
                backgroundColor: "#fff",
                borderRadius:30,
                alignItems:"center",
                justifyContent:"center",
            }}
            onPress={e => e.stopPropagation()}>
            <SignUpScreen />
          </Pressable>
        </BlurView>
      </Pressable>
    </Modal>
    </>
  );
}
