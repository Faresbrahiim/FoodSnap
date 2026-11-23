import React, { type PropsWithChildren } from 'react';
import { Animated, Image, Keyboard, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthLayoutProps = PropsWithChildren<{
  contentTranslateY?: Animated.Value;
}>;

export function AuthLayout({ children, contentTranslateY }: AuthLayoutProps) {
  return (
    <Pressable style={styles.root} onPress={Keyboard.dismiss} accessible={false}>
      <Animated.View
        style={[
          styles.screen,
          contentTranslateY ? { transform: [{ translateY: contentTranslateY }] } : null,
        ]}>
        {/* Illustration en arrière-plan */}
        <Image
          source={require('../../assets/images/food-decoration.png')}
          style={styles.decoration}
          resizeMode="contain"
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no"
        />

        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.content}>{children}</View>
        </SafeAreaView>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 148,
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 0,
  },
  decoration: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: '100%',
    height: 184,
  },
});
