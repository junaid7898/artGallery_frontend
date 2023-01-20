import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {layout} from '../../global/styles/layout';
import {theme} from '../../theme/appTheme';

const Message = ({message, currentUser}) => {
  return (
    <View>
      <View
        style={[
          styles.messageLeft,
          currentUser === message.senderId && styles.messageRight,
        ]}>
        <Text
          style={[
            styles.messageTxt,
            currentUser === message.senderId && styles.messageRightTxt,
          ]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageLeft: {
    backgroundColor: theme.colors.secondary,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  messageRight: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-end',
  },
  messageTxt: {
    color: theme.colors.onSecondary,
  },
  messageRightTxt: {
    color: '#ffffff',
  },
});
