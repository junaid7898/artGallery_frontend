import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {theme} from '../../theme/appTheme';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native-paper';

const OrderItem = ({order}) => {
  const currentUser = auth().currentUser;

  const handleStatusUpdate = async orderId => {
    console.log(orderId);
    await firestore()
      .collection('orders')
      .doc(orderId)
      .update({status: 'delivered'})
      .then(() => {
        Alert.alert('Status Updated!!!');
      });
  };
  return (
    <View style={styles.orderView}>
      <View style={styles.introView}>
        <Text style={styles.introTitle}>Order ID:</Text>
        <Text style={styles.introValue}>{order.orderId}</Text>
      </View>
      <View style={styles.imgView}>
        <Image source={{uri: order.image}} style={styles.img} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.addressView}>
          <Text style={styles.addressTitle}>Delivery Address</Text>
          <Text style={styles.addressValue}>{`${order.address}`}</Text>
          <Text style={styles.addressValue}>{`${order.city}`}</Text>
          <Text style={styles.addressValue}>{`${order.postalCode}`}</Text>
        </View>
        <View>
          <Text style={styles.addressTitle}>status</Text>
          {order.status === 'ordered' ? (
            <View style={styles.statusView}>
              <Text style={styles.statusTxt}>Pending</Text>
              <MaterialIcon
                style={styles.statusIcon}
                name="clock"
                size={24}
                color={theme.colors.error}
              />
            </View>
          ) : (
            <View
              style={[
                styles.statusView,
                {backgroundColor: theme.colors.primary},
              ]}>
              <Text style={[styles.statusTxt, {color: '#ffffff'}]}>
                Delivered
              </Text>
              <MaterialIcon
                style={styles.statusIcon}
                name="check-circle"
                size={24}
                color={theme.colors.secondary}
              />
            </View>
          )}
        </View>
      </View>

      {order.status === 'ordered' && order.artistId === currentUser.uid && (
        <Button
          mode="text"
          style={{marginVertical: 5}}
          onPress={() => handleStatusUpdate(order.orderId)}>
          change status to delivered
        </Button>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderView: {
    backgroundColor: '#E1DBEA',
    padding: 10,
    borderRadius: 10,
  },
  introView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  introTitle: {
    color: theme.colors.backdrop,
    marginRight: 10,
    fontSize: 17,
    fontWeight: '400',
  },
  introValue: {
    color: theme.colors.backdrop,
  },
  imgView: {
    // backgroundColor: '#000000',
    width: '100%',
    marginVertical: 10,
  },
  img: {
    width: '70%',
    height: 150,
    alignSelf: 'center',
  },
  addressView: {
    marginBottom: 5,
    flex: 0.9,
  },
  addressTitle: {
    textTransform: 'uppercase',
    color: theme.colors.backdrop,
    fontSize: 15,
    fontWeight: '500',
  },
  addressValue: {
    color: theme.colors.backdrop,
  },
  statusView: {
    position: 'relative',
    backgroundColor: '#B593E9',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  statusIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: [{translateX: 10}, {translateY: -10}],
  },
});
