import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {layout} from '../../../global/styles/layout';
import LoadingIndicator from '../../../components/loadingIndicator/LoadingIndicator';
import {theme} from '../../../theme/appTheme';
import RatingComponent from '../../../components/rating/RatingComponent';
import ReviewList from '../../../components/reviews/ReviewList';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import TestImg from '../../../assets/images/testImg.png';
import Payment from '../../../components/payment/Payment';
import ModalView from '../../../components/modalView/ModalView';
import AddressForm from '../../../components/address/AddressForm';

const ArtDetatils = ({navigation, route}) => {
  const {artId} = route.params;
  const [art, setArt] = useState({});
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState(1);
  const currentUser = auth().currentUser;

  const [showAddressModal, setShowAddressModal] = useState(false);

  const navigateToHomeScreen = () => {
    navigation.navigate('app', {screen: 'home'});
  };

  useEffect(() => {
    if (artId) {
      firestore()
        .collection(`Art`)
        .doc(`${artId}`)
        .get()
        .then(res => {
          let newData = res.data();
          setArt(newData);
          setLoading(false);
        });
    }
  }, [artId]);
  return (
    <View style={layout.screenBox}>
      <ModalView
        hideModal={() => setShowAddressModal(false)}
        visible={showAddressModal}
        showCloseIcon>
        <AddressForm
          art={art && art}
          setLoading={setLoading}
          hideModal={() => setShowAddressModal(false)}
          navigateToHomeScreen={navigateToHomeScreen}
        />
      </ModalView>
      {loading && <LoadingIndicator />}
      {art && (
        <View style={[styles.innerBox, {flex: 1}]}>
          <View style={styles.imgView}>
            <Image source={{uri: art.image}} style={styles.img} />
          </View>

          <View style={[layout.innerBox, {flexGrow: 1}]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: theme.colors.onSurface,
                  fontSize: 18,
                  fontWeight: '400',
                }}>
                {art.title}
              </Text>
              <Text
                style={{color: theme.colors.backdrop, marginHorizontal: 10}}>
                By
              </Text>
              <Text
                style={{
                  color: theme.colors.onSurface,
                  fontSize: 18,
                  fontWeight: '400',
                }}>
                {art.userName}
              </Text>
            </View>
            <View style={styles.optionView}>
              <TouchableOpacity
                style={[
                  styles.optionBox,
                  option === 1 && styles.optionBoxActive,
                ]}
                onPress={() => setOption(1)}>
                <Text
                  style={[
                    styles.optionTxt,
                    option === 1 && styles.optionTxtActive,
                  ]}>
                  Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionBox,
                  option === 2 && styles.optionBoxActive,
                ]}
                onPress={() => setOption(2)}>
                <Text
                  style={[
                    styles.optionTxt,
                    option === 2 && styles.optionTxtActive,
                  ]}>
                  Reviews
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionBox,
                  option === 3 && styles.optionBoxActive,
                ]}
                onPress={() => setOption(3)}>
                <Text
                  style={[
                    styles.optionTxt,
                    option === 3 && styles.optionTxtActive,
                  ]}>
                  Write a Review
                </Text>
              </TouchableOpacity>
            </View>

            {option === 1 && (
              <View style={styles.detailBox}>
                <View style={[styles.intro]}>
                  <Text style={styles.title}>Description</Text>
                  <Text style={styles.desc}>{art.description}</Text>
                </View>

                <View style={styles.categories}>
                  <View style={[styles.intro, {width: 100}]}>
                    <Text style={styles.title}>Category</Text>
                    <Text style={[styles.desc, {textTransform: 'capitalize'}]}>
                      {art.category}
                    </Text>
                  </View>
                  <View style={[styles.intro, {width: 100}]}>
                    <Text style={styles.title}>Medium</Text>
                    <Text style={[styles.desc, {textTransform: 'capitalize'}]}>
                      {art.medium}
                    </Text>
                  </View>
                  <View style={[styles.intro, {width: 100}]}>
                    <Text style={styles.title}>Subject</Text>
                    <Text style={[styles.desc, {textTransform: 'capitalize'}]}>
                      {art.subject}
                    </Text>
                  </View>
                  <View style={[styles.intro, {width: 100}]}>
                    <Text style={styles.title}>Color</Text>
                    <Text style={[styles.desc, {textTransform: 'capitalize'}]}>
                      {art.color}
                    </Text>
                  </View>
                  <View style={[styles.intro, {width: 100}]}>
                    <Text style={styles.title}>Size</Text>
                    <Text
                      style={[
                        styles.desc,
                        {
                          textTransform: 'capitalize',
                        },
                      ]}>
                      {`${art.size && art.size.width} X ${
                        art.size && art.size.height
                      }`}
                    </Text>
                  </View>
                </View>

                <View style={styles.categories}>
                  <View style={[styles.intro, {width: 100}]}>
                    <Text style={styles.title}>Price</Text>
                    <Text
                      style={[
                        styles.desc,
                        {
                          textTransform: 'capitalize',
                          color: theme.colors.secondary,
                          fontSize: 17,
                        },
                      ]}>
                      {`$${art.price}`}
                    </Text>
                  </View>
                </View>

                {art.status === 'sold' ? (
                  <View style={styles.sold}>
                    <Text style={styles.soldTxt}>Sold</Text>
                  </View>
                ) : (
                  art.userId !== currentUser.uid && (
                    <Button
                      mode="contained"
                      style={{marginBottom: 10}}
                      onPress={() => setShowAddressModal(true)}>
                      Order Now
                    </Button>
                  )
                )}
                {art.userId !== currentUser.uid && (
                  <Button
                    onPress={() => {
                      navigation.navigate('messaging', {
                        senderId: currentUser.uid,
                        receiverId: art.userId,
                        receiverName: art.userName,
                        receiverPic: art.profilePic,
                      });
                    }}
                    mode="text">
                    Chat with the artist
                  </Button>
                )}
              </View>
            )}

            {option === 3 && (
              <RatingComponent artId={art.artId} setLoading={setLoading} />
            )}

            {option === 2 && (
              <ReviewList artId={art.artId} setLoading={setLoading} />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ArtDetatils;

const styles = StyleSheet.create({
  imgView: {
    backgroundColor: '#000000',
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  img: {
    maxWidth: '70%',
    minHeight: 200,
    resizeMode: 'cover',
    marginLeft: '15%',

    // alignSelf: 'center',
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  optionBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.disabled,
    // minWidth: 100,
    flex: 1,
  },
  optionBoxActive: {
    backgroundColor: theme.colors.primary,
  },
  optionTxt: {
    color: theme.colors.onSurface,
    textAlign: 'center',
    fontSize: 18,
  },
  optionTxtActive: {
    color: '#ffffff',
  },

  detailBox: {
    borderWidth: 1,
    borderColor: theme.colors.disabled,
    padding: 10,
  },
  intro: {},
  title: {
    color: theme.colors.onSurface,
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  desc: {
    color: theme.colors.backdrop,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 15,
  },
  sold: {
    backgroundColor: theme.colors.error,
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  soldTxt: {
    color: '#ffffff',
    fontSize: 20,
  },
});
