import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HomeHeaderProps {
  location: string;
  avatarUrl: string;
  hasUnreadNotifications?: boolean;
  onPressNotifications: () => void;
  onPressProfile: () => void;
}

export default function HomeHeader({
  location,
  avatarUrl,
  hasUnreadNotifications = true,
  onPressNotifications,
  onPressProfile,
}: HomeHeaderProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Ionicons name="location-sharp" size={18} color="#E86A24" />
        <View>
          <Text style={{ fontSize: 11, color: '#9CA3AF' }}>Ma position</Text>
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#1F2937' }}>
            {location}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity style={{ padding: 4 }} onPress={onPressNotifications}>
          <Ionicons name="notifications-outline" size={22} color="#1F2937" />
          {hasUnreadNotifications && (
            <View
              style={{
                position: 'absolute',
                top: 4,
                right: 5,
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: '#E86A24',
              }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressProfile}>
          <Image
            source={{ uri: avatarUrl }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              borderWidth: 1.5,
              borderColor: '#E86A24',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}