import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from '../../components/NeumorphicComponents';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375; // Base width of 375 for scaling

type SignUpMethod = 'email' | 'mobile';
type SignUpStep = 'input' | 'otp';

type SignUpScreenProps = {
  setIsAuthenticated: (value: boolean) => void;
};

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ setIsAuthenticated }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [signUpMethod, setSignUpMethod] = useState<SignUpMethod>('email');
  const [signUpStep, setSignUpStep] = useState<SignUpStep>('input');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (signUpMethod === 'mobile' && signUpStep === 'input') {
        // Send OTP to mobile number
        setSignUpStep('otp');
      } else if (signUpMethod === 'mobile' && signUpStep === 'otp') {
        // Verify OTP and create account
        console.log('Verify OTP:', otp);
        await AsyncStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
      } else {
        // Email sign up
        console.log('Sign up with:', email);
        await AsyncStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // Implement Google sign up logic here
      console.log('Google sign up');
    } catch (error) {
      console.error('Google sign up error:', error);
    }
  };

  const handleSignInNavigation = () => {
    navigation.navigate('SignIn' as never);
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
            <Text style={[styles.title, { color: theme.colors.primary }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Join us and start learning
            </Text>
          </View>

          <NeumorphicView style={styles.formContainer}>
            <View style={styles.methodToggle}>
              <TouchableOpacity
                style={[styles.methodButton, signUpMethod === 'email' && styles.activeMethod]}
                onPress={() => setSignUpMethod('email')}
              >
                <Text style={[styles.methodText, { color: theme.colors.onSurface }]}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.methodButton, signUpMethod === 'mobile' && styles.activeMethod]}
                onPress={() => setSignUpMethod('mobile')}
              >
                <Text style={[styles.methodText, { color: theme.colors.onSurface }]}>Mobile</Text>
              </TouchableOpacity>
            </View>

            <NeumorphicView style={styles.inputContainer}>
              <Ionicons
                name={signUpMethod === 'email' ? 'mail-outline' : 'phone-portrait-outline'}
                size={24}
                color={theme.colors.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.colors.onSurface }]}
                placeholder={signUpMethod === 'email' ? 'Email' : 'Mobile Number'}
                placeholderTextColor={theme.colors.onSurfaceVariant}
                value={signUpMethod === 'email' ? email : mobile}
                onChangeText={signUpMethod === 'email' ? setEmail : setMobile}
                keyboardType={signUpMethod === 'email' ? 'email-address' : 'phone-pad'}
                autoCapitalize="none"
              />
            </NeumorphicView>

            {signUpMethod === 'email' ? (
              <>
                <NeumorphicView style={styles.inputContainer}>
                  <Ionicons
                    name={showPassword ? 'lock-open-outline' : 'lock-closed-outline'}
                    size={24}
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
                      size={24}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                </NeumorphicView>

                <NeumorphicView style={styles.inputContainer}>
                  <Ionicons
                    name={showConfirmPassword ? 'lock-open-outline' : 'lock-closed-outline'}
                    size={24}
                    color={theme.colors.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: theme.colors.onSurface }]}
                    placeholder="Confirm Password"
                    placeholderTextColor={theme.colors.onSurfaceVariant}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.showPasswordButton}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={24}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                </NeumorphicView>
              </>
            ) : signUpStep === 'otp' ? (
              <NeumorphicView style={styles.inputContainer}>
                <Ionicons
                  name="key-outline"
                  size={24}
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

            <TouchableOpacity
              onPress={handleSignUp}
              disabled={loading}
              style={[styles.signUpButton, { opacity: loading ? 0.7 : 1 }]}
            >
              <NeumorphicView style={styles.signUpButtonContent}>
                {loading ? (
                  <Text style={[styles.signUpText, { color: theme.colors.onPrimary }]}>Creating Account...</Text>
                ) : (
                  <Text style={[styles.signUpText, { color: theme.colors.onPrimary }]}>Create Account</Text>
                )}
              </NeumorphicView>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: theme.colors.onSurfaceVariant }]} />
              <Text style={[styles.dividerText, { color: theme.colors.onSurfaceVariant }]}>OR</Text>
              <View style={[styles.dividerLine, { backgroundColor: theme.colors.onSurfaceVariant }]} />
            </View>

            <TouchableOpacity onPress={handleGoogleSignUp} style={styles.googleButton}>
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
              Already have an account?
            </Text>
            <TouchableOpacity onPress={handleSignInNavigation}>
              <Text style={[styles.signInText, { color: theme.colors.primary }]}> Sign In</Text>
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
  signUpButton: {
    marginBottom: getScaledSize(24),
  },
  signUpButtonContent: {
    backgroundColor: '#007AFF',
    padding: getScaledSize(16),
    borderRadius: getScaledSize(12),
    alignItems: 'center',
  },
  signUpText: {
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
  signInText: {
    fontSize: getScaledSize(14),
    fontWeight: '600',
  },
});