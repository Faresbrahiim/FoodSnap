import { Pressable, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
};

export function PrimaryButton({ label, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full items-center rounded-full bg-primary py-4 active:opacity-80 "
    >
      <Text className="text-base font-semibold text-primary-foreground">
        {label}
      </Text>
    </Pressable>
  );
}