import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LockKeyhole, Mail, Phone, UserRound } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import colors from '../constants/colors';
import { RegisterData, RegisterErrors } from '../types/auth';
import { validateRegister } from '../utils/authValidation';
import { registerUser } from '../services/authService';

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  icon: typeof UserRound;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'words';
};

function RegisterField({
  label,
  placeholder,
  value,
  onChangeText,
  icon: Icon,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: FieldProps) {
  return (
    <View style={styles.field}>
      <View style={[styles.inputWrap, error ? styles.inputError : null]}>
        <Icon size={19} color={colors.text} strokeWidth={1.8} />
        <TextInput
          style={styles.input}
          accessibilityLabel={label}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
};

function RegisterPasswordField({ label, placeholder, value, onChangeText, error }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.field}>
      <View style={[styles.inputWrap, error ? styles.inputError : null]}>
        <LockKeyhole size={19} color={colors.text} strokeWidth={1.8} />
        <TextInput
          style={styles.input}
          accessibilityLabel={label}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable
          onPress={() => setVisible((current) => !current)}
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          hitSlop={8}
        >
          <Text style={styles.toggle}>{visible ? 'Masquer' : 'Afficher'}</Text>
        </Pressable>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

function GoogleLogo() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" accessibilityLabel="Google">
      <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <Path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.94l3.66-2.84Z" />
      <Path fill="#EA4335" d="M12 5.37c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.53 10.53 0 0 0 12 1a11 11 0 0 0-9.82 6.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
    </Svg>
  );
}

function AppleLogo() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" accessibilityLabel="Apple">
      <Path
        fill="#111111"
        d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.08-.35C2.82 15.05 3.57 6.61 9.09 6.31c1.34.07 2.28.74 3.09.8 1.2-.24 2.34-.93 3.63-.84 1.55.12 2.72.74 3.5 1.87-3.2 1.91-2.44 6.11.5 7.28-.58 1.53-1.33 3.05-2.76 4.86ZM12.03 6.25c-.15-2.27 1.69-4.15 3.83-4.34.3 2.61-2.37 4.58-3.83 4.34Z"
      />
    </Svg>
  );
}

export default function RegisterScreen() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const contentWidth = Math.min(screenWidth, 520) - 56;
  const headerWidth = contentWidth * 0.9;
  const headerHeight = Math.min(headerWidth / (2170 / 725), 96);
  const footerWidth = Math.min(screenWidth * 0.88, 464);
  const footerHeight = footerWidth / (2172 / 724);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const data: RegisterData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
      ...(phone.trim() ? { phone: phone.trim() } : {}),
    };
    const validation = validateRegister(data, confirmPassword);
    setErrors(validation.errors);
    if (!validation.isValid) return;

    try {
      setLoading(true);
      await registerUser(data);
      Alert.alert('Inscription réussie', 'Votre compte a été créé avec succès.', [
        { text: 'Se connecter', onPress: () => router.replace('/login') },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue.';
      Alert.alert('Inscription impossible', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('../assets/images/foodsnap-header.png')}
            style={[styles.headerImage, { height: headerHeight }]}
            resizeMode="contain"
            accessibilityLabel="Logo FoodSnap et slogan Capturez, Cuisinez, Savourez"
          />

          <View style={styles.titleBlock}>
            <Text style={styles.title}>S'inscrire</Text>
            <Text style={styles.subtitle}>Rejoignez notre communauté gourmande !</Text>
          </View>

        <View style={styles.form}>
            <RegisterField
              label="Nom complet"
              placeholder="Votre nom complet"
              value={fullName}
              onChangeText={setFullName}
              icon={UserRound}
              autoCapitalize="words"
              error={errors.fullName}
            />
            <RegisterField
              label="Adresse e-mail"
              placeholder="vous@exemple.com"
              value={email}
              onChangeText={setEmail}
              icon={Mail}
              keyboardType="email-address"
              error={errors.email}
            />
            <RegisterPasswordField
              label="Mot de passe"
              placeholder="Choisissez un mot de passe"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
            />
            <RegisterPasswordField
              label="Confirmer le mot de passe"
              placeholder="Saisissez-le à nouveau"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
            />
            <RegisterField
              label="Téléphone (facultatif)"
              placeholder="Votre numéro de téléphone"
              value={phone}
              onChangeText={setPhone}
              icon={Phone}
              keyboardType="phone-pad"
            />

            <Pressable
              style={({ pressed }) => [styles.submit, pressed && styles.submitPressed, loading && styles.submitDisabled]}
              onPress={handleRegister}
              disabled={loading}
              accessibilityRole="button"
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <>
                  <Text style={styles.submitText}>Créer mon compte</Text>
                  <Text style={styles.submitArrow}>→</Text>
                </>
              )}
            </Pressable>

            <View style={styles.socialDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Ou continuer avec</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <View style={styles.socialButton} accessibilityLabel="Continuer avec Google (indisponible)">
                <GoogleLogo />
                <Text style={styles.socialText}>Google</Text>
              </View>
              <View style={styles.socialButton} accessibilityLabel="Continuer avec Apple (indisponible)">
                <AppleLogo />
                <Text style={styles.socialText}>Apple</Text>
              </View>
              <View style={styles.socialButton} accessibilityLabel="Continuer avec e-mail (indisponible)">
                <Mail size={17} color={colors.text} />
                <Text style={styles.socialText}>E-mail</Text>
              </View>
            </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Déjà un compte ? </Text>
            <Pressable onPress={() => router.push('/login')} hitSlop={8}>
              <Text style={styles.loginLink}>Se connecter</Text>
            </Pressable>
          </View>
          </View>
          </ScrollView>
        <Image
          source={require('../assets/images/foodsnap-footer.png')}
          style={[styles.footerImage, { width: footerWidth, height: footerHeight }]}
          resizeMode="contain"
          accessibilityLabel="Décoration végétale, vague jaune, poivre et bol de salade"
        />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingTop: 4,
    paddingBottom: 2,
  },
  headerImage: {
    width: '88%',
    alignSelf: 'center',
    marginBottom: 2,
  },
  titleBlock: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    marginTop: 0,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 2,
  },
  form: {
    width: '100%',
  },
  field: {
    width: '100%',
    marginBottom: 10,
  },
  inputWrap: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 28,
    backgroundColor: '#FFFCF7',
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 15,
  },
  inputError: {
    borderColor: colors.error,
  },
  toggle: {
    color: colors.green,
    fontSize: 11,
    fontWeight: '700',
  },
  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 12,
  },
  submit: {
    minHeight: 54,
    marginTop: 6,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: colors.primary,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4,
  },
  submitText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  submitArrow: {
    position: 'absolute',
    right: 19,
    color: colors.white,
    fontSize: 21,
    fontWeight: '600',
  },
  submitPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  submitDisabled: {
    opacity: 0.65,
  },
  socialDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  socialButton: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    opacity: 0.8,
  },
  socialText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 248, 239, 0.94)',
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  loginLink: {
    color: colors.green,
    fontSize: 13,
    fontWeight: '800',
  },
  footerImage: {
    alignSelf: 'center',
    flexShrink: 0,
  },
});
