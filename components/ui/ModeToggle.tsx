import { Pressable, Text, View } from 'react-native';

export type ScanMode = 'camera' | 'gallery';

type Props = {
  value: ScanMode;
  onChange: (mode: ScanMode) => void;
};

const OPTIONS: { key: ScanMode; label: string }[] = [
  { key: 'camera', label: 'Caméra' },
  { key: 'gallery', label: 'Galerie' },
];

export function ModeToggle({ value, onChange }: Props) {
  return (
    <View className="w-full flex-row rounded-full bg-white/25 p-1">
      {OPTIONS.map(({ key, label }) => {
        const active = value === key;
        return (
          <Pressable
            key={key}
            onPress={() => onChange(key)}
            className={`flex-1 items-center rounded-full py-3 ${active ? 'bg-white' : ''}`}
          >
            <Text
              className={`text-base font-semibold ${active ? 'text-primary' : 'text-white'}`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}