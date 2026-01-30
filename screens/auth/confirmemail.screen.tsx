import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ConfirmEmailScreen = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (code === '123456') {
        Alert.alert('Success', 'Email confirmed!');
      } else {
        Alert.alert('Error', 'Invalid confirmation code.');
      }
    }, 1000);
  };

  const handleResend = () => {
    Alert.alert('Resent', 'A new confirmation code has been sent to your email.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Email</Text>
      <Text style={styles.subtitle}>Enter the code sent to your email address.</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmation Code"
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
        editable={!loading}
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirm} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Confirming...' : 'Confirm'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resendButton} onPress={handleResend} disabled={loading}>
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: 8,
  },
  resendText: {
    color: '#007AFF',
    fontSize: 14,
  },
});

export default ConfirmEmailScreen;
