import { Image, View, StyleSheet } from 'react-native';

export function AuthHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.crop}>
        <Image
          source={require('../../assets/images/foodsnap-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  crop: {
    width: '82%',
    maxWidth: 263.93,
    aspectRatio: 1.9773,
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  logo: {
    position: 'absolute',
    width: '113.66%',
    aspectRatio: 2,
    left: '-6.91%',
    top: '-70.41%',
  },
});