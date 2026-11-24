import { View } from 'react-native';

/** White corner brackets that frame the area to scan. */
export function ScanFrame() {
  return (
    <View className="h-80 w-full" pointerEvents="none">
      <View className="absolute left-0 top-0 h-12 w-12 rounded-tl-3xl border-l-4 border-t-4 border-white" />
      <View className="absolute right-0 top-0 h-12 w-12 rounded-tr-3xl border-r-4 border-t-4 border-white" />
      <View className="absolute bottom-0 left-0 h-12 w-12 rounded-bl-3xl border-b-4 border-l-4 border-white" />
      <View className="absolute bottom-0 right-0 h-12 w-12 rounded-br-3xl border-b-4 border-r-4 border-white" />
    </View>
  );
}