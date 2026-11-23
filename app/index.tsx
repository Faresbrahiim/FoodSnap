import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Decorations } from '@/components/ui/Decorations';
import { Logo } from '@/components/ui/Logo';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Tagline } from '@/components/ui/Tagline';
import { TextLink } from '@/components/ui/TextLink';
import { HeroIllustration } from '@/components/ui/HeroIllustration';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <Decorations />

      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View className="items-center">
            <Logo />
            <Tagline>{'De tes ingrédients \n à ton prochain plat'}</Tagline>
          </View>

          <HeroIllustration />

          <View className="items-center gap-3 pb-6">
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

            {/* TEMP: test link, delete later */}
            <Pressable className="py-2" onPress={() => router.push('/profile')}>
              <Text className="text-xs text-muted-foreground underline">
                [dev] Profil
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


//   import { Redirect } from 'expo-router';

// export default function Index() {
//   return <Redirect href="/login" />;
// }