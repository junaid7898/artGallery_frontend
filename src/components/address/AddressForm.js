import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../theme/appTheme';
import {TextInput} from 'react-native-paper';
import Payment from '../payment/Payment';

const AddressForm = ({art, setLoading, hideModal, navigateToHomeScreen}) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  return (
    <View style={styles.addressView}>
      <Text style={styles.modalTitle}>Delivery Address</Text>
      <View style={styles.inputContainer}>
        <TextInput
          mode="flat"
          placeholder="Enter address"
          multiline
          onChangeText={text => setAddress(text)}
        />
        <TextInput
          mode="outlined"
          placeholder="Enter city"
          label="city"
          onChangeText={text => setCity(text)}
        />
        <TextInput
          mode="outlined"
          placeholder="Enter postal code"
          label="postal code"
          onChangeText={text => setPostalAddress(text)}
        />
      </View>
      {address && city && postalAddress && (
        <View style={{marginTop: 15}}>
          <Payment
            address={{address, city, postalAddress}}
            art={art}
            setLoading={setLoading}
            hideModal={hideModal}
            navigateToHomeScreen={navigateToHomeScreen}
          />
        </View>
      )}
    </View>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  addressView: {
    width: '100%',
  },
  modalTitle: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});
