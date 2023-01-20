import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const PaymentForm = ({
  art,
  address,
  setLoading,
  hideModal,
  navigateToHomeScreen,
}) => {
  // console.log('art:', art, 'address:', address);
  const currentUser = auth().currentUser;
  const stripe = useStripe();
  const subscribe = async () => {
    setLoading(true);
    hideModal();
    try {
      const response = await fetch('http://192.168.0.116:8080/pay', {
        method: 'POST',
        body: JSON.stringify({
          name: 'junaid',
          email: 'junaid@test.com',
          amount: 80,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        return Alert.alert(data.message);
      }
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'test',
      });
      if (initSheet.error) {
        setLoading(false);
        return Alert.alert(initSheet.error.message);
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) {
        setLoading(false);
        return Alert.alert(presentSheet.error.message);
      }

      const orderRef = firestore().collection('orders').doc();
      const update = {
        artId: art.artId,
        artistId: art.userId,
        image: art.image,
        userId: currentUser.uid,
        orderId: orderRef.id,
        address: address.address,
        city: address.city,
        postalCode: address.postalAddress,
        status: 'ordered',
      };
      await orderRef
        .set(update)
        .then(() => {
          return firestore()
            .collection('Art')
            .doc(art.artId)
            .update({status: 'sold'});
        })
        .then(() => {
          Alert.alert('Alert', 'Order Placed!!', [
            {
              text: 'OK',
              onPress: () => {
                navigateToHomeScreen();
                setLoading(false);
              },
            },
          ]);
          // await firestore
        })
        .catch(error => {
          console.log('error:', error);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
      Alert.alert('Something went wrong, try later');
      setLoading(false);
    }
  };
  return (
    <View>
      <Button mode="contained" onPress={() => subscribe()}>
        Proceed with payment
      </Button>
    </View>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({});
