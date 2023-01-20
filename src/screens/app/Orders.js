import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {layout} from '../../global/styles/layout';
import {theme} from '../../theme/appTheme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import OrderItem from '../../components/orders/OrderItem';
import LoadingIndicator from '../../components/loadingIndicator/LoadingIndicator';

const Orders = () => {
  const currentUser = auth().currentUser;
  const [option, setOption] = useState(1);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscribe;
    if (option === 1) {
      subscribe = firestore()
        .collection('orders')
        .where('userId', '==', currentUser.uid)
        .onSnapshot(res => {
          let data = [];
          res.forEach(item => {
            data.push(item.data());
          });
          setOrders(data);
        });
    } else if (option === 2) {
      subscribe = firestore()
        .collection('orders')
        .where('artistId', '==', currentUser.uid)
        .onSnapshot(res => {
          let data = [];
          res.forEach(item => {
            data.push(item.data());
          });
          setOrders(data);
        });
    }
    setLoading(false);
    return () => subscribe();
  }, [option]);

  return (
    <View style={layout.screenBox}>
      {loading && <LoadingIndicator />}
      <View style={styles.optionView}>
        <TouchableOpacity
          style={[styles.option, option === 1 && styles.optionActive]}
          onPress={() => setOption(1)}>
          <Text
            style={[styles.optionTxt, option === 1 && styles.optionTxtActive]}>
            Ordered
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, option === 2 && styles.optionActive]}
          onPress={() => setOption(2)}>
          <Text
            style={[styles.optionTxt, option === 2 && styles.optionTxtActive]}>
            Orders
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={orders}
        keyExtractor={item => item.orderId}
        contentContainerStyle={[
          layout.innerBox,
          {marginTop: 10, paddingBottom: 250},
        ]}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        ListEmptyComponent={() => (
          <Text style={{color: theme.colors.error, textAlign: 'center'}}>
            No order yet
          </Text>
        )}
        renderItem={({item}) => {
          return <OrderItem order={item} key={item.orderId} />;
        }}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  optionView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  option: {
    paddingVertical: 10,
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  optionActive: {
    backgroundColor: theme.colors.primary,
  },
  optionTxt: {
    textAlign: 'center',
    color: theme.colors.onSurface,
    fontSize: 18,
    fontWeight: '500',
  },
  optionTxtActive: {
    color: '#ffffff',
  },
});
