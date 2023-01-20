import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {theme} from '../../theme/appTheme';

const LoadingIndicator = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
  },
});
