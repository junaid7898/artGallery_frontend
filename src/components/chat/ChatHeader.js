import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../../theme/appTheme';

const ChatHeader = ({receiverPic, receiverName, goBack}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="arrow-back" size={30} color="#ffffff" onPress={goBack} />
      <View style={styles.profileOptions}>
        <Image source={{uri: receiverPic}} style={styles.picture} />
        <Text style={styles.txt}>{receiverName}</Text>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  profileOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  picture: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  txt: {
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize',
    color: '#ffffff',
  },
});
