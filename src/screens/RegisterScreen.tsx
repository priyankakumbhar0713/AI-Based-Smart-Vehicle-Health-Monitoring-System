import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Define types
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

// Mock useAuth hook - replace with your actual implementation
const useAuth = () => {
  const register = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    // Implement your registration logic here
    console.log('Registering:', { name, email, password });
    return { success: true };
  };

  const loginWithGoogle = async () => {
    console.log('Google login');
    return { success: true };
  };

  const loginWithFacebook = async () => {
    console.log('Facebook login');
    return { success: true };
  };

  const loginWithLinkedIn = async () => {
    console.log('LinkedIn login');
    return { success: true };
  };

  return {
    register,
    loginWithGoogle,
    loginWithFacebook,
    loginWithLinkedIn,
  };
};

export default function RegisterScreen({ navigation }: Props) {
  // State management
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  const { register, loginWithGoogle, loginWithFacebook, loginWithLinkedIn } = useAuth();

  // Validation function
  const validateForm = (): boolean => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return false;
    }
    
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }
    
    if (!password) {
      Alert.alert('Validation Error', 'Please enter a password');
      return false;
    }
    
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters');
      return false;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return false;
    }
    
    return true;
  };

  // Handle email/password registration
  const handleRegister = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register({ 
        name: name.trim(), 
        email: email.trim().toLowerCase(), 
        password 
      });
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation?.navigate('Login') }
      ]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to register';
      Alert.alert('Registration Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'linkedin'): Promise<void> => {
    setSocialLoading(provider);
    try {
      let result;
      switch (provider) {
        case 'google':
          result = await loginWithGoogle();
          break;
        case 'facebook':
          result = await loginWithFacebook();
          break;
        case 'linkedin':
          result = await loginWithLinkedIn();
          break;
      }
      
      if (result?.success) {
        Alert.alert('Success', `Successfully signed in with ${provider}`);
        // navigation?.navigate('Home');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Unable to login with ${provider}`;
      Alert.alert(`${provider} Login Failed`, errorMessage);
    } finally {
      setSocialLoading(null);
    }
  };

  // Dynamic container based on platform
  const Container = Platform.OS === 'web' ? View : KeyboardAvoidingView;

  // Dynamic styles based on focus state
  const getInputStyle = (inputName: string): any[] => [
    styles.input,
    focusedInput === inputName && styles.inputFocused,
  ];

  const getPasswordContainerStyle = (inputName: string): any[] => [
    styles.passwordContainer,
    focusedInput === inputName && styles.passwordContainerFocused,
  ];

  // Check if a specific social provider is loading
  const isSocialLoading = (provider: string): boolean => socialLoading === provider;

  // Determine if any loading is happening
  const isAnyLoading = loading || socialLoading !== null;

  return (
    <Container
      style={styles.container}
      {...(Platform.OS !== 'web' && {
        behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        keyboardVerticalOffset: Platform.OS === 'ios' ? 64 : 0
      })}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={[styles.formContainer, Platform.OS === 'web' && styles.formContainerWeb]}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

            <View style={styles.form}>
              {/* Name Input */}
              <TextInput
                style={getInputStyle('name')}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                placeholderTextColor="#999"
                editable={!isAnyLoading}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                returnKeyType="next"
              />

              {/* Email Input */}
              <TextInput
                style={getInputStyle('email')}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
                editable={!isAnyLoading}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                returnKeyType="next"
              />

              {/* Password Input */}
              <View style={getPasswordContainerStyle('password')}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                  editable={!isAnyLoading}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  returnKeyType="next"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isAnyLoading}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>

              {/* Confirm Password Input */}
              <View style={getPasswordContainerStyle('confirmPassword')}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                  editable={!isAnyLoading}
                  onFocus={() => setFocusedInput('confirmPassword')}
                  onBlur={() => setFocusedInput(null)}
                  returnKeyType="done"
                  onSubmitEditing={handleRegister}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isAnyLoading}
                >
                  <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>

              {/* Register Button */}
              <TouchableOpacity
                style={[
                  styles.registerButton,
                  isAnyLoading && styles.disabledButton,
                ]}
                onPress={handleRegister}
                activeOpacity={0.8}
                disabled={isAnyLoading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.registerButtonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              {/* Social Login Section */}
              <View style={styles.socialSection}>
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.divider} />
                </View>

                <View style={styles.socialButtonsContainer}>
                  {/* Google Button */}
                  <TouchableOpacity
                    style={[styles.socialButton, styles.googleButton]}
                    onPress={() => handleSocialLogin('google')}
                    disabled={isAnyLoading}
                    activeOpacity={0.8}
                  >
                    {isSocialLoading('google') ? (
                      <ActivityIndicator color="#DB4437" />
                    ) : (
                      <>
                        <Text style={styles.googleIcon}>G</Text>
                        <Text style={[styles.socialButtonText, styles.googleButtonText]}>Google</Text>
                      </>
                    )}
                  </TouchableOpacity>

                  {/* Facebook Button */}
                  <TouchableOpacity
                    style={[styles.socialButton, styles.facebookButton]}
                    onPress={() => handleSocialLogin('facebook')}
                    disabled={isAnyLoading}
                    activeOpacity={0.8}
                  >
                    {isSocialLoading('facebook') ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <>
                        <Text style={styles.facebookIcon}>f</Text>
                        <Text style={[styles.socialButtonText, styles.facebookButtonText]}>Facebook</Text>
                      </>
                    )}
                  </TouchableOpacity>

                  {/* LinkedIn Button */}
                  <TouchableOpacity
                    style={[styles.socialButton, styles.linkedinButton]}
                    onPress={() => handleSocialLogin('linkedin')}
                    disabled={isAnyLoading}
                    activeOpacity={0.8}
                  >
                    {isSocialLoading('linkedin') ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <>
                        <Text style={styles.linkedinIcon}>in</Text>
                        <Text style={[styles.socialButtonText, styles.linkedinButtonText]}>LinkedIn</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
                  <Text style={styles.loginLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: Platform.OS === 'web' ? 32 : 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
  },
  formContainerWeb: {
    maxWidth: 400,
    marginHorizontal: 'auto' as any,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eaeaea',
    ...(Platform.OS === 'web' 
      ? { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' } 
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }),
  },
  title: {
    fontSize: Platform.select({ web: 32, default: 28 }),
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: Platform.select({ web: 16, default: 15 }),
    color: '#666',
    textAlign: 'center',
    marginBottom: Platform.select({ web: 32, default: 24 }),
  },
  form: {
    width: '100%',
  },
  input: {
    height: Platform.select({ web: 48, default: 52 }),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    color: '#333',
    fontSize: Platform.select({ web: 15, default: 16 }),
  },
  inputFocused: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
  },
  passwordContainerFocused: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  passwordInput: {
    flex: 1,
    height: Platform.select({ web: 48, default: 52 }),
    paddingHorizontal: 16,
    color: '#333',
    fontSize: Platform.select({ web: 15, default: 16 }),
  },
  eyeButton: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  eyeIcon: {
    fontSize: 20,
  },
  registerButton: {
    backgroundColor: '#007AFF',
    height: Platform.select({ web: 50, default: 54 }),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#99c2ff',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: Platform.select({ web: 17, default: 18 }),
    fontWeight: '600',
  },
  socialSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButtonsContainer: {
    gap: 12,
  },
  socialButton: {
    height: Platform.select({ web: 48, default: 50 }),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  facebookButton: {
    backgroundColor: '#1877f2',
    borderColor: '#1877f2',
  },
  linkedinButton: {
    backgroundColor: '#0077b5',
    borderColor: '#0077b5',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DB4437',
    marginRight: 8,
  },
  facebookIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  linkedinIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
    backgroundColor: '#0077b5',
    paddingHorizontal: 2,
  },
  socialButtonText: {
    fontSize: Platform.select({ web: 15, default: 16 }),
    fontWeight: '500',
  },
  googleButtonText: {
    color: '#333',
  },
  facebookButtonText: {
    color: '#fff',
  },
  linkedinButtonText: {
    color: '#fff',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#666',
    fontSize: Platform.select({ web: 15, default: 14 }),
  },
  loginLink: {
    color: '#007AFF',
    fontSize: Platform.select({ web: 15, default: 14 }),
    fontWeight: '600',
  },
});