import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {theme} from '../../theme/appTheme';
import {rw, vw} from '../../utils/responsiveDimensions';
import {category} from '../../utils/categoriesData';

const ArtCard = ({item, index, handleNavigation}) => {
  return (
    <TouchableOpacity
      onPress={() => handleNavigation(item.artId, item.title)}
      style={[styles.item, (index + 1) % 2 !== 0 && {marginRight: 10}]}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.infoView}>
        <Text style={styles.titleTxt}>
          {item.title} <Text style={{color: theme.colors.backdrop}}>by</Text>{' '}
          <Text style={{textTransform: 'capitalize', fontSize: 13}}>
            {item.userName}
          </Text>
        </Text>
        <Text style={styles.categoryTxt}>{item.category}</Text>
        {item.status === 'sold' && (
          <View style={styles.sold}>
            <Text style={styles.soldTxt}>Sold</Text>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.priceTxt}>{`$${item.price}`}</Text>
          <Text
            style={[
              styles.priceTxt,
              styles.sizeTxt,
            ]}>{`${item.size.width} X ${item.size.height}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArtCard;

const styles = StyleSheet.create({
  item: {
    // borderWidth: 1,
    // borderColor: theme.colors.backdrop,
    width: vw(45),
    // borderRadius: 10,
    // borderBottomRightRadius: 0,
    // borderBottomLeftRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  infoView: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#ffffff',
  },
  titleTxt: {
    color: theme.colors.onSurface,
    fontSize: 17,
    fontWeight: '500',
    // textTransform: 'uppercase',
  },
  categoryTxt: {
    color: theme.colors.backdrop,
    textTransform: 'capitalize',
    fontWeight: '300',
    fontSize: 17,
  },
  priceTxt: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: '500',
  },
  sizeTxt: {
    fontSize: 12,
  },
  sold: {
    backgroundColor: theme.colors.error,
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  soldTxt: {
    color: '#ffffff',
  },
});
