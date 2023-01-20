import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {layout} from '../../global/styles/layout';
import {theme} from '../../theme/appTheme';
import TestImg from '../../assets/images/testImg.png';

const Chat = ({navigation}) => {
  const currentUser = auth().currentUser;
  const [chats, setChats] = useState(null);

  useEffect(() => {
    const sub = firestore()
      .collection('userChats')
      .doc(currentUser.uid)
      .onSnapshot(res => {
        console.log('here', res.data());
        setChats(res.data());
      });

    return () => sub();
  }, []);

  return (
    <ScrollView style={[layout.screenBox]}>
      <View style={[layout.innerBox]}>
        <Text
          style={{
            color: theme.colors.onSurface,
            fontSize: 35,
            fontWeight: '400',
            marginBottom: 10,
          }}>
          Chats
        </Text>
        {chats &&
          Object.entries(chats).length > 0 &&
          Object.entries(chats)?.map(item => {
            return (
              <TouchableOpacity
                key={item[0]}
                style={styles.chatView}
                onPress={() => {
                  console.log('herr....');
                  navigation.navigate('messaging', {
                    senderId: currentUser.uid,
                    receiverId: item[1].userInfo.uid && item[1].userInfo.uid,
                    receiverName:
                      item[1].userInfo.displayName &&
                      item[1].userInfo.displayName,
                    receiverPic: item[1].userInfo.photoUrl,
                  });
                }}>
                <Image
                  source={{
                    uri: item[1].userInfo.photoUrl && item[1].userInfo.photoUrl,
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 70,
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: theme.colors.primary,
                    resizeMode: 'cover',
                  }}
                />
                <View>
                  <Text
                    style={{
                      color: theme.colors.onSurface,
                      fontSize: 20,
                      fontWeight: '500',
                    }}>
                    {item[1].userInfo.displayName &&
                      item[1].userInfo.displayName}
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.backdrop,
                      fontSize: 17,
                      fontWeight: '300',
                    }}>
                    {item[1].latestMessage.message &&
                      item[1].latestMessage.message}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chatView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderBottomColor: theme.colors.disabled,
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingBottom: 10,
  },
});
