import { useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

import { IconButton } from '@/components/ui/IconButton';
import { ModeToggle, ScanMode } from '@/components/ui/ModeToggle';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScanFrame } from '@/components/ui/ScanFrame';
import { ScannerHeader } from '@/components/ui/ScannerHeader';
import { ShutterButton } from '@/components/ui/ShutterButton';

export default function ScanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const [mode, setMode] = useState<ScanMode>('camera');

  const goToResults = (uri: string) => {
    router.push({ pathname: '/ingredients', params: { uri } });
  };

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.7 });
    if (photo) goToResults(photo.uri);
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    setMode('camera');
    if (!result.canceled) goToResults(result.assets[0].uri);
  };

  const handleModeChange = (next: ScanMode) => {
    setMode(next);
    if (next === 'gallery') pickFromGallery();
  };

  // Permission still loading
  if (!permission) return <View className="flex-1 bg-black" />;

  // Permission not granted yet
  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background px-8">
        <Text className="mb-6 text-center text-lg text-foreground">
          FoodSnap a besoin de la caméra pour scanner vos ingrédients.
        </Text>
        <PrimaryButton label="Autoriser la caméra" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        ref={cameraRef}
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        facing="back"
        enableTorch={torch}
      />
      {/* Dark overlay so white text stays readable */}
      <View pointerEvents="none" className="absolute inset-0 bg-black/30" />

      {/* Scan frame: centered on the whole screen */}
      <View
        pointerEvents="none"
        className="absolute inset-0 items-center justify-center px-6"
      >
        <ScanFrame />
      </View>

      {/* Header: top only */}
      <SafeAreaView edges={['top']} className="px-6">
        <ScannerHeader onClose={() => router.back()} />
      </SafeAreaView>

      {/* Bottom: pinned to the bottom edge */}
      <View
        className="absolute bottom-0 left-0 right-0 items-center gap-6 px-6"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="w-full flex-row items-center justify-between">
          <IconButton
            name={torch ? 'flash' : 'flash-outline'}
            active={torch}
            onPress={() => setTorch((t) => !t)}
          />
          <ShutterButton onPress={takePhoto} />
          <IconButton name="image-outline" onPress={pickFromGallery} />
        </View>
        <ModeToggle value={mode} onChange={handleModeChange} />
      </View>
    </View>
  );
}