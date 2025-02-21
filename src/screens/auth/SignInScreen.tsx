import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from '../../components/NeumorphicComponents';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375; // Base width of 375 for scaling

type SignInMethod = 'email' | 'mobile';
type SignInStep = 'input' | 'otp';

type SignInScreenProps = {
  setIsAuthenticated: (value: boolean) => void;
};

export const SignInScreen: React.FC<SignInScreenProps> = ({ setIsAuthenticated }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [signInMethod, setSignInMethod] = useState<SignInMethod>('email');
  const [signInStep, setSignInStep] = useState<SignInStep>('input');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSignIn = async () => {
    setLoading(true);
    try {
      if (signInMethod === 'mobile' && signInStep === 'input') {
        // Send OTP to mobile number
        setSignInStep('otp');
      } else if (signInMethod === 'mobile' && signInStep === 'otp') {
        // Verify OTP
        console.log('Verify OTP:', otp);
        await AsyncStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
      } else {
        // Email sign in
        console.log('Sign in with:', email);
        await AsyncStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Implement Google sign in logic here
      console.log('Google sign in');
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    console.log('Navigate to forgot password');
  };

  const handleSignUpNavigation = () => {
    navigation.navigate('SignUp' as never);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>Welcome Back!</Text>
            <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Sign in to continue learning
            </Text>
          </View>

          <NeumorphicView style={styles.formContainer}>
            <View style={styles.methodToggle}>
              <TouchableOpacity
                style={[styles.methodButton, signInMethod === 'email' && styles.activeMethod]}
                onPress={() => setSignInMethod('email')}
              >
                <Text style={[styles.methodText, { color: theme.colors.onSurface }]}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.methodButton, signInMethod === 'mobile' && styles.activeMethod]}
                onPress={() => setSignInMethod('mobile')}
              >
                <Text style={[styles.methodText, { color: theme.colors.onSurface }]}>Mobile</Text>
              </TouchableOpacity>
            </View>

            <NeumorphicView style={styles.inputContainer}>
              <Ionicons
                name={signInMethod === 'email' ? 'mail-outline' : 'phone-portrait-outline'}
                size={24}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.colors.onSurface }]}
                placeholder={signInMethod === 'email' ? 'Email' : 'Mobile Number'}
                placeholderTextColor={theme.colors.onSurfaceVariant}
                value={signInMethod === 'email' ? email : mobile}
                onChangeText={signInMethod === 'email' ? setEmail : setMobile}
                keyboardType={signInMethod === 'email' ? 'email-address' : 'phone-pad'}
                autoCapitalize="none"
              />
            </NeumorphicView>

            {signInMethod === 'email' ? (
              <NeumorphicView style={styles.inputContainer}>
                <Ionicons
                  name={showPassword ? 'lock-open-outline' : 'lock-closed-outline'}
                  size={getScaledSize(24)}
                  color={theme.colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.colors.onSurface }]}
                  placeholder="Password"
                  placeholderTextColor={theme.colors.onSurfaceVariant}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.showPasswordButton}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={getScaledSize(24)}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              </NeumorphicView>
            ) : signInStep === 'otp' ? (
              <NeumorphicView style={styles.inputContainer}>
                <Ionicons
                  name="key-outline"
                  size={getScaledSize(24)}
                  color={theme.colors.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.colors.onSurface }]}
                  placeholder="Enter OTP"
                  placeholderTextColor={theme.colors.onSurfaceVariant}
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </NeumorphicView>
            ) : null}

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={[styles.forgotPassword, { color: theme.colors.primary }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignIn}
              disabled={loading}
              style={[styles.signInButton, { opacity: loading ? 0.7 : 1 }]}
            >
              <NeumorphicView style={styles.signInButtonContent}>
                {loading ? (
                  <Text style={[styles.signInText, { color: theme.colors.onPrimary }]}>Signing in...</Text>
                ) : (
                  <Text style={[styles.signInText, { color: theme.colors.onPrimary }]}>Sign In</Text>
                )}
              </NeumorphicView>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: theme.colors.onSurfaceVariant }]} />
              <Text style={[styles.dividerText, { color: theme.colors.onSurfaceVariant }]}>OR</Text>
              <View style={[styles.dividerLine, { backgroundColor: theme.colors.onSurfaceVariant }]} />
            </View>

            <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleButton}>
              <NeumorphicView style={styles.googleButtonContent}>
                <Ionicons name="logo-google" size={24} color={theme.colors.error} />
                <Text style={[styles.googleButtonText, { color: theme.colors.onSurface }]}>
                  Continue with Google
                </Text>
              </NeumorphicView>
            </TouchableOpacity>
          </NeumorphicView>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleSignUpNavigation}>
              <Text style={[styles.signUpText, { color: theme.colors.primary }]}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getScaledSize = (size: number) => size * scale;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: getScaledSize(16),
  },
  header: {
    alignItems: 'center',
    marginVertical: getScaledSize(32),
  },
  title: {
    fontSize: getScaledSize(32),
    fontWeight: 'bold',
    marginBottom: getScaledSize(8),
  },
  subtitle: {
    fontSize: getScaledSize(16),
  },
  formContainer: {
    padding: getScaledSize(20),
    borderRadius: getScaledSize(20),
  },
  methodToggle: {
    flexDirection: 'row',
    marginBottom: getScaledSize(20),
    borderRadius: getScaledSize(12),
    overflow: 'hidden',
  },
  methodButton: {
    flex: 1,
    paddingVertical: getScaledSize(12),
    alignItems: 'center',
  },
  activeMethod: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  methodText: {
    fontSize: getScaledSize(16),
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getScaledSize(16),
    paddingHorizontal: getScaledSize(16),
    height: getScaledSize(56),
    borderRadius: getScaledSize(12),
  },
  inputIcon: {
    marginRight: getScaledSize(12),
  },
  input: {
    flex: 1,
    fontSize: getScaledSize(16),
  },
  showPasswordButton: {
    padding: getScaledSize(8),
  },
  forgotPassword: {
    textAlign: 'right',
    fontSize: getScaledSize(14),
    marginBottom: getScaledSize(24),
  },
  signInButton: {
    marginBottom: getScaledSize(24),
  },
  signInButtonContent: {
    backgroundColor: '#007AFF',
    padding: getScaledSize(16),
    borderRadius: getScaledSize(12),
    alignItems: 'center',
  },
  signInText: {
    fontSize: getScaledSize(18),
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getScaledSize(24),
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: getScaledSize(16),
    fontSize: getScaledSize(14),
  },
  googleButton: {
    marginBottom: getScaledSize(24),
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: getScaledSize(16),
    borderRadius: getScaledSize(12),
    backgroundColor: 'transparent',
  },
  googleButtonText: {
    fontSize: getScaledSize(16),
    fontWeight: '600',
    marginLeft: getScaledSize(12),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: getScaledSize(16),
  },
  footerText: {
    fontSize: getScaledSize(14),
  },
  signUpText: {
    fontSize: getScaledSize(14),
    fontWeight: '600',
  },
});