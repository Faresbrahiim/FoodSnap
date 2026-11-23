import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  Platform,
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  type TextInputInstance,
} from 'react-native';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { CustomInput } from '@/components/auth/CustomInput';
import { PrimaryButton } from '@/components/auth/PrimaryButton';
import { SocialLogin } from '@/components/auth/SocialLogin';

type ActiveField = 'email' | 'password';
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const emailInput = React.useRef<TextInputInstance>(null);
  const passwordInput = React.useRef<TextInputInstance>(null);
  const loginButtonRef = useRef<React.ElementRef<typeof View> | null>(null);
  const activeField = useRef<ActiveField | null>(null);
  const keyboardTop = useRef<number | null>(null);
  const currentContentOffset = useRef(0);
  const contentTranslateY = useRef(new Animated.Value(0)).current;

  const animateContentTo = useCallback(
    (offset: number) => {
      contentTranslateY.stopAnimation();
      Animated.timing(contentTranslateY, {
        toValue: offset,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    },
    [contentTranslateY]
  );

  const measureAndAdjust = useCallback(() => {
    const field = activeField.current;
    const keyboardTopY = keyboardTop.current;
    if (!field || keyboardTopY == null) return;

    const inputRef = field === 'email' ? emailInput.current : passwordInput.current;
    inputRef?.measureInWindow((_x, y, _width, height) => {
      const baseInputBottom = y + height - currentContentOffset.current;
      let requiredOffset = Math.max(0, baseInputBottom + 12 - keyboardTopY);
      const applyOffset = () => animateContentTo(-requiredOffset);

      if (field !== 'password' || !loginButtonRef.current) {
        applyOffset();
        return;
      }

      loginButtonRef.current.measureInWindow((_buttonX, buttonY, _buttonWidth, buttonHeight) => {
        const baseButtonBottom = buttonY + buttonHeight - currentContentOffset.current;
        requiredOffset = Math.max(requiredOffset, baseButtonBottom + 12 - keyboardTopY);
        applyOffset();
      });
    });
  }, [animateContentTo]);

  useEffect(() => {
    const listenerId = contentTranslateY.addListener(({ value }) => {
      currentContentOffset.current = value;
    });
    return () => contentTranslateY.removeListener(listenerId);
  }, [contentTranslateY]);

  useEffect(() => {
    const frameEvent = Platform.OS === 'ios' ? 'keyboardWillChangeFrame' : 'keyboardDidShow';
    const hideEvent = 'keyboardDidHide';
    const frameSubscription = Keyboard.addListener(frameEvent, (event) => {
      keyboardTop.current = event.endCoordinates.screenY;
      requestAnimationFrame(() => requestAnimationFrame(measureAndAdjust));
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      keyboardTop.current = null;
      activeField.current = null;
      animateContentTo(0);
    });

    return () => {
      frameSubscription.remove();
      hideSubscription.remove();
    };
  }, [animateContentTo, measureAndAdjust]);

  const handleEmailFocus = () => {
    activeField.current = 'email';
    requestAnimationFrame(measureAndAdjust);
  };

  const handleEmailBlur = () => {
    if (activeField.current === 'email') activeField.current = null;
  };

  const handlePasswordFocus = () => {
    activeField.current = 'password';
    requestAnimationFrame(measureAndAdjust);
  };

  const handlePasswordBlur = () => {
    if (activeField.current === 'password') activeField.current = null;
  };

  // Validation du formulaire
  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Champs obligatoires', 'Veuillez saisir votre e-mail et votre mot de passe.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('E-mail invalide', 'Veuillez saisir une adresse e-mail valide.');
      return;
    }

    Alert.alert(
      'Connexion indisponible',
      'Les champs sont valides, mais aucun service d’authentification n’est configuré. Aucune connexion n’a été effectuée.'
    );
  };

  // Mot de passe oublié
  const handleForgotPassword = () => {
    Alert.alert('Mot de passe oublié', 'La récupération sera ajoutée prochainement.');
  };

  // Connexion Google
  const handleGoogleLogin = () => {
    Alert.alert(
      'Google',
      'La connexion Google n’est pas disponible : aucun flux OAuth ni identifiant Google n’est configuré.'
    );
  };

  const handleAppleLogin = () => {
    Alert.alert(
      'Apple',
      'La connexion Apple n’est pas disponible : Sign in with Apple et sa configuration ne sont pas installés.'
    );
  };

  const handleEmailLogin = () => emailInput.current?.focus();

  // Inscription
  const handleRegister = () => {
    Alert.alert('Inscription', 'La navigation vers Register sera ajoutée prochainement.');
  };

  return (
    <AuthLayout contentTranslateY={contentTranslateY}>
      {/* Logo */}
      <AuthHeader />

      <Text style={styles.title}>Se connecter</Text>
      <Text style={styles.subtitle}>Bon retour parmi nous !</Text>

      <View style={styles.fields}>
        <CustomInput
          ref={emailInput}
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
          kind="email"
          accessibilityLabel="Adresse e-mail"
          placeholder="Adresse e-mail"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => passwordInput.current?.focus()}
          keyboardType="email-address"
          textContentType="emailAddress"
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <CustomInput
          ref={passwordInput}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
          kind="password"
          accessibilityLabel="Mot de passe"
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
          textContentType="password"
          returnKeyType="done"
          secureTextEntry={!showPassword}
          onToggleSecure={() => setShowPassword((visible) => !visible)}
        />
      </View>

      {/* Se souvenir de moi et mot de passe oublié */}
      <View style={styles.options}>
        <Pressable
          style={styles.rememberContainer}
          onPress={() => setRememberMe(!rememberMe)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: rememberMe }}>
          <View style={[styles.checkbox, rememberMe && styles.checked]}>
            {rememberMe && <Text style={styles.checkmark}>✓</Text>}
          </View>

          <Text style={styles.rememberText}>Se souvenir de moi</Text>
        </Pressable>

        <Pressable onPress={handleForgotPassword}>
          <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
        </Pressable>
      </View>

      <View ref={loginButtonRef} collapsable={false} style={styles.primaryButton}>
        <PrimaryButton title="Se connecter" onPress={handleLogin} />
      </View>

      <SocialLogin
        onGooglePress={handleGoogleLogin}
        onApplePress={handleAppleLogin}
        onEmailPress={handleEmailLogin}
      />

      {/* Lien vers inscription */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Vous n'avez pas de compte ?</Text>

        <Pressable onPress={handleRegister}>
          <Text style={styles.registerLink}>S'inscrire</Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3B2A1F',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 3,
  },

  subtitle: {
    color: '#5E5148',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },

  fields: {
    gap: 14,
  },

  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 2,
  },

  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  checkbox: {
    width: 19,
    height: 19,
    borderWidth: 1,
    borderColor: '#CDBEAF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checked: {
    backgroundColor: '#F36B16',
    borderColor: '#F36B16',
  },

  checkmark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  rememberText: {
    fontSize: 14,
    color: '#33271F',
  },

  forgotText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D603D',
  },

  primaryButton: {
    marginTop: 18,
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 0,
    gap: 5,
  },

  registerText: {
    fontSize: 14,
    color: '#49372B',
  },

  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D603D',
  },
});
