import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

interface ScanBannerProps {
  onPress: () => void;
}

export default function ScanBanner({ onPress }: ScanBannerProps) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#E86A24',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 22,
        shadowColor: '#E86A24',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
      }}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Ionicons name="camera-outline" size={22} color="#FFFFFF" />
        <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '600' }}>
          Scanner mes ingrédients
        </Text>
      </View>
      <Feather name="arrow-right" size={20} color="#FFFFFF" />
    </TouchableOpacity>
  );
}