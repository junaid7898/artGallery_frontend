import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {layout} from '../../global/styles/layout';
import {vh} from '../../utils/responsiveDimensions';
import auth from '@react-native-firebase/auth';
import TestImg from '../../assets/images/testImg.png';
import {Button} from 'react-native-paper';
import {theme} from '../../theme/appTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalView from '../../components/modalView/ModalView';
import Profile from '../../components/edit/Profile';

import storage from '@react-native-firebase/storage';
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator';

const Option = ({iconName, title, info, navigatetTo}) => {
  return (
    <TouchableOpacity style={styles.option} onPress={navigatetTo}>
      <Ionicons name={iconName} size={24} color={theme.colors.backdrop} />
      <View style={styles.desc}>
        <Text style={styles.titleTxt}>{title}</Text>
        <Text style={styles.infoTxt}>{info}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={30}
        color={theme.colors.backdrop}
      />
    </TouchableOpacity>
  );
};

const User = ({navigation, route}) => {
  const currentUser = auth().currentUser;
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params && route.params.showEditProfile) {
      setShowEditModal(true);
    }
  }, [route.params]);

  const handleUploadProfilePicture = async picture => {
    setShowEditModal(false);
    setLoading(true);
    console.log(picture);
    const storageRef = storage().ref(
      `${currentUser.uid}/profilePicture/${picture.fileName}`,
    );
    const url = await storageRef.putFile(picture.uri);
    if (url) {
      const imageUrl = await storageRef.getDownloadURL();
      console.log(imageUrl);
      const update = {
        photoURL: imageUrl,
      };

      auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setLoading(false);
          Alert.alert('Alert', 'Profile Picture updated!!!', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        })
        .catch(_ => {
          setLoading(false);
          Alert.alert('Error', 'Cannot update profile picture!!!', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        });
    } else {
      setLoading(false);
    }
  };
  return (
    <View style={[layout.screenBox]}>
      {showEditModal && (
        <ModalView
          hideModal={() => setShowEditModal(false)}
          visible={showEditModal}
          showCloseIcon
          key="editModal">
          <Profile updateProfile={handleUploadProfilePicture} />
        </ModalView>
      )}
      {loading && <LoadingIndicator />}
      <View style={[layout.innerBox, styles.innerBox]}>
        <View style={styles.intro}>
          {currentUser.photoURL ? (
            <Image source={{uri: currentUser.photoURL}} style={styles.photo} />
          ) : (
            <Image source={TestImg} style={styles.photo} />
          )}
          <View>
            <Text style={styles.nameTxt}>{currentUser.displayName}</Text>
            <Text style={styles.emailTxt}>{currentUser.email}</Text>
            <Button
              style={styles.btn}
              mode="contained"
              onPress={() => setShowEditModal(true)}>
              Edit
            </Button>
          </View>
        </View>

        <View style={styles.optionView}>
          {/* <Option
            iconName="card"
            title="Payment Method"
            info="Provide us with your card details"
          />
          <Option
            iconName="location"
            title="Delivery Address"
            info="Add or change delivery address"
          /> */}
          <Option
            iconName="help-circle"
            title="Help"
            info="Get help from frequently asked questions"
          />
          <Option
            iconName="book"
            title="Terms and Conditions"
            info="Get more informations from terms and conditions"
          />
          <Option
            iconName="log-out"
            title="Logout"
            info="Logout from the art gallery"
            navigatetTo={() => auth().signOut()}
          />
        </View>

        {/* <Button
          mode="contained"
          style={{
            paddingVertical: 5,
            alignSelf: 'center',
            paddingHorizontal: 50,
          }}
          theme={authButtonTheme}>
          Logout
        </Button> */}
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  innerBox: {
    flex: 1,
    maxHeight: vh(80),
    marginTop: vh(3),
    // backgroundColor: 'red',
    justifyContent: 'space-around',
  },
  intro: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  nameTxt: {
    fontSize: 17,
    fontWeight: '500',
    color: theme.colors.onSurface,
    textTransform: 'capitalize',
  },
  emailTxt: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.backdrop,
  },
  btn: {
    marginTop: 5,
  },
  optionView: {
    // backgroundColor: 'red',
    flex: 0.8,
    justifyContent: 'flex-start',
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  desc: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.backdrop,
  },
  titleTxt: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 10,
    color: theme.colors.onSurface,
  },
  infoTxt: {
    color: theme.colors.backdrop,
  },
});
