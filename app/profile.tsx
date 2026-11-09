import { ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import BottomNav from "@/components/ui/BottomNav";
import MenuRow from "@/components/ui/MenuRow";
import ProfileHeader from "@/components/ui/ProfileHeader";
import { mockUser } from "@/lib/mockUser";

export default function ProfileScreen() {
  const router = useRouter();
  const user = mockUser; // TODO: replace with the real user once login is ready

  return (
    <View className="flex-1 bg-background">
      <ScrollView contentContainerClassName="pb-6">
        <ProfileHeader user={user} onSettings={() => router.push("/settings" as any)} />

        <View className="mx-5 mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <MenuRow
            label="Mes recettes"
            icon="book-outline"
            iconColor="#D99A0B"
            tileClassName="bg-sun/20"
            onPress={() => router.push("/my-recipes" as any)}
          />
          <MenuRow
            label="Mes favoris"
            icon="heart-outline"
            iconColor="#F2622B"
            tileClassName="bg-primary/15"
            onPress={() => router.push("/favorites" as any)}
          />
          <MenuRow
            label="Ma liste de courses"
            icon="list-outline"
            iconColor="#2F7D3A"
            tileClassName="bg-leaf/15"
            onPress={() => router.push("/shopping-list" as any)}
          />
          <MenuRow
            label="Paramètres"
            icon="options-outline"
            iconColor="#8C7B70"
            tileClassName="bg-muted"
            onPress={() => router.push("/settings" as any)}
          />
          <MenuRow
            label="Aide & Support"
            icon="help-circle-outline"
            iconColor="#2F7D3A"
            tileClassName="bg-leaf/15"
            onPress={() => router.push("/help" as any)}
          />
          <MenuRow
            label="Déconnexion"
            icon="log-out-outline"
            iconColor="#D9382B"
            tileClassName="bg-destructive/15"
            showChevron={false}
            destructive
            isLast
            onPress={() => router.replace("/login" as any)}
          />
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}