import { AuthInput } from '@/components/auth/input';
import { windowWidth } from '@/themes/app.constant';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
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
  const [role, setRole] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <View style = {{ alignItems: 'center', marginTop: 32 }}>
      <Formik
        initialValues={{email: "", password:"", confirmpassword: ""}}
        onSubmit={async (values) => {
          if (!role) {
            setRoleError('Please select a role.');
            return;
          }

          try {
            const response = await fetch(`http://localhost:4000/signup`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmpassword, // Include confirmPassword
                role, // Include role
              }),
            });

            console.log('Response:', response.status, await response.text()); // Debugging log

            if (!response.ok) {
              const errorData = await response.json();
              setError(errorData.message || 'Signup failed.');
              return;
            }

            setError(null);
            if (onSuccess) onSuccess();
            router.push('/home'); // Redirect to home page
          } catch (err) {
            setError('An unexpected error occurred. Please try again.');
          }
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
           Create an account to continue
        </Text>
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
          onBlur={handleBlur('password')}
          keyboardType="default"
          secureTextEntry={true}
        />

        <AuthInput
          value={values.confirmpassword}
          onChangeText={handleChange('confirmpassword')}
          placeholder="Confirm Password"
          label="Confirm Password"
          onBlur={handleBlur('confirmpassword')}
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




