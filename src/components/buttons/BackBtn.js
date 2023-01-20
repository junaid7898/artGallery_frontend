import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../../theme/appTheme';

const BackBtn = ({goBack}) => {
  return (
    <TouchableOpacity onPress={goBack}>
      <Ionicons name="arrow-back" size={35} color={theme.colors.onSurface} />
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({});
