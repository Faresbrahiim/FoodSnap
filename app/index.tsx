import { Text, View } from 'react-native';

export default function Screen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-5xl font-extrabold">
        <Text className="text-foreground">Food</Text>
        <Text className="text-primary">Snap</Text>
      </Text>
    </View>
  );
}