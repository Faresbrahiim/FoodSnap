import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { User } from "@/lib/mockUser";

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-xl font-bold text-foreground">{value}</Text>
      <Text className="text-xs text-muted-foreground">{label}</Text>
    </View>
  );
}

export default function ProfileHeader({
  user,
  onSettings,
}: {
  user: User;
  onSettings?: () => void;
}) {
  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View className="px-5 pt-14 mt-15">
      <View className="flex-row items-center gap-4">
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} className="h-20 w-20 rounded-full" />
        ) : (
          <View className="h-20 w-20 items-center justify-center rounded-full bg-primary">
            <Text className="text-2xl font-bold text-primary-foreground">{initials}</Text>
          </View>
        )}

        <View className="flex-1">
          <Text className="text-xl font-bold text-foreground" numberOfLines={1}>
            {user.name}
          </Text>
          <Text className="text-sm text-muted-foreground" numberOfLines={1}>
            {user.username}
          </Text>
        </View>

        <Pressable onPress={onSettings} hitSlop={10}>
          <Ionicons name="settings-outline" size={22} color="#3A2A20" />
        </Pressable>
      </View>

      <View className="mt-6 flex-row">
        <Stat value={user.recipesCount} label="Recettes" />
        <Stat value={user.favoritesCount} label="Favoris" />
        <Stat value={user.followersCount} label="Abonnements" />
      </View>
    </View>
  );
}