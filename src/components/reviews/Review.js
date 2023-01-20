import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {theme} from '../../theme/appTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stars = ({array}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {array.map((_, index) => {
        return <Ionicons key={index} name="star" size={20} color="orange" />;
      })}
    </View>
  );
};
const Review = ({item}) => {
  const array = new Array(item.rating).fill(0);
  return (
    <View style={styles.reviewBox}>
      <Text
        style={{
          color: theme.colors.onSurface,
          fontSize: 18,
          fontWeight: '500',
          textTransform: 'capitalize',
        }}>
        {item.userName}
      </Text>
      <Stars array={array} />
      <Text
        style={{
          color: theme.colors.onSurface,
          fontSize: 16,
          fontWeight: '300',
        }}>
        {item.review}
      </Text>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({});
