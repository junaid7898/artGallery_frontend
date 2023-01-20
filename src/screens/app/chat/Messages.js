import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatHeader from '../../../components/chat/ChatHeader';
import ChatMessages from '../../../components/chat/ChatMessages';
import ChatInput from '../../../components/chat/ChatInput';
import {layout} from '../../../global/styles/layout';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';

const Messages = ({route, navigation}) => {
  const currentUser = auth().currentUser;
  const {senderId, receiverId, receiverName, receiverPic} = route.params;

  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    const combineId =
      currentUser.uid > receiverId
        ? `${currentUser.uid}${receiverId}`
        : `${receiverId}${currentUser.uid}`;
    const sub = firestore()
      .collection('chats')
      .doc(combineId)
      .onSnapshot(snap => {
        if (snap.exists) {
          setMessagesList(snap.data().messages);
        }
      });
    return () => sub();
  }, []);

  const handleSendChat = message => {
    console.log('message:', message);
    const combineId =
      currentUser.uid > receiverId
        ? `${currentUser.uid}${receiverId}`
        : `${receiverId}${currentUser.uid}`;

    firestore()
      .collection('chats')
      .doc(combineId)
      .get()
      .then(res => {
        if (!res.exists) {
          //* create chat in collection
          firestore()
            .collection('chats')
            .doc(combineId)
            .set({
              messages: [
                {
                  id: uuid.v4(),
                  text: message,
                  senderId: senderId,
                },
              ],
            })
            .then(() => {
              //*create userChats
              return firestore()
                .collection('userChats')
                .doc(senderId)
                .update({
                  [combineId + '.userInfo']: {
                    uid: receiverId,
                    displayName: receiverName,
                    photoUrl: receiverPic,
                  },
                  [combineId + '.latestMessage']: {
                    message,
                  },
                });
            })
            .then(() => {
              return firestore()
                .collection('userChats')
                .doc(receiverId)
                .update({
                  [combineId + '.userInfo']: {
                    uid: senderId,
                    displayName: currentUser.displayName,
                    photoUrl: currentUser.photoURL,
                  },
                  [combineId + '.latestMessage']: {
                    message,
                  },
                });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          firestore()
            .collection('chats')
            .doc(combineId)
            .update({
              messages: firestore.FieldValue.arrayUnion({
                id: uuid.v4(),
                text: message,
                senderId: senderId,
              }),
            })
            .then(() => {
              return firestore()
                .collection('userChats')
                .doc(senderId)
                .update({
                  [combineId + '.latestMessage']: {
                    message,
                  },
                });
            })
            .then(() => {
              return firestore()
                .collection('userChats')
                .doc(receiverId)
                .update({
                  [combineId + '.latestMessage']: {
                    message,
                  },
                });
            });
        }
      });
  };
  return (
    <View style={[layout.screenBox, {flex: 1}]}>
      <ChatHeader
        receiverPic={receiverPic}
        receiverName={receiverName}
        goBack={() => navigation.goBack()}
      />
      <ChatMessages messagesList={messagesList} />
      <ChatInput handleSendChat={handleSendChat} />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({});
