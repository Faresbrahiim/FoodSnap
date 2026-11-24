import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Rechercher une recette...',
}: SearchBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2EFE9',
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 46,
        marginBottom: 16,
      }}
    >
      <Feather name="search" size={18} color="#9CA3AF" />
      <TextInput
        style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#1F2937' }}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Ionicons name="close-circle" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  );
}