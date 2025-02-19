import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Dimensions, PixelRatio } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NeumorphicView } from './NeumorphicComponents';
import { CustomTheme } from '../theme/theme';

interface AvatarProps {
  size?: number;
  imageUrl?: string;
  onPress?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  size,
  imageUrl,
  onPress,
}) => {
  const theme = useTheme() as CustomTheme;
  const { width, height } = Dimensions.get('window');

  // Calculate responsive size based on screen width
  const responsiveSize = size ? PixelRatio.roundToNearestPixel(size) : PixelRatio.roundToNearestPixel(width * 0.1);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <NeumorphicView
        style={[
          styles.container,
          {
            width: responsiveSize,
            height: responsiveSize,
            borderRadius: responsiveSize / 2,
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
            width: responsiveSize - 16,
            height: responsiveSize - 16,
            borderRadius: (responsiveSize - 16) / 2,
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