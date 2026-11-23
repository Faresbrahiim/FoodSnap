import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ArrowRight } from 'lucide-react-native';
import { useEffect } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type PrimaryButtonProps = {
  title: string;
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({
  title,
  loading = false,
  onPress,
  disabled = false,
}: PrimaryButtonProps) {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withSpring(loading ? 0.985 : 1, { damping: 18, stiffness: 220 });
  }, [loading, scale]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.975, { damping: 16, stiffness: 260 });
        }}
        onPressOut={() => {
          scale.value = withSpring(loading ? 0.985 : 1, { damping: 18, stiffness: 220 });
        }}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || loading, busy: loading }}
        className="h-[58px] flex-row items-center justify-center rounded-full bg-[#F36B16] px-5 shadow-sm active:bg-[#D9570C] disabled:opacity-60">
        <Text className="text-base font-bold text-white">{loading ? 'Connexion…' : title}</Text>
        <View className="absolute right-5">
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Icon as={ArrowRight} className="size-5 text-white" />
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}
