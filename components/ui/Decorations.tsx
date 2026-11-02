import { View } from 'react-native';

export function Decorations() {
  return (
    <View pointerEvents="none" className="absolute inset-0">
      {/* top-left orange blob */}
      <View className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-primary-light" />
      {/* bottom-right yellow blob */}
      <View className="absolute -bottom-20 -right-16 h-40 w-40 rounded-full bg-sun" />
      {/* bottom-left green leaf */}
      <View className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-leaf/70" />
    </View>
  );
}