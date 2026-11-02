import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Decorations } from '@/components/ui/Decorations';
import { Logo } from '@/components/ui/Logo';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Tagline } from '@/components/ui/Tagline';
import { TextLink } from '@/components/ui/TextLink';
import { HeroIllustration } from '@/components/ui/HeroIllustration';

// ps safearea view is used to avoid the notch and other screen cutouts on modern devices. It ensures that the content is displayed within the safe area of the screen, preventing it from being obscured by hardware features like notches or rounded corners.
export default function SplashScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <Decorations />

      <SafeAreaView className="flex-1 ">
        <View className="items-center">
          <Logo />
          <Tagline>{'De tes ingrédients \n à ton prochain plat'}</Tagline>
        </View>

       <HeroIllustration />

       <View className="items-center gap-3 ">
          <View className="w-4/5">
            <PrimaryButton
            label="Commencer"
            onPress={() => router.push('/home')}
            />
         </View>

          <TextLink
          label="Se connecter"
          onPress={() => router.push('/login')}
          />
       </View >
      </SafeAreaView>
    </View>
  );
}