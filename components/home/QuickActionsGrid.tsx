import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface QuickActionItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
  color: string;
  route: string;
}

interface QuickActionsGridProps {
  actions: readonly QuickActionItem[];
  onSelectAction: (route: string) => void;
}

export default function QuickActionsGrid({
  actions,
  onSelectAction,
}: QuickActionsGridProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
      }}
    >
      {actions.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={{ alignItems: 'center', width: '23%' }}
          onPress={() => onSelectAction(item.route)}
        >
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: item.bg,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 6,
            }}
          >
            <Ionicons name={item.icon} size={22} color={item.color} />
          </View>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '500',
              color: '#374151',
              textAlign: 'center',
            }}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}