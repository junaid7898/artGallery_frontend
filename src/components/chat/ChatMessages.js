import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import Message from './Message';
import auth from '@react-native-firebase/auth';
import {layout} from '../../global/styles/layout';

const ChatMessages = ({messagesList}) => {
  const currentUser = auth().currentUser;
  const scrollView = useRef();
  return (
    <ScrollView
      style={[layout.innerBox, {marginTop: 10}]}
      ref={ref => (scrollView.current = ref)}
      onContentSizeChange={() => {
        scrollView.current.scrollToEnd({animated: true});
      }}>
      {messagesList &&
        messagesList.map(item => {
          return (
            <Message
              message={item}
              key={item.id}
              currentUser={currentUser.uid}
            />
          );
        })}
    </ScrollView>
  );
};

export default ChatMessages;

const styles = StyleSheet.create({});
