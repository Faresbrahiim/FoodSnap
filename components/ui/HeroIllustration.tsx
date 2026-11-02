import { Image, View } from 'react-native';

export function HeroIllustration() {
  return (
    <Image
      source={require('@/assets/images/veggies.png')}
      className="h-90 w-full"
      resizeMode="contain"
    />
  );
}