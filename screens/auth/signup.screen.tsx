import { AuthInput } from '@/components/auth/input';
import { windowWidth } from '@/themes/app.constant';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function SignUpScreen() {
  const [role, setRole] = useState<string | null>(null);
  const [roleError, setRoleError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signUpAttempted, setSignUpAttempted] = useState(false);

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isStrongPassword(pw: string) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pw);
  }

  function handleSignUp() {
    setSignUpAttempted(true);
    let valid = true;
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!isStrongPassword(password)) {
      setPasswordError("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }
    if (!role) {
      setRoleError("Please select a role");
      valid = false;
    } else {
      setRoleError("");
    }
    if (!valid) return;
    // Proceed with sign up logic here
  }

  return (
    <View style={{ alignItems: 'center', marginTop: 2 }}>
         <View style={{ flexDirection: 'row', alignItems: 'center' , marginBottom:20}}>
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
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 19 }}>Create an Account</Text>
        <View style={{ marginBottom: 16, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <Pressable
              onPress={() => setRole('Tutor')}
              style={{
                backgroundColor: role === 'Tutor' ? '#000080' : '#fff',
                borderColor: '#000080',
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 24,
                marginRight: 8,
              }}
            >
              <Text style={{ color: role === 'Tutor' ? '#fff' : '#000080', fontWeight: 'bold' }}>Tutor</Text>
            </Pressable>
            <Pressable
              onPress={() => setRole('Student')}
              style={{
                backgroundColor: role === 'Student' ? '#000080' : '#fff',
                borderColor: '#000080',
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 24,
              }}
            >
              <Text style={{ color: role === 'Student' ? '#fff' : '#000080', fontWeight: 'bold' }}>Student</Text>
            </Pressable>
          </View>
          {roleError && (
            <Text style={{ color: 'red', marginTop: 6 }}>{roleError}</Text>
          )}
        </View>
      
      <AuthInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        label="Email address"
      />
      {emailError && (signUpAttempted || email.length > 0) && (
        <Text style={{ color: 'red', marginBottom: 8, alignSelf: 'flex-start', paddingLeft: 8 }}>{emailError}</Text>
      )}
      <AuthInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        label="Password"
      />
      {passwordError && (signUpAttempted || password.length > 0) && (
        <Text style={{ color: 'red', marginBottom: 8, alignSelf: 'flex-start', paddingLeft: 8 }}>{passwordError}</Text>
      )}
      <AuthInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
        label="Confirm Password"
      />
      {confirmPasswordError && (signUpAttempted || confirmPassword.length > 0) && (
        <Text style={{ color: 'red', marginBottom: 8, alignSelf: 'flex-start', paddingLeft: 8 }}>{confirmPasswordError}</Text>
      )}
      <Text
        onPress={handleSignUp}
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
        Create Account
      </Text>
    </View>
  );
}
