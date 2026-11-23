import { Icon } from  '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react-native';
import * as React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputInstance,
  type TextInputProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

type CustomInputProps = Omit<TextInputProps, 'secureTextEntry'> & {
  label?: string;
  error?: string;
  kind: 'email' | 'password';
  secureTextEntry?: boolean;
  onToggleSecure?: () => void;
  shellStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export const CustomInput = React.forwardRef<TextInputInstance, CustomInputProps>(
  function CustomInput(
    {
      label,
      error,
      kind,
      secureTextEntry,
      onToggleSecure,
      className,
      shellStyle,
      inputStyle,
      accessibilityLabel,
      ...props
    },
    ref
  ) {
    const isPassword = kind === 'password';
    return (
      <View style={styles.wrapper}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <View style={[styles.shell, error ? styles.shellError : null, shellStyle]}>
          <Icon as={isPassword ? LockKeyhole : Mail} size={21} color="#33271F" strokeWidth={2.1} />
          <TextInput
            ref={ref}
            className={className}
            style={[styles.input, inputStyle]}
            accessibilityLabel={
              accessibilityLabel ?? label ?? (isPassword ? 'Mot de passe' : 'Adresse e-mail')
            }
            placeholderTextColor="#96877C"
            secureTextEntry={isPassword ? secureTextEntry : false}
            autoCapitalize={kind === 'email' ? 'none' : props.autoCapitalize}
            autoCorrect={kind === 'email' ? false : props.autoCorrect}
            {...props}
          />
          {isPassword && onToggleSecure ? (
            <Pressable
              onPress={onToggleSecure}
              accessibilityRole="button"
              accessibilityLabel={
                secureTextEntry ? 'Afficher le mot de passe' : 'Masquer le mot de passe'
              }
              accessibilityState={{ expanded: !secureTextEntry }}
              hitSlop={10}>
              <Icon
                as={secureTextEntry ? EyeOff : Eye}
                size={21}
                color="#33271F"
                strokeWidth={2.1}
              />
            </Pressable>
          ) : null}
        </View>
        {error ? (
          <Text accessibilityRole="alert" style={styles.error}>
            {error}
          </Text>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    gap: 7,
  },
  label: {
    color: '#49372B',
    fontSize: 14,
    fontWeight: '600',
  },
  shell: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E4D9CC',
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.42)',
  },
  shellError: {
    borderColor: '#C94332',
  },
  input: {
    flex: 1,
    minHeight: 52,
    paddingVertical: 0,
    color: '#33271F',
    fontSize: 16,
  },
  error: {
    color: '#B53328',
    fontSize: 12,
  },
});
