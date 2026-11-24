import { Text, View } from 'react-native';
import { IconButton } from './IconButton';

export function ScannerHeader({ onClose }: { onClose: () => void }) {
  return (
    <View>
      <View className="-ml-3 flex-row">
        <IconButton name="close" onPress={onClose} />
      </View>
      <View className="items-center px-4">
        <Text className="text-2xl font-bold text-white">
          Scanner mes ingrédients
        </Text>
        <Text className="mt-2 text-center text-sm leading-5 text-white/80">
          {'Prenez une photo de vos ingrédients\net laissez FoodSnap faire le reste !'}
        </Text>
      </View>
    </View>
  );
}