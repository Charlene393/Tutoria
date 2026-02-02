 
import { AuthInput } from '@/components/auth/input';
import { windowHeight, windowWidth } from '@/themes/app.constant';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { useAuth } from '../../context/auth.context';
import SignUpScreen from './signup.screen';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Please enter a valid email address').label ("Email"),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Password must contain at least one special character')
    .label("Password"),
})
export default function SignInScreen() {
  const [signUpModalVisible, setSignUpModalVisible] = React.useState(false);
  const { login, loading } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  return (
    <View style = {{ alignItems: 'center', marginTop: 32 }}>
      <Formik
        initialValues={{email: "cha@gmai.com", password:"Abcd_1234"}}
        onSubmit={ (values) => {
          router.push("/(routes)/home")
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
          autoCapitalize="none"
        />
        {/* Error */}
        {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
        
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

        {/*Login*/}
  <TouchableOpacity onPress={() => handleSubmit()} disabled={loading}>
          <Text
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
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>
        {error && <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text>}
      <Pressable style={{ marginTop: 16 }}>
        <Text style={{ color: '#555' }}>
          Don&apos;t have an account?{' '}
          <Text
            style={{ color: '#000080', fontWeight: 'bold' }}
            onPress={() => setSignUpModalVisible(true)}
          >
            Sign Up
          </Text>
        </Text>
      </Pressable>
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
                height: windowHeight(520),
                marginHorizontal: windowWidth(50),
                backgroundColor: "#fff",
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={e => e.stopPropagation()}>
              <SignUpScreen onSuccess={() => setSignUpModalVisible(false)} />
            </Pressable>
          </BlurView>
        </Pressable>
      </Modal>
      </>
      
        )}
      
        
      </Formik>

    </View>
  )

}
  
  

  
  