import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import BottomNav from '@/components/ui/BottomNav';
import HomeHeader from '@/components/home/HomeHeader';
import SearchBar from '@/components/home/SearchBar';
import ScanBanner from '@/components/home/ScanBanner';
import QuickActionsGrid, { QuickActionItem } from '@/components/home/QuickActionsGrid';
import PopularRecipes, { RecipeSummary } from '@/components/home/PopularRecipes';

const QUICK_ACTIONS: QuickActionItem[] = [
  { id: 'recipes', label: 'Mes recettes', icon: 'restaurant-outline', bg: '#FDE68A', color: '#D97706', route: '/recipes' },
  { id: 'favorites', label: 'Mes favoris', icon: 'heart', bg: '#FECACA', color: '#DC2626', route: '/favorites' },
  { id: 'list', label: 'Ma liste', icon: 'receipt-outline', bg: '#BBF7D0', color: '#16A34A', route: '/shopping-list' },
  { id: 'community', label: 'Communauté', icon: 'people-outline', bg: '#FEF08A', color: '#CA8A04', route: '/community' },
];

const POPULAR_RECIPES: RecipeSummary[] = [
  {
    id: '1',
    title: 'Pâtes à la tomate',
    time: '20 min',
    difficulty: 'Facile',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80',
  },
  {
    id: '2',
    title: 'Salade bowl',
    time: '15 min',
    difficulty: 'Facile',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = POPULAR_RECIPES.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF8F5' }} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 110,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          location="Oujda, Maroc"
          avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
          onPressNotifications={() => router.push('/notifications' as any)}
          onPressProfile={() => router.push('/profile')}
        />

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 4 }}>
            Bonjour, Fatima zahrae !
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>
            Qu'est-ce qu'on cuisine aujourd'hui ?
          </Text>
        </View>

        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        <ScanBanner onPress={() => router.push('/camera' as any)} />

        <QuickActionsGrid
          actions={QUICK_ACTIONS}
          onSelectAction={(route) => router.push(route as any)}
        />

        <PopularRecipes
          recipes={filteredRecipes}
          onPressSeeAll={() => router.push('/recipes' as any)}
          onPressRecipe={(id) => router.push(`/recipe/${id}` as any)}
        />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}