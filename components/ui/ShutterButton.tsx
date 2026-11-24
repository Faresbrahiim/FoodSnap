import { Pressable, View } from 'react-native';

export function ShutterButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="h-20 w-20 items-center justify-center rounded-full border-4 border-white active:opacity-80"
    >
      <View className="h-14 w-14 rounded-full bg-primary" />
    </Pressable>
  );
}