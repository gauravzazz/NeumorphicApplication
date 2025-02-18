import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NeumorphicView } from './NeumorphicComponents';
import { CustomTheme } from '../theme/theme';

interface AvatarProps {
  size?: number;
  imageUrl?: string;
  onPress?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 40,
  imageUrl,
  onPress,
}) => {
  const theme = useTheme() as CustomTheme;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <NeumorphicView
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.primary,
          },
        ]}
      >
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : require('../../assets/default-avatar.jpeg')
          }
          style={{
            width: size - 16,
            height: size - 16,
            borderRadius: (size - 16) / 2,
          }}
        />
      </NeumorphicView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});