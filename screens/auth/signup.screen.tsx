 
import { AuthInput } from '@/components/auth/input';
import { windowWidth } from '@/themes/app.constant';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Please enter a valid email address').label ("Email"),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Password must contain at least one special character')
    .label("Password"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required')
    .label('Confirm Password'),
    
})
type SignUpScreenProps = {
  onSuccess?: () => void;
};

export default function SignUpScreen({ onSuccess }: SignUpScreenProps) {
  const [error, setError] = useState<string | null>(null);


  return (
    <View style = {{ alignItems: 'center', marginTop: 32 }}>
      <Formik
        initialValues={{email: "", password:"", confirmpassword: ""}}
        onSubmit={async (values) => {
          // Check if user already exists in AsyncStorage
          const usersRaw = await AsyncStorage.getItem('users');
          const users = usersRaw ? JSON.parse(usersRaw) : [];
          const exists = users.some((u: any) => u.email === values.email);
          if (exists) {
            setError('An account with this email already exists.');
            return;
          }
          users.push({ email: values.email, password: values.password });
          await AsyncStorage.setItem('users', JSON.stringify(users));
          setError(null);
          if (onSuccess) onSuccess();
        }}
        validationSchema={validationSchema}
      >
        {({handleChange, handleBlur, handleSubmit, errors, setFieldTouched, touched, values}) => (
          <>
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
          value={values.email}
          onChangeText={handleChange('email')}
          placeholder="you@example.com"
          label="Email address"
          onBlur = {handleBlur ("email")}
          keyboardType="email-address"
        />
  {/* Error */}
  {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
  {error && <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text>}
        
        <AuthInput
          value={values.password}
          onChangeText={handleChange('password')}
          placeholder="password"
          label="Password"
          onBlur = {handleBlur ("password")}
          keyboardType="default"
          secureTextEntry={true}
        />
        {/* Error */}
        {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

        <AuthInput
          value={values.confirmpassword}
          onChangeText={handleChange('confirmpassword')}
          placeholder="Confirm Password"
          label="Confirm Password"
          onBlur = {handleBlur ("confirmpassword")}
          keyboardType="default"
          secureTextEntry={true}
        />
        {/* Error */}
        {touched.confirmpassword && errors.confirmpassword && <Text style={{ color: 'red' }}>{errors.confirmpassword}</Text>}


        {/*Login*/}
        <Text
          onPress={() => handleSubmit()}
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
          Sign Up
        </Text>
      </>
      
        )}
      
        
  </Formik>

    </View>
  )

}
  
  

  
  