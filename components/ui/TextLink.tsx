import { Pressable, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
};

export function TextLink({ label, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="py-2 active:opacity-60">
      <Text className="text-sm font-medium text-foreground underline">
        {label}
      </Text>
    </Pressable>
  );
}