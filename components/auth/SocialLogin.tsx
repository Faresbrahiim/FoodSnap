import { Icon } from '@/components/ui/icon';
import { Mail } from 'lucide-react-native';
import type { PropsWithChildren } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type SocialLoginProps = {
  onGooglePress: () => void;
  onApplePress: () => void;
  onEmailPress: () => void;
};

export function SocialLogin({ onGooglePress, onApplePress, onEmailPress }: SocialLoginProps) {
  return (
    <View style={styles.container}>
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Ou continuer avec</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.buttons}>
        <SocialButton label="Google" onPress={onGooglePress}>
          <GoogleLogo />
        </SocialButton>
        <SocialButton label="Apple" onPress={onApplePress}>
          <AppleLogo />
        </SocialButton>
        <SocialButton label="E-mail" onPress={onEmailPress}>
          <Icon as={Mail} size={24} color="#171513" strokeWidth={2.1} />
        </SocialButton>
      </View>
    </View>
  );
}

function SocialButton({
  label,
  onPress,
  children,
}: PropsWithChildren<{ label: string; onPress: () => void }>) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Continuer avec ${label}`}
      style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}>
      {children}
    </Pressable>
  );
}

function GoogleLogo() {
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24" accessibilityLabel="Google">
      <Path
        fill="#4285F4"
        d="M23.49 12.27c0-.82-.07-1.61-.21-2.37H12v4.49h6.44c-.28 1.45-1.11 2.68-2.36 3.5v2.92h3.82c2.24-2.06 3.59-5.1 3.59-8.54Z"
      />
      <Path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.82-2.92c-1.07.72-2.44 1.15-4.13 1.15-3.17 0-5.86-2.14-6.82-5.02H1.23v3.01C3.21 21.17 7.27 24 12 24Z"
      />
      <Path
        fill="#FBBC05"
        d="M5.18 14.31c-.24-.72-.38-1.5-.38-2.31s.14-1.59.38-2.31V6.68H1.23C.45 8.23 0 10.05 0 12s.45 3.77 1.23 5.32l3.95-3.01Z"
      />
      <Path
        fill="#EA4335"
        d="M12 4.77c1.77 0 3.36.61 4.61 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.27 0 3.21 2.83 1.23 6.68l3.95 3.01C6.14 6.81 8.83 4.77 12 4.77Z"
      />
    </Svg>
  );
}

function AppleLogo() {
  return (
    <Svg width={21} height={25} viewBox="0 0 384 512" accessibilityLabel="Apple">
      <Path
        fill="#171513"
        d="M318.7 268c-.2-36.7 16.4-64.3 50.1-84.6-18.9-27.1-47.5-42-85.4-44.9-35.9-2.8-75.1 20.9-89.4 20.9-15.1 0-49.8-19.9-77.3-19.9C59.9 141.8 0 184.4 0 270.4c0 25.4 4.6 51.7 13.9 78.9 12.4 35.7 57.1 123.2 103.8 121.8 24.4-.6 41.6-17.3 74.9-17.3 32.3 0 48.1 17.3 75.3 17.3 47.1-.7 87.4-80.3 99.2-116.1-63-29.7-48.4-87-48.4-87zM262.5 103.5c27.6-32.8 25.1-62.8 24.3-73.5-24.4 1.4-52.7 16.6-68.8 35.3-17.7 19.8-28 44.3-25.8 72 26.4 2 50.5-11.5 70.3-33.8z"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DCCFC1',
  },
  separatorText: {
    color: '#38271D',
    fontSize: 14,
    fontWeight: '500',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    minWidth: 0,
    height: 48,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E4D9CC',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  buttonPressed: {
    opacity: 0.65,
  },
});
