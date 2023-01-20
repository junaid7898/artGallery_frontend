import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import TestImg from '../../assets/images/testImg.png';
import {theme} from '../../theme/appTheme';
import {Button} from 'react-native-paper';
import {getImageFromCamera, getImageFromLibrary} from '../../utils/pickImage';

const Profile = ({updateProfile}) => {
  const currentUser = auth().currentUser;
  console.log(currentUser);
  const [picture, setPicture] = useState(null);
  const [selectedPicture, setSelectedPicture] = useState(null);

  const handlePicker = async type => {
    let result;
    if (type === 'camera') {
      result = await getImageFromCamera();
    } else if (type === 'gallery') {
      result = await getImageFromLibrary();
    }

    if (result.assets) {
      setPicture(result.assets[0].uri);
      setSelectedPicture(result.assets[0]);
    }
  };

  return (
    <View style={styles.editView}>
      {currentUser.photoURL ? (
        <Image style={styles.img} source={{uri: currentUser.photoURL}} />
      ) : (
        <Image style={styles.img} source={picture ? {uri: picture} : TestImg} />
      )}

      <Text style={styles.introTxt}>
        {currentUser.photoURL ? 'change image' : 'take image'}
      </Text>
      <View style={styles.pickActionsView}>
        <Button
          mode="contained"
          onPress={() => handlePicker('gallery')}
          style={styles.pickAction}
          theme={{roundness: 10, colors: {primary: theme.colors.secondary}}}>
          From Gallery
        </Button>
        <Button
          mode="contained"
          onPress={() => handlePicker('camera')}
          style={styles.pickAction}
          theme={{roundness: 10, colors: {primary: theme.colors.secondary}}}>
          From Camera
        </Button>
      </View>
      {selectedPicture && (
        <Button
          mode="contained"
          style={styles.submitBtn}
          onPress={() => updateProfile(selectedPicture)}>
          Upload
        </Button>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  editView: {
    width: '100%',
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  introTxt: {
    color: theme.colors.error,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  pickActionsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  submitBtn: {
    marginHorizontal: 40,
    marginTop: 15,
  },
  //   pickAction: {marginBottom: 5},
});
