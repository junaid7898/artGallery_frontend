import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Review from './Review';
import {theme} from '../../theme/appTheme';

const ReviewList = ({setLoading, artId}) => {
  const [reviews, setReviews] = useState([]); // Initial empty array of arts
  const currentUser = auth().currentUser;
  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection('Reviews')
      .where('artId', '==', artId)
      .onSnapshot(snapshot => {
        let reviewData = [];
        snapshot.forEach(item => {
          if (item._data) {
            if (item._data.userId === currentUser.uid) {
              reviewData.unshift(item._data);
            } else {
              reviewData.push(item._data);
            }
          }
        });
        setReviews(reviewData);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  return (
    <FlatList
      data={reviews}
      keyExtractor={data => data.reviewId}
      contentContainerStyle={{
        borderWidth: 1,
        borderColor: theme.colors.disabled,
        padding: 10,
        paddingBottom: 400,
      }}
      ListEmptyComponent={() => {
        return (
          <View>
            <Text
              style={{
                color: theme.colors.error,
                fontSize: 17,
                textAlign: 'center',
              }}>
              No Reviews Yet
            </Text>
          </View>
        );
      }}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      renderItem={({item}) => {
        return <Review key={item.reviewId} item={item} />;
      }}
    />
  );
};

export default ReviewList;

const styles = StyleSheet.create({});
