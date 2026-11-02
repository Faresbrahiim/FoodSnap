import { Image, Text, View } from 'react-native';

export function Logo() {
  return (
    <View className="mt-20 items-center">
      <Image
        source={require('@/assets/images/chef-hat.png')}
        className="h-30 w-30"
        resizeMode="contain"
      />
      <Text className="mt-1 text-5xl font-extrabold">
        <Text className="text-foreground">Food</Text>
        <Text className="text-primary">Snap</Text>
      </Text>
    </View>
  );
}