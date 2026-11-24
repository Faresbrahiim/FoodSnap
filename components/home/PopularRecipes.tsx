import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface RecipeSummary {
  id: string;
  title: string;
  time: string;
  difficulty: string;
  image: string;
}

interface PopularRecipesProps {
  recipes: RecipeSummary[];
  onPressSeeAll: () => void;
  onPressRecipe: (id: string) => void;
}

export default function PopularRecipes({
  recipes,
  onPressSeeAll,
  onPressRecipe,
}: PopularRecipesProps) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>
          Recettes populaires
        </Text>
        <TouchableOpacity onPress={onPressSeeAll}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#E86A24' }}>
            Voir tout &gt;
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 14, paddingRight: 10 }}
      >
        {recipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={{
              width: 170,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: '#F3F4F6',
            }}
            activeOpacity={0.9}
            onPress={() => onPressRecipe(recipe.id)}
          >
            <Image
              source={{ uri: recipe.image }}
              style={{ width: '100%', height: 115 }}
              resizeMode="cover"
            />
            <View style={{ padding: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#1F2937',
                  marginBottom: 4,
                }}
                numberOfLines={1}
              >
                {recipe.title}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="time-outline" size={13} color="#6B7280" />
                <Text style={{ fontSize: 11, color: '#6B7280' }}>
                  {recipe.time} • {recipe.difficulty}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}