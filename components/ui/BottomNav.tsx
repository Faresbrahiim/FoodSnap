import { Pressable, Text, View } from "react-native";
import { usePathname, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Tab = {
  label: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
};

const TABS: Tab[] = [
  { label: "Accueil", route: "/home", icon: "home-outline", iconActive: "home" },
  { label: "Caméra", route: "/scan", icon: "camera-outline", iconActive: "camera" },
  { label: "Favoris", route: "/favorites", icon: "heart-outline", iconActive: "heart" },
  { label: "Messages", route: "/messages", icon: "chatbubble-outline", iconActive: "chatbubble" },
  { label: "Profil", route: "/profile", icon: "person-outline", iconActive: "person" },
];

const ACTIVE = "#F2622B"; // primary
const INACTIVE = "#8C7B70"; // muted

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View className="flex-row border-t border-border bg-card px-2 pb-6 pt-2">
      {TABS.map((tab) => {
        const active = pathname === tab.route;
        return (
          <Pressable
            key={tab.route}
            onPress={() => !active && router.replace(tab.route as any)}
            className="flex-1 items-center gap-1 py-1"
          >
            <Ionicons
              name={active ? tab.iconActive : tab.icon}
              size={22}
              color={active ? ACTIVE : INACTIVE}
            />
            <Text
              className={
                active
                  ? "text-[11px] font-semibold text-primary"
                  : "text-[11px] text-muted-foreground"
              }
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}