import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../theme/appTheme';
import {Rating} from 'react-native-ratings';
import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';

const RatingComponent = ({artId, setLoading}) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(3);
  //   const [loading, setLoading] = useState(false);

  const currentUser = auth().currentUser;

  const handleReviewSubmit = async () => {
    setLoading(true);
    const documentRef = firestore().collection('Reviews').doc();
    let data = {
      review,
      rating,
      userId: currentUser.uid,
      artId: artId,
      reviewId: documentRef.id,
      userName: currentUser.displayName,
    };
    documentRef
      .set(data)
      .then(() => {
        setLoading(false);
        Alert.alert('Success', 'Review Posted!!!', [
          {
            text: 'Ok',
            onPress: () => setReview(''),
            style: 'default',
          },
        ]);
      })
      .catch(err => {
        Alert.alert('Error', 'Something went wrong', [
          {
            text: 'Ok',
            onPress: () => console.log('pressed'),
            style: 'default',
          },
        ]);
      });
  };
  return (
    <View style={styles.ratingView}>
      {/* {loading && <LoadingIndicator />} */}
      <View style={styles.ratingSection}>
        <Rating
          showRating
          onFinishRating={rating => setRating(rating)}
          style={{paddingVertical: 10}}
        />

        <TextInput
          mode="flat"
          multiline
          numberOfLines={3}
          maxLength={200}
          placeholder="Write your review here..."
          keyboardType="default"
          value={review}
          onChangeText={text => setReview(text)}
        />
        <Button
          mode="contained"
          style={{marginTop: 10}}
          onPress={() => handleReviewSubmit()}>
          Post review
        </Button>
      </View>
    </View>
  );
};

export default RatingComponent;

const styles = StyleSheet.create({
  ratingView: {
    borderWidth: 1,
    borderColor: theme.colors.disabled,
    padding: 10,
  },
  title: {
    color: theme.colors.onSurface,
    fontSize: 17,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  desc: {
    color: theme.colors.backdrop,
    fontSize: 15,
    fontWeight: '300',
  },
});
