import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  name: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  active?: boolean;
};

export function IconButton({ name, onPress, active = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="h-12 w-12 items-center justify-center rounded-full active:opacity-60"
    >
      <Ionicons name={name} size={26} color={active ? '#F5C242' : '#FFFFFF'} />
    </Pressable>
  );
}