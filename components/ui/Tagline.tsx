import { Text } from 'react-native';

export function Tagline({ children }: { children: string }) {
  return (
    <Text className="mt-4 text-center text-lg leading-6 text-foreground">
      {children}
    </Text>
  );
}