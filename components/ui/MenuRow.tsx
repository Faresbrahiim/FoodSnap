import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  tileClassName: string; // background of the small icon square
  onPress?: () => void;
  showChevron?: boolean;
  destructive?: boolean;
  isLast?: boolean;
};

export default function MenuRow({
  label,
  icon,
  iconColor,
  tileClassName,
  onPress,
  showChevron = true,
  destructive = false,
  isLast = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-3 px-4 py-3.5 active:bg-muted ${
        isLast ? "" : "border-b border-border"
      }`}
    >
      <View className={`h-8 w-8 items-center justify-center rounded-lg ${tileClassName}`}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text
        className={`flex-1 text-[15px] ${
          destructive ? "text-destructive" : "text-foreground"
        }`}
      >
        {label}
      </Text>
      {showChevron && <Ionicons name="chevron-forward" size={18} color="#8C7B70" />}
    </Pressable>
  );
}