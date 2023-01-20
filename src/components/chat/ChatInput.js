import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../theme/appTheme';

const ChatInput = ({handleSendChat}) => {
  const [message, setMessage] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputView}>
          <TextInput
            multiline
            placeholder="type something..."
            placeholderTextColor={theme.colors.text}
            style={styles.input}
            onChangeText={text => setMessage(text)}
            value={message}
          />
        </View>
        <TouchableOpacity
          style={styles.sendIcon}
          onPress={() => handleSendChat(message)}>
          <Ionicon name="send" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  innerContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    position: 'relative',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DEDEDE',
    paddingHorizontal: 10,
    borderRadius: 25,
    flex: 1,
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
  },
  sendIcon: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 50,
  },
});
